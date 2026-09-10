package com.cf.tn1983.order.controller;

import com.cf.tn1983.common.response.ApiResponse;
import com.cf.tn1983.common.response.PageResponse;
import com.cf.tn1983.order.dto.request.ChangeOrderStatusRequest;
import com.cf.tn1983.order.dto.request.CreateOrderRequest;
import com.cf.tn1983.order.dto.request.UpdateOrderRequest;
import com.cf.tn1983.order.dto.response.OrderDetailResponse;
import com.cf.tn1983.order.dto.response.OrderSummaryResponse;
import com.cf.tn1983.order.enums.OrderStatus;
import com.cf.tn1983.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** REST endpoints for order management. */
@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@Tag(name = "Order Management", description = "API quản lý đơn hàng")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @Operation(summary = "Tạo đơn hàng mới")
    public ApiResponse<OrderDetailResponse> create(@Valid @RequestBody CreateOrderRequest request) {
        return ApiResponse.success(orderService.create(request));
    }

    @GetMapping
    @Operation(summary = "Tìm kiếm danh sách đơn hàng")
    public ApiResponse<PageResponse<OrderSummaryResponse>> search(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) OrderStatus status,
            @RequestParam(required = false) UUID customerId,
            @RequestParam(required = false) String keyword) {
        return ApiResponse.success(orderService.search(page, size, status, customerId, keyword));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy chi tiết đơn hàng theo mã định danh")
    public ApiResponse<OrderDetailResponse> getById(@PathVariable UUID id) {
        return ApiResponse.success(orderService.getById(id));
    }

    @GetMapping("/code/{orderCode}")
    @Operation(summary = "Tra cứu đơn hàng theo mã nghiệp vụ")
    public ApiResponse<OrderDetailResponse> getByCode(@PathVariable String orderCode) {
        return ApiResponse.success(orderService.getByCode(orderCode));
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Cập nhật thông tin đơn hàng")
    public ApiResponse<OrderDetailResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateOrderRequest request) {
        return ApiResponse.success(orderService.update(id, request));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Cập nhật trạng thái đơn hàng")
    public ApiResponse<OrderDetailResponse> changeStatus(
            @PathVariable UUID id,
            @Valid @RequestBody ChangeOrderStatusRequest request) {
        return ApiResponse.success(orderService.changeStatus(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Xóa mềm đơn hàng")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        orderService.delete(id);
        return ApiResponse.success(null);
    }
}