package com.cf.tn1983.user.dto.response;

import com.cf.tn1983.user.UserRole;
import java.time.Instant;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import io.swagger.v3.oas.annotations.media.Schema;

/** Public user representation; password is intentionally excluded. */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    @Schema(description = "Mã định danh người dùng", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID id;

    @Schema(description = "Họ và tên người dùng", example = "Nguyen Van A")
    private String fullName;

    @Schema(description = "Địa chỉ email", example = "nguyen.van.a@example.com")
    private String email;

    @Schema(description = "Số điện thoại", example = "0901234567")
    private String phone;

    @Schema(description = "Vai trò người dùng", example = "STAFF")
    private UserRole role;

    @Schema(description = "Trạng thái hoạt động", example = "true")
    private Boolean active;

    @Schema(description = "Thời điểm tạo tài khoản", example = "2026-09-07T10:15:30")
    private Instant createdAt;
}