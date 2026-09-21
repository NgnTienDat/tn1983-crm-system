package com.cf.tn1983.statistic.dto.response;

import java.math.BigDecimal;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Lightweight order row displayed in a dashboard queue. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardOrderResponse {

    private String orderCode;
    private String customerName;
    private BigDecimal totalAmount;
    private Instant createdAt;
    private Instant updatedAt;
}
