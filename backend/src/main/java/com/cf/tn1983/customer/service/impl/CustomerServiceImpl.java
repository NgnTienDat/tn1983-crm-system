package com.cf.tn1983.customer.service.impl;

import com.cf.tn1983.common.exception.AppException;
import com.cf.tn1983.common.exception.ErrorCode;
import com.cf.tn1983.common.response.PageResponse;
import com.cf.tn1983.customer.Customer;
import com.cf.tn1983.customer.dto.request.CreateCustomerRequest;
import com.cf.tn1983.customer.dto.request.UpdateCustomerRequest;
import com.cf.tn1983.customer.dto.response.CustomerResponse;
import com.cf.tn1983.customer.mapper.CustomerMapper;
import com.cf.tn1983.customer.repository.CustomerRepository;
import com.cf.tn1983.customer.service.CustomerService;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

/** Default application service for customer CRUD operations. */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Override
    @Transactional
    public CustomerResponse create(CreateCustomerRequest request) {
        validateUniquePhone(request.getPhone());

        Customer customer = customerMapper.toEntity(request);
        customer.setActive(true);
        return customerMapper.toResponse(customerRepository.save(customer));
    }

    @Override
    @Transactional
    public CustomerResponse update(UUID id, UpdateCustomerRequest request) {
        Customer customer = getCustomer(id);

        if (request.getPhone() != null && !Objects.equals(request.getPhone(), customer.getPhone())) {
            validateUniquePhone(request.getPhone());
        }

        customerMapper.updateCustomer(request, customer);
        return customerMapper.toResponse(customerRepository.save(customer));
    }

    @Override
    public CustomerResponse getById(UUID id) {
        return customerMapper.toResponse(getCustomer(id));
    }

    @Override
    public PageResponse<CustomerResponse> getAll(int page, int size, String keyword) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        var customers = customerRepository.searchActive(normalizeKeyword(keyword), pageable);
        var responsePage = customers.map(customerMapper::toResponse);
        return PageResponse.from(responsePage);
    }

    private String normalizeKeyword(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return null;
        }
        return keyword.trim();
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        Customer customer = getCustomer(id);
        customer.setActive(false);
        customerRepository.save(customer);
    }

    private Customer getCustomer(UUID id) {
        return customerRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
    }

    private void validateUniquePhone(String phone) {
        if (customerRepository.existsByPhoneAndActiveTrue(phone)) {
            throw new AppException(ErrorCode.CUSTOMER_PHONE_ALREADY_EXISTS);
        }
    }

}