package com.cf.tn1983.customer.mapper;

import com.cf.tn1983.customer.Customer;
import com.cf.tn1983.customer.dto.request.CreateCustomerRequest;
import com.cf.tn1983.customer.dto.request.UpdateCustomerRequest;
import com.cf.tn1983.customer.dto.response.CustomerResponse;
import org.mapstruct.Mapper;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

/** Maps customer API DTOs to and from the Customer entity. */
@Mapper(componentModel = "spring")
public interface CustomerMapper {

    @Mapping(target = "active", ignore = true)
    Customer toEntity(CreateCustomerRequest request);

    CustomerResponse toResponse(Customer customer);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "active", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCustomer(UpdateCustomerRequest request, @MappingTarget Customer customer);
}