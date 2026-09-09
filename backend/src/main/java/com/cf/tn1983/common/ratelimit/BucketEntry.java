package com.cf.tn1983.common.ratelimit;

import io.github.bucket4j.Bucket;
import java.time.Instant;
import lombok.Getter;

/** A bucket and its last request time for idle-entry cleanup. */
@Getter
public class BucketEntry {

    private final Bucket bucket;
    private volatile Instant lastAccessed;

    public BucketEntry(Bucket bucket) {
        this.bucket = bucket;
        this.lastAccessed = Instant.now();
    }

    public void touch() {
        lastAccessed = Instant.now();
    }
}