package com.cf.tn1983.order.event;

import com.cf.tn1983.order.OrderStatus;
import java.time.LocalDateTime;
import java.util.UUID;

/** Domain event published after an order is created or its status changes. */
public record OrderStatusChangedEvent(
        UUID orderId,
        String orderCode,
        OrderStatus oldStatus,
        OrderStatus newStatus,
        String note,
        UUID changedBy,
        LocalDateTime occurredAt) {
}