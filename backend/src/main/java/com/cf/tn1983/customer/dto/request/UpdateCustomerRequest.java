package com.cf.tn1983.customer.dto.request;

import com.cf.tn1983.customer.CustomerType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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

    @Size(min = 1, message = "Customer name must not be empty")
    @Schema(description = "Tên khách hàng", example = "Cửa hàng TN Coffee")
    private String name;

    @Pattern(regexp = "^0\\d{9,10}$", message = "Invalid phone format")
    @Schema(description = "Số điện thoại 10 hoặc 11 chữ số, bắt đầu bằng 0", example = "0901234567")
    private String phone;

    @Schema(description = "Địa chỉ khách hàng", example = "123 Nguyen Trai, Ha Noi")
    private String address;

    @Schema(description = "Ghi chú về khách hàng", example = "Khách hàng thân thiết")
    private String note;

    @Schema(description = "Loại khách hàng", example = "COFFEE_SHOP")
    private CustomerType type;

}