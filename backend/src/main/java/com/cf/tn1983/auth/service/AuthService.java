package com.cf.tn1983.auth.service;

import com.cf.tn1983.auth.dto.LoginRequest;
import com.cf.tn1983.auth.dto.LogoutRequest;
import com.cf.tn1983.auth.dto.RefreshTokenRequest;
import com.cf.tn1983.auth.dto.TokenResponse;
import com.cf.tn1983.user.dto.response.UserResponse;

public interface AuthService {

    TokenResponse login(LoginRequest request);

    TokenResponse refresh(RefreshTokenRequest request);

    void logout(String authorizationHeader, LogoutRequest request);

    UserResponse currentUser(String userId);
}