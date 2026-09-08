package com.cf.tn1983.product.mapper;

import com.cf.tn1983.product.Product;
import com.cf.tn1983.product.dto.request.CreateProductRequest;
import com.cf.tn1983.product.dto.request.UpdateProductRequest;
import com.cf.tn1983.product.dto.response.ProductResponse;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

/** Maps product API DTOs to and from the Product entity. */
@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "active", ignore = true)
    @Mapping(target = "orderItems", ignore = true)
    Product toEntity(CreateProductRequest request);

    ProductResponse toResponse(Product product);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "orderItems", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProduct(UpdateProductRequest request, @MappingTarget Product product);
}