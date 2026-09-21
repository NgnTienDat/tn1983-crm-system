package com.cf.tn1983.statistic.dto.response;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** KPI values used by the admin dashboard. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardKpiResponse {

    private BigDecimal revenueToday;
    private long ordersToday;
    private long newOrders;
    private long waitingForShipping;
}
