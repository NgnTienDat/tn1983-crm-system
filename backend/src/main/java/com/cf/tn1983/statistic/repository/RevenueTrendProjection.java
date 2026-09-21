package com.cf.tn1983.statistic.repository;

import java.math.BigDecimal;

/** Native projection for a grouped daily revenue value. */
public interface RevenueTrendProjection {

    String getLabel();

    BigDecimal getRevenue();
}
