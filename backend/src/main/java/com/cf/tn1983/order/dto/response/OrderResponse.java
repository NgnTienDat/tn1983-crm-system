package com.cf.tn1983.order.dto.response;

import com.cf.tn1983.common.response.ApiResponse;
import com.cf.tn1983.customer.dto.response.CustomerResponse;
import com.cf.tn1983.order.OrderSource;
import com.cf.tn1983.order.OrderStatus;
import com.cf.tn1983.order.ShippingMethod;
import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Complete order representation including items and status timeline. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    @Schema(description = "Mã định danh đơn hàng", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID id;

    @Schema(description = "Mã đơn hàng nghiệp vụ", example = "TN260001")
    private String orderCode;

    @Schema(description = "Thông tin khách hàng")
    private CustomerResponse customer;

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

    @Schema(description = "Tổng tiền tự động tính từ các dòng hàng", example = "990000.00")
    private BigDecimal totalAmount;

    @Schema(description = "Trạng thái hiện tại", example = "RECEIVED")
    private OrderStatus status;

    @Schema(description = "Ghi chú đơn hàng", example = "Giao giờ hành chính")
    private String note;

    @Schema(description = "Danh sách dòng sản phẩm")
    private List<OrderItemResponse> items;

    @Schema(description = "Timeline lịch sử trạng thái")
    private List<OrderStatusHistoryResponse> statusHistory;

    @Schema(description = "Thời điểm tạo đơn", example = "2026-09-07T10:15:30")
    private LocalDateTime createdAt;
}