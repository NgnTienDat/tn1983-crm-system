package com.cf.tn1983.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponse {

    @Schema(description = "JWT access token")
    private String accessToken;

    @Schema(description = "JWT refresh token")
    private String refreshToken;

    @Schema(description = "Loại token", example = "Bearer")
    private String tokenType;

    @Schema(description = "Thời gian sống access token, mili-giây", example = "900000")
    private long expiresIn;
}