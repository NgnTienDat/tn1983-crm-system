package com.cf.tn1983.auth.service;

import com.cf.tn1983.auth.dto.LoginRequest;
import com.cf.tn1983.auth.dto.AuthTokenResult;
import com.cf.tn1983.user.dto.response.UserResponse;

public interface AuthService {

    AuthTokenResult login(LoginRequest request);

    AuthTokenResult refresh(String refreshToken);

    void logout(String authorizationHeader, String refreshToken);

    UserResponse currentUser(String userId);
}