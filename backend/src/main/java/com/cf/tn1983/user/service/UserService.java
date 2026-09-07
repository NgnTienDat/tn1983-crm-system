package com.cf.tn1983.user.service;

import com.cf.tn1983.user.dto.request.CreateUserRequest;
import com.cf.tn1983.user.dto.request.UpdateUserRequest;
import com.cf.tn1983.user.dto.response.UserResponse;
import java.util.List;
import java.util.UUID;

/** Application operations for managing users. */
public interface UserService {

    UserResponse create(CreateUserRequest request);

    UserResponse update(UUID id, UpdateUserRequest request);

    UserResponse getById(UUID id);

    List<UserResponse> getAll();

    void delete(UUID id);
}