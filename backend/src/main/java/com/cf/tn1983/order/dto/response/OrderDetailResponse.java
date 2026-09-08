package com.cf.tn1983.order.dto.response;

import com.cf.tn1983.customer.dto.response.CustomerResponse;
import com.cf.tn1983.order.enums.OrderSource;
import com.cf.tn1983.order.enums.OrderStatus;
import com.cf.tn1983.order.enums.ShippingMethod;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Complete order representation for detail and mutation responses. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailResponse {

    private UUID id;
    private String orderCode;
    private CustomerResponse customer;
    private String receiverName;
    private String receiverPhone;
    private String receiverAddress;
    private OrderSource source;
    private ShippingMethod shippingMethod;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private String note;
    private List<OrderItemResponse> items;
    private List<OrderStatusHistoryResponse> statusHistory;
    private Instant createdAt;
}
