package com.cf.tn1983.customer.dto.request;

import com.cf.tn1983.customer.CustomerType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Request payload for updating a customer. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCustomerRequest {

    @NotBlank(message = "Customer code is required")
    @Schema(description = "Mã khách hàng", example = "TN")
    private String customerCode;

    @NotBlank(message = "Customer name is required")
    @Schema(description = "Tên khách hàng", example = "Cửa hàng TN Coffee")
    private String name;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^0\\d{9,10}$", message = "Invalid phone format")
    @Schema(description = "Số điện thoại 10 hoặc 11 chữ số, bắt đầu bằng 0", example = "0901234567")
    private String phone;

    @Schema(description = "Địa chỉ khách hàng", example = "123 Nguyen Trai, Ha Noi")
    private String address;

    @Schema(description = "Ghi chú về khách hàng", example = "Khách hàng thân thiết")
    private String note;

    @NotNull(message = "Customer type is required")
    @Schema(description = "Loại khách hàng", example = "COFFEE_SHOP")
    private CustomerType type;

    @Schema(description = "Mã người dùng liên kết, có thể bỏ trống", example = "550e8400-e29b-41d4-a716-446655440000", nullable = true)
    private UUID userId;
}