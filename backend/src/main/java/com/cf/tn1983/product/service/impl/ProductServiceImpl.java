package com.cf.tn1983.product.service.impl;

import com.cf.tn1983.common.exception.AppException;
import com.cf.tn1983.common.exception.ErrorCode;
import com.cf.tn1983.product.Product;
import com.cf.tn1983.product.dto.request.CreateProductRequest;
import com.cf.tn1983.product.dto.request.UpdateProductRequest;
import com.cf.tn1983.product.dto.response.ProductResponse;
import com.cf.tn1983.product.mapper.ProductMapper;
import com.cf.tn1983.product.repository.ProductRepository;
import com.cf.tn1983.product.service.ProductService;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Default application service for product CRUD operations. */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    @Transactional
    public ProductResponse create(CreateProductRequest request) {
        validateUniqueName(request.getName());

        Product product = productMapper.toEntity(request);
        product.setActive(true);
        return productMapper.toResponse(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductResponse update(UUID id, UpdateProductRequest request) {
        Product product = getProduct(id);

        if (!Objects.equals(request.getName(), product.getName())) {
            validateUniqueName(request.getName());
        }

        productMapper.updateProduct(request, product);
        return productMapper.toResponse(productRepository.save(product));
    }

    @Override
    public ProductResponse getById(UUID id) {
        return productMapper.toResponse(getProduct(id));
    }

    @Override
    public List<ProductResponse> getAll() {
        return productRepository.findAllByActiveTrue().stream()
                .map(productMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        Product product = getProduct(id);
        product.setActive(false);
        productRepository.save(product);
    }

    private Product getProduct(UUID id) {
        return productRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
    }

    private void validateUniqueName(String name) {
        if (productRepository.existsByNameAndActiveTrue(name)) {
            throw new AppException(ErrorCode.PRODUCT_ALREADY_EXISTS);
        }
    }
}