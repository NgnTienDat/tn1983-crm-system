package com.cf.tn1983.product.dto.request;

import com.cf.tn1983.product.ProductType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Request payload for updating a product. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductRequest {

    @NotBlank(message = "Product name is required")
    @Schema(description = "Tên sản phẩm", example = "Cà phê hạt Arabica")
    private String name;

    @NotNull(message = "Product type is required")
    @Schema(description = "Loại sản phẩm", example = "COFFEE_BEAN")
    private ProductType type;

    @NotNull(message = "Listed price is required")
    @DecimalMin(value = "0.01", message = "Listed price must be greater than 0")
    @Schema(description = "Giá niêm yết tham khảo theo kg", example = "190000.00", minimum = "0.01")
    private BigDecimal listedPrice;
}