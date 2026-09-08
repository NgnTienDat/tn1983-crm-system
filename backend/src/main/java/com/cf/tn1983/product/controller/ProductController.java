package com.cf.tn1983.product.controller;

import com.cf.tn1983.common.response.ApiResponse;
import com.cf.tn1983.product.dto.request.CreateProductRequest;
import com.cf.tn1983.product.dto.request.UpdateProductRequest;
import com.cf.tn1983.product.dto.response.ProductResponse;
import com.cf.tn1983.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** REST endpoints for product CRUD operations. */
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Tag(name = "Product Management", description = "API quản lý sản phẩm")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @Operation(summary = "Tạo sản phẩm mới")
    public ApiResponse<ProductResponse> create(@Valid @RequestBody CreateProductRequest request) {
        return ApiResponse.success(productService.create(request));
    }

    @GetMapping
    @Operation(summary = "Lấy danh sách sản phẩm")
    public ApiResponse<List<ProductResponse>> getAll(
            @RequestParam(required = false) Boolean active) {
        return ApiResponse.success(productService.getAll(active));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy thông tin sản phẩm theo mã định danh")
    public ApiResponse<ProductResponse> getById(@PathVariable UUID id) {
        return ApiResponse.success(productService.getById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Cập nhật thông tin sản phẩm")
    public ApiResponse<ProductResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateProductRequest request) {
        return ApiResponse.success(productService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Xóa mềm sản phẩm")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        productService.delete(id);
        return ApiResponse.success(null);
    }
}