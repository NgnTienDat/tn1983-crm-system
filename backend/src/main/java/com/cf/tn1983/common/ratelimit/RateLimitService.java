package com.cf.tn1983.common.ratelimit;

import io.github.bucket4j.ConsumptionProbe;
import jakarta.servlet.http.HttpServletRequest;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

/**
 * Resolves identity, consumes the matching bucket token, and builds the
 * decision.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RateLimitService {

    private final ApiGroupResolver apiGroupResolver;
    private final AuthenticationResolver authenticationResolver;
    private final ClientIpResolver clientIpResolver;
    private final BucketStore bucketStore;

    public RateLimitResult check(HttpServletRequest request, Authentication authentication) {
        ApiGroup group = apiGroupResolver.resolve(request.getServletPath()).orElse(null);
        if (group == null) {
            return RateLimitResult.allowed(Long.MAX_VALUE);
        }

        String key = resolveKey(group, request, authentication);
        log.info(
                "group={}, key={}, auth={}",
                group.name(),
                key,
                authentication != null);
        BucketEntry entry = bucketStore.getOrCreate(key, group);
        ConsumptionProbe probe = entry.getBucket().tryConsumeAndReturnRemaining(1);
        entry.touch();
        if (probe.isConsumed()) {
            return RateLimitResult.allowed(probe.getRemainingTokens());
        }
        long retryAfter = Math.max(1,
                TimeUnit.NANOSECONDS.toSeconds(probe.getNanosToWaitForRefill())
                        + (probe.getNanosToWaitForRefill() % TimeUnit.SECONDS.toNanos(1) == 0 ? 0 : 1));
        return RateLimitResult.rejected(retryAfter);
    }

    private String resolveKey(ApiGroup group, HttpServletRequest request, Authentication authentication) {
        
        if (authenticationResolver.isAuthenticated(authentication)) {
            // log.info("Authenticated user: {}", authentication.getName());
            return group.name() + ":USER:" + authentication.getName();
        }
        // log.info("Unauthenticated request from IP: {}", clientIpResolver.resolve(request));
        return group.name() + ":IP:" + clientIpResolver.resolve(request);
    }
}