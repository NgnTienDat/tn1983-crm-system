package com.cf.tn1983.statistic.repository;

import java.math.BigDecimal;

/** Native projection for a product sales aggregate. */
public interface TopProductProjection {

    String getProductName();

    BigDecimal getQuantitySold();

    BigDecimal getRevenue();
}
