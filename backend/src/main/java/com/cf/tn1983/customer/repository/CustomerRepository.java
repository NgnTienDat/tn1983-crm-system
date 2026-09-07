package com.cf.tn1983.customer.repository;

import com.cf.tn1983.customer.Customer;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

/** Persistence operations for active customers. */
public interface CustomerRepository extends JpaRepository<Customer, UUID> {

    Optional<Customer> findByIdAndActiveTrue(UUID id);

    List<Customer> findAllByActiveTrue();

    boolean existsByPhoneAndActiveTrue(String phone);
}