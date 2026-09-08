CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    full_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255),
    active BOOLEAN,
    CONSTRAINT uk_users_email UNIQUE (email),
    CONSTRAINT uk_users_phone UNIQUE (phone)
);

CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    note VARCHAR(255),
    type VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    listed_price NUMERIC(19, 2) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS blacklisted_tokens (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    token_id VARCHAR(255) NOT NULL,
    expiry_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT uk_blacklisted_tokens_token_id UNIQUE (token_id)
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    user_id UUID NOT NULL,
    family_id UUID NOT NULL,
    token_id VARCHAR(255) NOT NULL,
    parent_token_id VARCHAR(255),
    expiry_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    used BOOLEAN NOT NULL,
    revoked BOOLEAN NOT NULL,
    CONSTRAINT uk_refresh_tokens_token_id UNIQUE (token_id)
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    order_code VARCHAR(255) NOT NULL,
    customer_id UUID NOT NULL,
    receiver_name VARCHAR(255),
    receiver_phone VARCHAR(255),
    receiver_address VARCHAR(255),
    source VARCHAR(255),
    shipping_method VARCHAR(255),
    total_amount NUMERIC(19, 2),
    status VARCHAR(255),
    note VARCHAR(255),
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT uk_orders_order_code UNIQUE (order_code),
    CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id) REFERENCES customers (id)
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    order_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity_kg NUMERIC(19, 3),
    unit_price_per_kg NUMERIC(19, 2),
    total_price NUMERIC(19, 2),
    packaging_type VARCHAR(255),
    package_size VARCHAR(255),
    package_count INTEGER,
    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id) REFERENCES orders (id),
    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS order_status_histories (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    order_id UUID NOT NULL,
    status VARCHAR(255),
    note VARCHAR(255),
    changed_at TIMESTAMP WITHOUT TIME ZONE,
    changed_by_id UUID,
    CONSTRAINT fk_order_status_histories_order
        FOREIGN KEY (order_id) REFERENCES orders (id),
    CONSTRAINT fk_order_status_histories_changed_by
        FOREIGN KEY (changed_by_id) REFERENCES users (id)
);
