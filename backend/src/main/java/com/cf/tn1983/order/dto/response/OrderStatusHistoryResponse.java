package com.cf.tn1983.order.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.Instant;
import java.util.UUID;

import com.cf.tn1983.order.enums.OrderStatus;
import com.cf.tn1983.user.dto.response.UserSummaryResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Status timeline entry returned with an order. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatusHistoryResponse {

    @Schema(description = "Mã bản ghi lịch sử", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID id;

    @Schema(description = "Trạng thái đơn hàng", example = "RECEIVED")
    private OrderStatus status;

    @Schema(description = "Ghi chú thay đổi", example = "Đơn hàng mới tiếp nhận")
    private String note;

    @Schema(description = "Thời điểm thay đổi", example = "2026-09-07T10:15:30")
    private Instant changedAt;

    @Schema(description = "Người thay đổi", nullable = true)
    private UserSummaryResponse changedBy;
}