package com.cf.tn1983.order.repository;

import com.cf.tn1983.order.Order;
import com.cf.tn1983.order.enums.OrderStatus;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/** Persistence operations and active-order search queries. */
public interface OrderRepository extends JpaRepository<Order, UUID> {

    Optional<Order> findByIdAndDeletedFalse(UUID id);

    Optional<Order> findByOrderCodeAndDeletedFalse(String orderCode);

    @Query(value = """
                        select new com.cf.tn1983.order.repository.OrderSummaryProjection(
                                o.id, o.orderCode, c.id, c.name, o.receiverName,
                                o.totalAmount, o.status, o.createdAt)
                        from Order o
                        join o.customer c
            where o.deleted = false
              and (:status is null or o.status = :status)
              and (:customerId is null or o.customer.id = :customerId)
                            and (:keyword is null or :keyword = '' or lower(o.orderCode) like lower(concat('%', :keyword, '%'))
                   or lower(o.receiverName) like lower(concat('%', :keyword, '%'))
                   or o.receiverPhone like concat('%', :keyword, '%'))
            order by o.createdAt desc
                        """,
                        countQuery = """
                                        select count(o)
                                        from Order o
                                        where o.deleted = false
                                            and (:status is null or o.status = :status)
                                            and (:customerId is null or o.customer.id = :customerId)
                                            and (:keyword is null or :keyword = '' or lower(o.orderCode) like lower(concat('%', :keyword, '%'))
                                                     or lower(o.receiverName) like lower(concat('%', :keyword, '%'))
                                                     or o.receiverPhone like concat('%', :keyword, '%'))
                                        """)
                Page<OrderSummaryProjection> searchActive(
            @Param("status") OrderStatus status,
            @Param("customerId") UUID customerId,
                        @Param("keyword") String keyword,
                        Pageable pageable);
}