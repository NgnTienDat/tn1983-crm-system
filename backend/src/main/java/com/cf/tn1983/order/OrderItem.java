package com.cf.tn1983.order;

import com.cf.tn1983.common.entity.BaseEntity;
import com.cf.tn1983.order.enums.PackageSize;
import com.cf.tn1983.order.enums.PackagingType;
import com.cf.tn1983.product.Product;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Product line in an order, including the price at purchase time. */
@Entity
@Table(name = "order_items")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(precision = 19, scale = 3)
    private BigDecimal quantityKg;

    @Column(precision = 19, scale = 2)
    private BigDecimal unitPricePerKg;

    @Column(precision = 19, scale = 2)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    private PackagingType packagingType;

    @Enumerated(EnumType.STRING)
    private PackageSize packageSize;

    private Integer packageCount;
}