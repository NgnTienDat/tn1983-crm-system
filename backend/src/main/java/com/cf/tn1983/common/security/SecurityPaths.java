package com.cf.tn1983.common.security;

/** Shared public endpoint patterns used by security configuration and JWT filter. */
public final class SecurityPaths {

    public static final String[] PUBLIC = {
            "/api/v1/auth/login",
            "/api/v1/auth/refresh",
            "/api/v1/orders/code/**",
            "/swagger-ui.html",
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/actuator/health",
            "/public/**"
    };

    private SecurityPaths() {
    }
}