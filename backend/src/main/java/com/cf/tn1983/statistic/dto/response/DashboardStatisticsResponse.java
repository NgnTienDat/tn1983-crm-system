package com.cf.tn1983.statistic.dto.response;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Complete aggregated payload for the admin dashboard. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatisticsResponse {

    private DashboardKpiResponse kpis;
    private List<RevenueTrendResponse> revenueChart;
    private List<DashboardOrderResponse> newOrders;
    private List<DashboardOrderResponse> waitingForShippingOrders;
    private Map<String, Long> statusOverview;
    private List<TopProductResponse> topProducts;
}
