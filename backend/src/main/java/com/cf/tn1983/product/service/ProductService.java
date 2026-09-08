package com.cf.tn1983.product.service;

import com.cf.tn1983.product.dto.request.CreateProductRequest;
import com.cf.tn1983.product.dto.request.UpdateProductRequest;
import com.cf.tn1983.product.dto.response.ProductResponse;
import java.util.List;
import java.util.UUID;

/** Application operations for managing products. */
public interface ProductService {

    ProductResponse create(CreateProductRequest request);

    ProductResponse update(UUID id, UpdateProductRequest request);

    ProductResponse getById(UUID id);

    List<ProductResponse> getAll(Boolean active);

    void delete(UUID id);
}