package com.cf.tn1983.order.dto.request;

import com.cf.tn1983.order.OrderSource;
import com.cf.tn1983.order.ShippingMethod;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;
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

    @NotNull(message = "Customer is required")
    @Schema(description = "Mã khách hàng", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID customerId;

    @NotBlank(message = "Receiver name is required")
    @Schema(description = "Tên người nhận", example = "Nguyen Van A")
    private String receiverName;

    @NotBlank(message = "Receiver phone is required")
    @Schema(description = "Số điện thoại người nhận", example = "0901234567")
    private String receiverPhone;

    @NotBlank(message = "Receiver address is required")
    @Schema(description = "Địa chỉ nhận hàng", example = "123 Nguyen Trai, Ha Noi")
    private String receiverAddress;

    @Schema(description = "Nguồn đơn hàng", example = "PHONE")
    private OrderSource source;

    @Schema(description = "Phương thức giao hàng", example = "VIETNAM_POST")
    private ShippingMethod shippingMethod;

    @Schema(description = "Ghi chú đơn hàng", example = "Giao giờ hành chính")
    private String note;

    @Valid
    @NotEmpty(message = "At least one order item is required")
    @Schema(description = "Danh sách sản phẩm trong đơn")
    private List<OrderItemRequest> items;
}