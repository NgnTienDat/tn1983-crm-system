package com.cf.tn1983.customer;

import com.cf.tn1983.common.entity.BaseEntity;
import com.cf.tn1983.order.Order;
import com.cf.tn1983.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Customer placing orders in the CRM. */
@Entity
@Table(name = "customers")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Customer extends BaseEntity {

    private String name;

    private String phone;

    private String address;

    private String note;

    @Enumerated(EnumType.STRING)
    private CustomerType type;

    @OneToOne(optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Builder.Default
    @OneToMany(mappedBy = "orderBy", fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();
}