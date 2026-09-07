package com.cf.tn1983.order.dto.response;

import com.cf.tn1983.order.enums.PackageSize;
import com.cf.tn1983.order.enums.PackagingType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Product line returned as part of an order. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponse {

    @Schema(description = "Mã dòng sản phẩm", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID id;

    @Schema(description = "Mã sản phẩm", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID productId;

    @Schema(description = "Tên sản phẩm", example = "Cà phê hạt Arabica")
    private String productName;

    @Schema(description = "Khối lượng theo kg", example = "5.500")
    private BigDecimal quantityKg;

    @Schema(description = "Đơn giá giao dịch thực tế theo kg", example = "180000.00")
    private BigDecimal unitPricePerKg;

    @Schema(description = "Thành tiền của dòng sản phẩm", example = "990000.00")
    private BigDecimal totalPrice;

    @Schema(description = "Kiểu đóng gói", example = "BRANDED_BAG")
    private PackagingType packagingType;

    @Schema(description = "Quy cách mỗi gói", example = "KG_1")
    private PackageSize packageSize;

    @Schema(description = "Số lượng gói", example = "6")
    private Integer packageCount;
}