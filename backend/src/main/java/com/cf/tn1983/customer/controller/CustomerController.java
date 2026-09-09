package com.cf.tn1983.customer.controller;

import com.cf.tn1983.common.response.ApiResponse;
import com.cf.tn1983.common.response.PageResponse;
import com.cf.tn1983.customer.dto.request.CreateCustomerRequest;
import com.cf.tn1983.customer.dto.request.UpdateCustomerRequest;
import com.cf.tn1983.customer.dto.response.CustomerResponse;
import com.cf.tn1983.customer.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** REST endpoints for customer CRUD operations. */
@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
@Tag(name = "Customer Management", description = "API quản lý khách hàng")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    @Operation(summary = "Tạo khách hàng mới")
    public ApiResponse<CustomerResponse> create(@Valid @RequestBody CreateCustomerRequest request) {
        return ApiResponse.success(customerService.create(request));
    }

    @GetMapping
    @Operation(summary = "Lấy danh sách khách hàng đang hoạt động")
    public ApiResponse<PageResponse<CustomerResponse>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String q) {
        return ApiResponse.success(customerService.getAll(page, size, q));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy thông tin khách hàng theo mã định danh")
    public ApiResponse<CustomerResponse> getById(@PathVariable UUID id) {
        return ApiResponse.success(customerService.getById(id));
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Cập nhật thông tin khách hàng")
    public ApiResponse<CustomerResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateCustomerRequest request) {
        return ApiResponse.success(customerService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Xóa mềm khách hàng")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        customerService.delete(id);
        return ApiResponse.success(null);
    }
}