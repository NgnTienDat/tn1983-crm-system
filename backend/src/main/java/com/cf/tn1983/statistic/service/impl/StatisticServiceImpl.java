package com.cf.tn1983.statistic.service.impl;

import com.cf.tn1983.order.enums.OrderStatus;
import com.cf.tn1983.statistic.dto.response.DashboardKpiResponse;
import com.cf.tn1983.statistic.dto.response.DashboardOrderResponse;
import com.cf.tn1983.statistic.dto.response.DashboardStatisticsResponse;
import com.cf.tn1983.statistic.dto.response.RevenueTrendResponse;
import com.cf.tn1983.statistic.dto.response.TopProductResponse;
import com.cf.tn1983.statistic.repository.DashboardOrderProjection;
import com.cf.tn1983.statistic.repository.RevenueTrendProjection;
import com.cf.tn1983.statistic.repository.StatusCountProjection;
import com.cf.tn1983.statistic.repository.StatisticRepository;
import com.cf.tn1983.statistic.repository.TopProductProjection;
import com.cf.tn1983.statistic.service.StatisticService;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Default service for one-request admin dashboard aggregation. */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StatisticServiceImpl implements StatisticService {

    private static final ZoneId BUSINESS_ZONE = ZoneId.of("Asia/Ho_Chi_Minh");

    private final StatisticRepository statisticRepository;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public DashboardStatisticsResponse getDashboard() {
        LocalDate today = LocalDate.now(BUSINESS_ZONE);
        Instant todayStart = startOf(today);
        Instant tomorrowStart = startOf(today.plusDays(1));
        Instant trendStart = startOf(today.minusDays(29));
        Instant monthStart = startOf(today.withDayOfMonth(1));
        Instant nextMonthStart = startOf(monthStart.atZone(BUSINESS_ZONE).toLocalDate().plusMonths(1));

        Map<String, Long> statusOverview = buildStatusOverview(statisticRepository.countOrdersGroupedByStatus());
        DashboardKpiResponse kpis = DashboardKpiResponse.builder()
                .revenueToday(statisticRepository.sumRevenue(todayStart, tomorrowStart))
                .ordersToday(statisticRepository.countOrders(todayStart, tomorrowStart))
                .newOrders(statusOverview.get(statusKey(OrderStatus.RECEIVED)))
                .waitingForShipping(statusOverview.get(statusKey(OrderStatus.WAITING_FOR_SHIPPING)))
                .build();

        return DashboardStatisticsResponse.builder()
                .kpis(kpis)
                .revenueChart(buildRevenueChart(trendStart, tomorrowStart, today))
                .newOrders(toOrderResponses(statisticRepository.findLatestOrdersByCreatedAt(
                        OrderStatus.RECEIVED.name(), PageRequest.of(0, 10))))
                .waitingForShippingOrders(toOrderResponses(statisticRepository.findLatestOrdersByUpdatedAt(
                        OrderStatus.WAITING_FOR_SHIPPING.name(), PageRequest.of(0, 10))))
                .statusOverview(statusOverview)
                .topProducts(toTopProducts(statisticRepository.findTopProducts(monthStart, nextMonthStart)))
                .build();
    }

    private List<RevenueTrendResponse> buildRevenueChart(Instant start, Instant end, LocalDate today) {
        Map<String, BigDecimal> revenueByDay = statisticRepository.findRevenueTrend(start, end).stream()
                .collect(Collectors.toMap(RevenueTrendProjection::getLabel, RevenueTrendProjection::getRevenue));
        return java.util.stream.IntStream.range(0, 30)
                .mapToObj(offset -> today.minusDays(29L - offset).toString())
                .map(label -> RevenueTrendResponse.builder()
                        .label(label)
                        .revenue(revenueByDay.getOrDefault(label, BigDecimal.ZERO))
                        .build())
                .toList();
    }

    private Map<String, Long> buildStatusOverview(List<StatusCountProjection> counts) {
        Map<String, Long> result = new LinkedHashMap<>();
        for (OrderStatus status : OrderStatus.values()) {
            result.put(statusKey(status), 0L);
        }
        counts.forEach(count -> result.put(statusKey(OrderStatus.valueOf(count.getStatus())), count.getTotal()));
        return result;
    }

    private List<DashboardOrderResponse> toOrderResponses(List<DashboardOrderProjection> projections) {
        return projections.stream()
                .map(order -> DashboardOrderResponse.builder()
                        .orderCode(order.getOrderCode())
                        .customerName(order.getCustomerName())
                        .totalAmount(order.getTotalAmount())
                        .createdAt(order.getCreatedAt())
                        .updatedAt(order.getUpdatedAt())
                        .build())
                .toList();
    }

    private List<TopProductResponse> toTopProducts(List<TopProductProjection> projections) {
        return projections.stream()
                .map(product -> TopProductResponse.builder()
                        .productName(product.getProductName())
                        .quantitySold(product.getQuantitySold())
                        .revenue(product.getRevenue())
                        .build())
                .toList();
    }

    private Instant startOf(LocalDate date) {
        return date.atStartOfDay(BUSINESS_ZONE).toInstant();
    }

    private String statusKey(OrderStatus status) {
        String value = status.name().toLowerCase();
        StringBuilder key = new StringBuilder();
        boolean uppercaseNext = false;
        for (char character : value.toCharArray()) {
            if (character == '_') {
                uppercaseNext = true;
            } else if (uppercaseNext) {
                key.append(Character.toUpperCase(character));
                uppercaseNext = false;
            } else {
                key.append(character);
            }
        }
        return key.toString();
    }
}
