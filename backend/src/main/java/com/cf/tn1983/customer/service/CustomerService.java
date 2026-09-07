package com.cf.tn1983.customer.service;

import com.cf.tn1983.customer.dto.request.CreateCustomerRequest;
import com.cf.tn1983.customer.dto.request.UpdateCustomerRequest;
import com.cf.tn1983.customer.dto.response.CustomerResponse;
import java.util.List;
import java.util.UUID;

/** Application operations for managing customers. */
public interface CustomerService {

    CustomerResponse create(CreateCustomerRequest request);

    CustomerResponse update(UUID id, UpdateCustomerRequest request);

    CustomerResponse getById(UUID id);

    List<CustomerResponse> getAll();

    void delete(UUID id);
}