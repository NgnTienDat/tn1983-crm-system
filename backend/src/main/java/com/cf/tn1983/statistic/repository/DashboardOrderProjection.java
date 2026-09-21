package com.cf.tn1983.statistic.repository;

import java.math.BigDecimal;
import java.time.Instant;

/** Native projection for a dashboard order queue row. */
public interface DashboardOrderProjection {

    String getOrderCode();

    String getCustomerName();

    BigDecimal getTotalAmount();

    Instant getCreatedAt();

    Instant getUpdatedAt();
}
