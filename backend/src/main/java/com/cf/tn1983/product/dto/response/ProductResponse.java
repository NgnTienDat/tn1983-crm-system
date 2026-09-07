package com.cf.tn1983.product.dto.response;

import com.cf.tn1983.product.ProductType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Public product representation. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    @Schema(description = "Mã định danh sản phẩm", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID id;

    @Schema(description = "Tên sản phẩm", example = "Cà phê hạt Arabica")
    private String name;

    @Schema(description = "Loại sản phẩm", example = "COFFEE_BEAN")
    private ProductType type;

    @Schema(description = "Giá niêm yết tham khảo theo kg", example = "185000.00")
    private BigDecimal listedPrice;

    @Schema(description = "Trạng thái đang phục vụ", example = "true")
    private Boolean active;

    @Schema(description = "Thời điểm tạo sản phẩm", example = "2026-09-07T10:15:30")
    private LocalDateTime createdAt;
}