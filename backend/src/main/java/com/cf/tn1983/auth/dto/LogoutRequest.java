package com.cf.tn1983.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LogoutRequest {

    @Schema(description = "Refresh token cần revoke", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private String refreshToken;
}