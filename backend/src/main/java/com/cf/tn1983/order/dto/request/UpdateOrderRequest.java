package com.cf.tn1983.order.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

import com.cf.tn1983.order.enums.OrderSource;
import com.cf.tn1983.order.enums.ShippingMethod;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Request payload for updating order details. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateOrderRequest {

    @Schema(description = "Mã khách hàng", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID customerId;

    @Schema(description = "Tên người nhận", example = "Nguyen Van A")
    private String receiverName;

    @Schema(description = "Số điện thoại người nhận", example = "0901234567")
    private String receiverPhone;

    @Schema(description = "Địa chỉ nhận hàng", example = "123 Nguyen Trai, Ha Noi")
    private String receiverAddress;

    @Schema(description = "Nguồn đơn hàng", example = "PHONE")
    private OrderSource source;

    @Schema(description = "Phương thức giao hàng", example = "VIETNAM_POST")
    private ShippingMethod shippingMethod;

    @Schema(description = "Ghi chú đơn hàng", example = "Giao giờ hành chính")
    private String note;

    @Valid
    @Schema(description = "Danh sách sản phẩm trong đơn")
    private List<OrderItemRequest> items;
}