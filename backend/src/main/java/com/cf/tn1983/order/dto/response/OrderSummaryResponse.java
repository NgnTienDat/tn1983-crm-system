package com.cf.tn1983.order.dto.response;

import com.cf.tn1983.customer.dto.response.CustomerSummaryResponse;
import com.cf.tn1983.order.enums.OrderStatus;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Lightweight order representation for list views. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderSummaryResponse {

    private UUID id;
    private String orderCode;
    private CustomerSummaryResponse customer;
    private String receiverName;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private Instant createdAt;
}
