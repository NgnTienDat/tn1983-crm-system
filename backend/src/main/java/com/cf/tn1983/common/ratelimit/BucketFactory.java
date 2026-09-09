package com.cf.tn1983.common.ratelimit;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/** Creates buckets from the configured quota for each API group. */
@Component
@RequiredArgsConstructor
public class BucketFactory {

    private final RateLimitProperties properties;

    public Bucket createBucket(ApiGroup group) {
        RateLimitProperties.Limit limit = switch (group) {
            case AUTH -> properties.getAuth();
            case TRACKING -> properties.getTracking();
            case ADMIN -> properties.getAdmin();
        };
        Bandwidth bandwidth = Bandwidth.builder()
                .capacity(limit.getCapacity())
                .refillGreedy(limit.getRefill(), limit.getDuration())
                .build();
        return Bucket.builder().addLimit(bandwidth).build();
    }
}