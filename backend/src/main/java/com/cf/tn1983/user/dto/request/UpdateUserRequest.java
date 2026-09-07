package com.cf.tn1983.user.dto.request;

import com.cf.tn1983.user.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Request payload for updating a user. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {

    @NotBlank(message = "Full name is required")
    @Schema(description = "Họ và tên người dùng", example = "Nguyen Van B")
    private String fullName;

    @Email(message = "Invalid email format")
    @Schema(description = "Địa chỉ email", example = "nguyen.van.b@example.com")
    private String email;

    @NotBlank(message = "Phone is required")
    @Schema(description = "Số điện thoại", example = "0912345678")
    private String phone;

    @NotNull(message = "Role is required")
    @Schema(description = "Vai trò người dùng", example = "ADMIN")
    private UserRole role;

    @Schema(description = "Trạng thái hoạt động", example = "true")
    private Boolean active;
}