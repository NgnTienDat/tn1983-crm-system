package com.cf.tn1983.customer.repository;

import com.cf.tn1983.customer.Customer;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/** Persistence operations for active customers. */
public interface CustomerRepository extends JpaRepository<Customer, UUID> {

    Optional<Customer> findByIdAndActiveTrue(UUID id);

        @Query("""
                        select customer from Customer customer
                        where customer.active = true
                            and (
                                :keyword is null
                                or :keyword = ''
                                or lower(customer.name) like lower(concat('%', :keyword, '%'))
                                or customer.phone like concat('%', :keyword, '%')
                                or lower(customer.address) like lower(concat('%', :keyword, '%'))
                            )
                        """)
        Page<Customer> searchActive(@Param("keyword") String keyword, Pageable pageable);

    boolean existsByPhoneAndActiveTrue(String phone);
}