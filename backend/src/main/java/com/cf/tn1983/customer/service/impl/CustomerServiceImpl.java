package com.cf.tn1983.customer.service.impl;

import com.cf.tn1983.common.exception.AppException;
import com.cf.tn1983.common.exception.ErrorCode;
import com.cf.tn1983.customer.Customer;
import com.cf.tn1983.customer.dto.request.CreateCustomerRequest;
import com.cf.tn1983.customer.dto.request.UpdateCustomerRequest;
import com.cf.tn1983.customer.dto.response.CustomerResponse;
import com.cf.tn1983.customer.mapper.CustomerMapper;
import com.cf.tn1983.customer.repository.CustomerRepository;
import com.cf.tn1983.customer.service.CustomerService;
import com.cf.tn1983.user.User;
import com.cf.tn1983.user.repository.UserRepository;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Default application service for customer CRUD operations. */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public CustomerResponse create(CreateCustomerRequest request) {
        validateUniquePhone(request.getPhone());

        Customer customer = customerMapper.toEntity(request);
        customer.setActive(true);
        customer.setUser(resolveUser(request.getUserId()));
        return customerMapper.toResponse(customerRepository.save(customer));
    }

    @Override
    @Transactional
    public CustomerResponse update(UUID id, UpdateCustomerRequest request) {
        Customer customer = getCustomer(id);

        if (!Objects.equals(request.getPhone(), customer.getPhone())) {
            validateUniquePhone(request.getPhone());
        }

        customerMapper.updateCustomer(request, customer);
        customer.setUser(resolveUser(request.getUserId()));
        return customerMapper.toResponse(customerRepository.save(customer));
    }

    @Override
    public CustomerResponse getById(UUID id) {
        return customerMapper.toResponse(getCustomer(id));
    }

    @Override
    public List<CustomerResponse> getAll() {
        return customerRepository.findAllByActiveTrue().stream()
                .map(customerMapper::toResponse)
                .toList();
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

    private User resolveUser(UUID userId) {
        if (userId == null) {
            return null;
        }
        return userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }
}