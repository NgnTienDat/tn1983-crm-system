package com.cf.tn1983.auth.service.impl;

import com.cf.tn1983.auth.dto.LoginRequest;
import com.cf.tn1983.auth.dto.LogoutRequest;
import com.cf.tn1983.auth.dto.RefreshTokenRequest;
import com.cf.tn1983.auth.dto.TokenResponse;
import com.cf.tn1983.auth.repository.BlacklistedTokenRepository;
import com.cf.tn1983.auth.repository.RefreshTokenRepository;
import com.cf.tn1983.auth.service.AuthService;
import com.cf.tn1983.common.entity.BlacklistedToken;
import com.cf.tn1983.common.entity.RefreshToken;
import com.cf.tn1983.common.exception.AppException;
import com.cf.tn1983.common.exception.ErrorCode;
import com.cf.tn1983.common.security.jwt.JwtService;
import com.cf.tn1983.user.User;
import com.cf.tn1983.user.dto.response.UserResponse;
import com.cf.tn1983.user.mapper.UserMapper;
import com.cf.tn1983.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final BlacklistedTokenRepository blacklistedTokenRepository;

    @Override
    @Transactional
    public TokenResponse login(LoginRequest request) {
        User user = userRepository.findByPhone(request.getPhone())
                .filter(found -> Boolean.TRUE.equals(found.getActive()))
                .filter(found -> passwordEncoder.matches(request.getPassword(), found.getPassword()))
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHORIZED));
        return issueTokens(user, null, null);
    }

    @Override
    @Transactional(noRollbackFor = AppException.class)
    public TokenResponse refresh(RefreshTokenRequest request) {
        Claims claims = parseRefresh(request.getRefreshToken());
        String tokenId = claims.get("tokenId", String.class);
        RefreshToken current = refreshTokenRepository.findByTokenIdForUpdate(tokenId)
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHORIZED));

        if (Boolean.TRUE.equals(current.getUsed()) || Boolean.TRUE.equals(current.getRevoked())) {
            refreshTokenRepository.revokeFamily(current.getFamilyId());
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        if (!current.getExpiryDate().isAfter(LocalDateTime.now())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        if (!current.getUserId().toString().equals(claims.get("userId", String.class))) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        current.setUsed(true);
        refreshTokenRepository.save(current);
        User user = userRepository.findById(current.getUserId())
                .filter(found -> Boolean.TRUE.equals(found.getActive()))
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHORIZED));
        return issueTokens(user, current.getTokenId(), current.getFamilyId());
    }

    @Override
    @Transactional
    public void logout(String authorizationHeader, LogoutRequest request) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                Claims claims = jwtService.parseAccessToken(authorizationHeader.substring(7));
                Date expiry = claims.getExpiration();
                if (claims.getId() != null && expiry.after(new Date())) {
                    blacklistedTokenRepository.save(BlacklistedToken.builder()
                            .tokenId(claims.getId())
                            .expiryDate(LocalDateTime.ofInstant(expiry.toInstant(), ZoneOffset.UTC))
                            .build());
                }
            } catch (JwtException | IllegalArgumentException ignored) {
                // Logout remains idempotent for an expired or malformed access token.
            }
        }
        if (request != null && request.getRefreshToken() != null) {
            try {
                Claims claims = parseRefresh(request.getRefreshToken());
                refreshTokenRepository.findByTokenId(claims.get("tokenId", String.class))
                        .ifPresent(token -> {
                            token.setRevoked(true);
                            refreshTokenRepository.save(token);
                        });
            } catch (JwtException | IllegalArgumentException ignored) {
                // Logout remains idempotent for an expired or malformed refresh token.
            }
        }
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse currentUser(String userId) {
        return userRepository.findById(UUID.fromString(userId))
                .filter(found -> Boolean.TRUE.equals(found.getActive()))
                .map(userMapper::toResponse)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    // Generates and persists a new access token and refresh token for the given user. The parentTokenId is used to link the new refresh token to its parent in the token family, and the familyId is used to group related tokens together. If familyId is null, a new family is created with the new token as the root.
    private TokenResponse issueTokens(User user, String parentTokenId, UUID familyId) {
        String tokenId = UUID.randomUUID().toString();
        UUID rootFamilyId = familyId == null ? UUID.fromString(tokenId) : familyId;
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user.getId(), tokenId);
        refreshTokenRepository.save(RefreshToken.builder()
                .userId(user.getId())
                .familyId(rootFamilyId)
                .tokenId(tokenId)
                .parentTokenId(parentTokenId)
                .expiryDate(LocalDateTime.ofInstant(
                    Instant.now().plus(Duration.ofMillis(jwtService.getRefreshTokenExpiration())),
                    ZoneOffset.UTC))
                .used(false)
                .revoked(false)
                .build());
        return TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtService.getAccessTokenExpiration())
                .build();
    }

    private Claims parseRefresh(String token) {
        try {
            Claims claims = jwtService.parseRefreshToken(token);
            if (!jwtService.isRefreshToken(claims)) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
            return claims;
        } catch (JwtException | IllegalArgumentException exception) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
    }
}