package com.cf.tn1983.auth.controller;

import com.cf.tn1983.auth.dto.LoginRequest;
import com.cf.tn1983.auth.dto.AuthTokenResult;
import com.cf.tn1983.auth.dto.TokenResponse;
import com.cf.tn1983.auth.service.AuthService;
import com.cf.tn1983.common.response.ApiResponse;
import com.cf.tn1983.user.dto.response.UserResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "API xác thực và quản lý phiên đăng nhập")
public class AuthController {

    private static final String REFRESH_TOKEN_COOKIE = "refresh_token";

    private final AuthService authService;

    @Value("${security.jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    @Value("${security.jwt.refresh-cookie-secure:false}")
    private boolean refreshCookieSecure;

    @Value("${security.jwt.refresh-cookie-same-site:Strict}")
    private String refreshCookieSameSite;

    @PostMapping("/login")
    @Operation(summary = "Đăng nhập")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthTokenResult result = authService.login(request);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, createRefreshCookie(result.refreshToken()).toString())
                .body(ApiResponse.success(result.response()));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Làm mới access token và xoay vòng refresh token")
    public ResponseEntity<ApiResponse<TokenResponse>> refresh(
            @CookieValue(name = REFRESH_TOKEN_COOKIE, required = false) String refreshToken) {
        AuthTokenResult result = authService.refresh(refreshToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, createRefreshCookie(result.refreshToken()).toString())
                .body(ApiResponse.success(result.response()));
    }

    @PostMapping("/logout")
    @Operation(summary = "Đăng xuất và vô hiệu hóa token")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> logout(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @CookieValue(name = REFRESH_TOKEN_COOKIE, required = false) String refreshToken) {
        authService.logout(authorization, refreshToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, clearRefreshCookie().toString())
                .body(ApiResponse.success(null));
    }

    @GetMapping("/me")
    @Operation(summary = "Lấy thông tin người dùng hiện tại")
    @SecurityRequirement(name = "bearerAuth")
    public ApiResponse<UserResponse> me(Authentication authentication) {
        return ApiResponse.success(authService.currentUser(authentication.getName()));
    }

    private ResponseCookie createRefreshCookie(String refreshToken) {
        return ResponseCookie.from(REFRESH_TOKEN_COOKIE, refreshToken)
                .httpOnly(true)
                .secure(refreshCookieSecure)
                .sameSite(refreshCookieSameSite)
                .path("/api/v1/auth")
                .maxAge(Duration.ofMillis(refreshTokenExpiration))
                .build();
    }

    private ResponseCookie clearRefreshCookie() {
        return ResponseCookie.from(REFRESH_TOKEN_COOKIE, "")
                .httpOnly(true)
                .secure(refreshCookieSecure)
                .sameSite(refreshCookieSameSite)
                .path("/api/v1/auth")
                .maxAge(Duration.ZERO)
                .build();
    }
}