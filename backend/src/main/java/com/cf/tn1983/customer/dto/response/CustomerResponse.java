package com.cf.tn1983.customer.dto.response;

import com.cf.tn1983.customer.CustomerType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Public customer representation. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {

    @Schema(description = "Mã định danh khách hàng", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID id;

    @Schema(description = "Mã khách hàng", example = "TN")
    private String customerCode;

    @Schema(description = "Tên khách hàng", example = "Cửa hàng TN Coffee")
    private String name;

    @Schema(description = "Số điện thoại", example = "0901234567")
    private String phone;

    @Schema(description = "Địa chỉ khách hàng", example = "123 Nguyen Trai, Ha Noi")
    private String address;

    @Schema(description = "Ghi chú về khách hàng", example = "Khách hàng thân thiết")
    private String note;

    @Schema(description = "Loại khách hàng", example = "COFFEE_SHOP")
    private CustomerType type;

    @Schema(description = "Trạng thái phục vụ", example = "true")
    private Boolean active;

    @Schema(description = "Thời điểm tạo khách hàng", example = "2026-09-07T10:15:30")
    private LocalDateTime createdAt;
}