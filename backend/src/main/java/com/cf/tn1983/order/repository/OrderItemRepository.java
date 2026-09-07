package com.cf.tn1983.order.repository;

import com.cf.tn1983.order.OrderItem;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

/** Persistence operations for order items. */
public interface OrderItemRepository extends JpaRepository<OrderItem, UUID> {
}