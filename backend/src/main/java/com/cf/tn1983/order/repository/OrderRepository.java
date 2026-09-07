package com.cf.tn1983.order.repository;

import com.cf.tn1983.order.Order;
import com.cf.tn1983.order.OrderStatus;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/** Persistence operations and active-order search queries. */
public interface OrderRepository extends JpaRepository<Order, UUID> {

    Optional<Order> findByIdAndDeletedFalse(UUID id);

    Optional<Order> findByOrderCodeAndDeletedFalse(String orderCode);

    @Query("""
            select o from Order o
            where o.deleted = false
              and (:status is null or o.status = :status)
              and (:customerId is null or o.customer.id = :customerId)
              and (:keyword is null or lower(o.orderCode) like lower(concat('%', :keyword, '%'))
                   or lower(o.receiverName) like lower(concat('%', :keyword, '%'))
                   or o.receiverPhone like concat('%', :keyword, '%'))
            order by o.createdAt desc
            """)
    List<Order> searchActive(
            @Param("status") OrderStatus status,
            @Param("customerId") UUID customerId,
            @Param("keyword") String keyword);
}