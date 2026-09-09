package com.cf.tn1983.customer.service;

import com.cf.tn1983.customer.dto.request.CreateCustomerRequest;
import com.cf.tn1983.customer.dto.request.UpdateCustomerRequest;
import com.cf.tn1983.customer.dto.response.CustomerResponse;
import com.cf.tn1983.common.response.PageResponse;
import java.util.UUID;

/** Application operations for managing customers. */
public interface CustomerService {

    CustomerResponse create(CreateCustomerRequest request);

    CustomerResponse update(UUID id, UpdateCustomerRequest request);

    CustomerResponse getById(UUID id);

    PageResponse<CustomerResponse> getAll(int page, int size, String keyword);

    void delete(UUID id);
}