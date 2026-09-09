package com.cf.tn1983.common.security.jwt;

import com.cf.tn1983.auth.repository.BlacklistedTokenRepository;
import com.cf.tn1983.common.exception.AppException;
import com.cf.tn1983.common.exception.ErrorCode;
import com.cf.tn1983.common.exception.SecurityExceptionDelegate;
import com.cf.tn1983.common.security.CustomUserDetailsService;
import com.cf.tn1983.common.security.SecurityPaths;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.util.AntPathMatcher;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final AntPathMatcher PATH_MATCHER = new AntPathMatcher();

    private final JwtService jwtService;
    private final BlacklistedTokenRepository blacklistedTokenRepository;
    private final CustomUserDetailsService userDetailsService;
    private final SecurityExceptionDelegate exceptionDelegate;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        for (String pattern : SecurityPaths.JWT_BYPASS_PATHS) {
            if (PATH_MATCHER.match(pattern, path)) {
                return true;
            }
        }
        return false;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            Claims claims = jwtService.parseAccessToken(header.substring(7));
            String tokenId = claims.getId();
            if (jwtService.isRefreshToken(claims)
                    || tokenId == null
                    || blacklistedTokenRepository.existsByTokenId(tokenId)) {
                exceptionDelegate.resolve(request, response, new AppException(ErrorCode.UNAUTHORIZED));
                return;
            }

            UUID userId = UUID.fromString(claims.get("userId", String.class));
            UserDetails userDetails = userDetailsService.loadUserById(userId);
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (JwtException | IllegalArgumentException | UsernameNotFoundException exception) {
            SecurityContextHolder.clearContext();
            exceptionDelegate.resolve(request, response, new AppException(ErrorCode.UNAUTHORIZED));
            return;
        }
        filterChain.doFilter(request, response);
    }
}