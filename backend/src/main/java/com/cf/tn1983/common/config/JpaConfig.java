package com.cf.tn1983.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/** Enables UTC audit timestamps through Spring Data JPA auditing. */
@Configuration
@EnableJpaAuditing
public class JpaConfig {
}