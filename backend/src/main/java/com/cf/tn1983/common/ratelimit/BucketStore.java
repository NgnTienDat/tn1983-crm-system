package com.cf.tn1983.common.ratelimit;

import io.github.bucket4j.Bucket;
import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/** Thread-safe in-memory store shared by IP and user keys. */
@Component
@RequiredArgsConstructor
public class BucketStore {

    private final ConcurrentHashMap<String, BucketEntry> buckets = new ConcurrentHashMap<>();
    private final BucketFactory bucketFactory;

    public BucketEntry getOrCreate(String key, ApiGroup group) {
        return buckets.computeIfAbsent(key, ignored -> new BucketEntry(bucketFactory.createBucket(group)));
    }

    @Scheduled(fixedDelay = 30 * 60 * 1000L)
    public void removeIdleBuckets() {
        Instant cutoff = Instant.now().minus(Duration.ofHours(24));
        buckets.entrySet().removeIf(entry -> entry.getValue().getLastAccessed().isBefore(cutoff));
    }
}