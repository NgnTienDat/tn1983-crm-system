package com.cf.tn1983.statistic.repository;

/** Native projection for an order status count. */
public interface StatusCountProjection {

    String getStatus();

    long getTotal();
}
