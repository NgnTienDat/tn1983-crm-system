package com.cf.tn1983.auth.dto;

public record AuthTokenResult(TokenResponse response, String refreshToken) {
}