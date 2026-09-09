package com.cf.tn1983.common.ratelimit;

import java.time.Duration;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

/** Type-safe rate-limit configuration loaded from application.yaml. */
@Getter
@Setter
@ConfigurationProperties(prefix = "rate-limit")
public class RateLimitProperties {

    private Limit auth;
    private Limit tracking;
    private Limit admin;

    @Getter
    @Setter
    public static class Limit {
        private long capacity;
        private long refill;
        private Duration duration;
    }
}