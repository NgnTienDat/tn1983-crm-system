package com.cf.tn1983.order.enums;

/** Current fulfillment status of an order. */
public enum OrderStatus {
    RECEIVED,
    ROASTING,
    PACKAGING,
    WAITING_FOR_SHIPPING,
    SHIPPED,
    COMPLETED
}