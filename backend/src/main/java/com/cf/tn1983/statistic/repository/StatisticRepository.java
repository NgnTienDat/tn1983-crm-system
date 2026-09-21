package com.cf.tn1983.statistic.repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.cf.tn1983.order.Order;

/** Database aggregations used by the admin dashboard. */
public interface StatisticRepository extends JpaRepository<Order, java.util.UUID> {

    @Query(value = """
            select coalesce(sum(o.total_amount), 0)
            from orders o
            where o.deleted = false
              and o.created_at >= :startAt
              and o.created_at < :endAt
            """, nativeQuery = true)
    BigDecimal sumRevenue(@Param("startAt") Instant startAt, @Param("endAt") Instant endAt);

    @Query(value = """
            select count(*)
            from orders o
            where o.deleted = false
              and o.created_at >= :startAt
              and o.created_at < :endAt
            """, nativeQuery = true)
    long countOrders(@Param("startAt") Instant startAt, @Param("endAt") Instant endAt);

    @Query(value = """
            select count(*)
            from orders o
            where o.deleted = false
              and o.status = :status
            """, nativeQuery = true)
    long countActiveOrdersByStatus(@Param("status") String status);

    @Query(value = """
            select o.order_code as orderCode,
                   c.name as customerName,
                   o.total_amount as totalAmount,
                   o.created_at as createdAt,
                   o.updated_at as updatedAt
            from orders o
            join customers c on c.id = o.customer_id
            where o.deleted = false
              and o.status = :status
            order by o.created_at desc
            """, nativeQuery = true)
    List<DashboardOrderProjection> findLatestOrdersByCreatedAt(
            @Param("status") String status, Pageable pageable);

    @Query(value = """
            select o.order_code as orderCode,
                   c.name as customerName,
                   o.total_amount as totalAmount,
                   o.created_at as createdAt,
                   o.updated_at as updatedAt
            from orders o
            join customers c on c.id = o.customer_id
            where o.deleted = false
              and o.status = :status
            order by o.updated_at desc
            """, nativeQuery = true)
    List<DashboardOrderProjection> findLatestOrdersByUpdatedAt(
            @Param("status") String status, Pageable pageable);

    @Query(value = """
            select to_char((o.created_at at time zone 'Asia/Ho_Chi_Minh')::date, 'YYYY-MM-DD') as label,
                   coalesce(sum(o.total_amount), 0) as revenue
            from orders o
            where o.deleted = false
              and o.created_at >= :startAt
              and o.created_at < :endAt
            group by (o.created_at at time zone 'Asia/Ho_Chi_Minh')::date
            order by label
            """, nativeQuery = true)
    List<RevenueTrendProjection> findRevenueTrend(
            @Param("startAt") Instant startAt, @Param("endAt") Instant endAt);

    @Query(value = """
            select o.status as status, count(*) as total
            from orders o
            where o.deleted = false
            group by o.status
            """, nativeQuery = true)
    List<StatusCountProjection> countOrdersGroupedByStatus();

    @Query(value = """
            select p.name as productName,
                   coalesce(sum(oi.quantity_kg), 0) as quantitySold,
                   coalesce(sum(oi.total_price), 0) as revenue
            from order_items oi
            join orders o on o.id = oi.order_id
            join products p on p.id = oi.product_id
            where o.deleted = false
              and o.created_at >= :startAt
              and o.created_at < :endAt
            group by p.id, p.name
            order by sum(oi.quantity_kg) desc, p.name asc
            limit 5
            """, nativeQuery = true)
    List<TopProductProjection> findTopProducts(
            @Param("startAt") Instant startAt, @Param("endAt") Instant endAt);
}
