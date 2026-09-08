package com.cf.tn1983.order.repository;

import com.cf.tn1983.order.enums.OrderStatus;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/** Search projection containing only fields required by the order list. */
public record OrderSummaryProjection(
        UUID id,
        String orderCode,
        UUID customerId,
        String customerName,
        String receiverName,
        BigDecimal totalAmount,
        OrderStatus status,
        Instant createdAt) {
}
