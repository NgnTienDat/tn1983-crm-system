package com.cf.tn1983.order.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

import com.cf.tn1983.order.enums.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Request payload for changing order status. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangeOrderStatusRequest {

    @NotNull(message = "Order status is required")
    @Schema(description = "Trạng thái mới", example = "ROASTING")
    private OrderStatus status;

    @Schema(description = "Ghi chú thay đổi trạng thái", example = "Đã bắt đầu rang")
    private String note;

    @Schema(description = "Mã người thay đổi trạng thái", example = "550e8400-e29b-41d4-a716-446655440000", nullable = true)
    private UUID changedBy;
}