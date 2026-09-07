package com.cf.tn1983.order.dto.request;

import com.cf.tn1983.order.enums.PackageSize;
import com.cf.tn1983.order.enums.PackagingType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Product line submitted with an order. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemRequest {

    @NotNull(message = "Product is required")
    @Schema(description = "Mã sản phẩm", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID productId;

    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.001", message = "Quantity must be greater than 0")
    @Schema(description = "Khối lượng tính theo kg", example = "5.5", minimum = "0.001")
    private BigDecimal quantityKg;

    @NotNull(message = "Unit price is required")
    @DecimalMin(value = "0.01", message = "Unit price must be greater than 0")
    @Schema(description = "Đơn giá giao dịch thực tế theo kg", example = "180000.00", minimum = "0.01")
    private BigDecimal unitPricePerKg;

    @NotNull(message = "Packaging type is required")
    @Schema(description = "Kiểu đóng gói", example = "BRANDED_BAG")
    private PackagingType packagingType;

    @NotNull(message = "Package size is required")
    @Schema(description = "Quy cách mỗi gói", example = "KG_1")
    private PackageSize packageSize;

    @NotNull(message = "Package count is required")
    @Positive(message = "Package count must be greater than 0")
    @Schema(description = "Số lượng gói", example = "6", minimum = "1")
    private Integer packageCount;
}