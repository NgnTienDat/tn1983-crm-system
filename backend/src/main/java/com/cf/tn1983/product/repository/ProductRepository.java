package com.cf.tn1983.product.repository;

import com.cf.tn1983.product.Product;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

/** Persistence operations for active products. */
public interface ProductRepository extends JpaRepository<Product, UUID> {

    Optional<Product> findByIdAndActiveTrue(UUID id);

    List<Product> findAllByActiveTrue();

    boolean existsByNameAndActiveTrue(String name);
}