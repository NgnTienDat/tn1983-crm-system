package com.cf.tn1983.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Phone is required")
    @Pattern (regexp = "^(0|\\+84)[3|5|7|8|9][0-9]{8}$", message = "Invalid phone number format")
    @Schema(description = "Số điện thoại", example = "0852845969")
    private String phone;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 50, message = "Password must be between 6 and 50 characters")
    @Schema(description = "Mật khẩu đăng nhập", example = "secret123", minLength = 6)
    private String password;
}