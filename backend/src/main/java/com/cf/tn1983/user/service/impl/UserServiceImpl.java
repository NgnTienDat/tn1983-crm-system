package com.cf.tn1983.user.service.impl;

import com.cf.tn1983.common.exception.AppException;
import com.cf.tn1983.common.exception.ErrorCode;
import com.cf.tn1983.user.User;
import com.cf.tn1983.user.dto.request.CreateUserRequest;
import com.cf.tn1983.user.dto.request.UpdateUserRequest;
import com.cf.tn1983.user.dto.response.UserResponse;
import com.cf.tn1983.user.mapper.UserMapper;
import com.cf.tn1983.user.repository.UserRepository;
import com.cf.tn1983.user.service.UserService;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;

/** Default application service for user CRUD operations. */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse create(CreateUserRequest request) {
        validateUniqueEmail(request.getEmail());
        validateUniquePhone(request.getPhone());

        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setActive(true);
        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse update(UUID id, UpdateUserRequest request) {
        User user = getUser(id);

        if (request.getEmail() != null && !Objects.equals(request.getEmail(), user.getEmail())) {
            validateUniqueEmail(request.getEmail());
        }
        if (!request.getPhone().equals(user.getPhone())) {
            validateUniquePhone(request.getPhone());
        }

        userMapper.updateUser(request, user);
        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse getById(UUID id) {
        return userMapper.toResponse(getUser(id));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAll() {
        return userRepository.findAll().stream()
                .map(userMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(UUID id) {
        User user = getUser(id);
        user.setActive(false);
        userRepository.save(user);
    }


    @PreAuthorize("hasRole('ADMIN')")
    private User getUser(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    private void validateUniqueEmail(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }
    }

    private void validateUniquePhone(String phone) {
        if (userRepository.existsByPhone(phone)) {
            throw new AppException(ErrorCode.PHONE_ALREADY_EXISTS);
        }
    }
}