-- =========================================
-- LUXE PERN E-COMMERCE DATABASE
-- PostgreSQL
-- =========================================

-- =========================================
-- USERS
-- =========================================

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    role VARCHAR(20) NOT NULL DEFAULT 'user'
        CHECK (role IN ('user', 'admin')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================
-- CATEGORIES
-- =========================================

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(100) UNIQUE NOT NULL,

    slug VARCHAR(120) UNIQUE NOT NULL,

    description TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================
-- PRODUCTS
-- =========================================

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,

    category_id BIGINT
        REFERENCES categories(id)
        ON DELETE SET NULL,

    name VARCHAR(255) NOT NULL,

    slug VARCHAR(280) UNIQUE NOT NULL,

    description TEXT,

    price NUMERIC(10, 2) NOT NULL
        CHECK (price >= 0),

    stock INTEGER NOT NULL DEFAULT 0
        CHECK (stock >= 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================
-- PRODUCT IMAGES
-- =========================================

CREATE TABLE product_images (
    id BIGSERIAL PRIMARY KEY,

    product_id BIGINT NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    image_url TEXT NOT NULL,

    is_primary BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================
-- CART ITEMS
-- =========================================

CREATE TABLE cart_items (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    product_id BIGINT NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    quantity INTEGER NOT NULL DEFAULT 1
        CHECK (quantity > 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (user_id, product_id)
);


-- =========================================
-- WISHLIST ITEMS
-- =========================================

CREATE TABLE wishlist_items (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    product_id BIGINT NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (user_id, product_id)
);


-- =========================================
-- ADDRESSES
-- =========================================

CREATE TABLE addresses (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    full_name VARCHAR(100) NOT NULL,

    phone VARCHAR(20) NOT NULL,

    address_line1 TEXT NOT NULL,

    address_line2 TEXT,

    city VARCHAR(100) NOT NULL,

    state VARCHAR(100) NOT NULL,

    postal_code VARCHAR(20) NOT NULL,

    country VARCHAR(100) NOT NULL DEFAULT 'India',

    is_default BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================
-- ORDERS
-- =========================================

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL
        REFERENCES users(id)
        ON DELETE RESTRICT,

    address_id BIGINT
        REFERENCES addresses(id)
        ON DELETE SET NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'pending'
        CHECK (
            status IN (
                'pending',
                'confirmed',
                'processing',
                'shipped',
                'delivered',
                'cancelled'
            )
        ),

    payment_status VARCHAR(30) NOT NULL DEFAULT 'pending'
        CHECK (
            payment_status IN (
                'pending',
                'paid',
                'failed',
                'refunded'
            )
        ),

    total_amount NUMERIC(10, 2) NOT NULL
        CHECK (total_amount >= 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================
-- ORDER ITEMS
-- =========================================

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,

    order_id BIGINT NOT NULL
        REFERENCES orders(id)
        ON DELETE CASCADE,

    product_id BIGINT
        REFERENCES products(id)
        ON DELETE SET NULL,

    product_name VARCHAR(255) NOT NULL,

    quantity INTEGER NOT NULL
        CHECK (quantity > 0),

    price NUMERIC(10, 2) NOT NULL
        CHECK (price >= 0),

    subtotal NUMERIC(10, 2) NOT NULL
        CHECK (subtotal >= 0),

    CONSTRAINT order_item_subtotal_check
        CHECK (subtotal = price * quantity)
);


-- =========================================
-- REVIEWS
-- =========================================

CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    product_id BIGINT NOT NULL
        REFERENCES products(id)
        ON DELETE CASCADE,

    rating INTEGER NOT NULL
        CHECK (rating BETWEEN 1 AND 5),

    comment TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (user_id, product_id)
);


-- =========================================
-- INDEXES
-- =========================================

CREATE INDEX idx_products_category_id
ON products(category_id);


CREATE INDEX idx_products_name
ON products(name);


CREATE INDEX idx_products_created_at
ON products(created_at DESC);


CREATE INDEX idx_product_images_product_id
ON product_images(product_id);


CREATE INDEX idx_cart_items_user_id
ON cart_items(user_id);


CREATE INDEX idx_cart_items_product_id
ON cart_items(product_id);


CREATE INDEX idx_wishlist_items_user_id
ON wishlist_items(user_id);


CREATE INDEX idx_wishlist_items_product_id
ON wishlist_items(product_id);


CREATE INDEX idx_addresses_user_id
ON addresses(user_id);


CREATE INDEX idx_orders_user_id
ON orders(user_id);


CREATE INDEX idx_orders_status
ON orders(status);


CREATE INDEX idx_orders_created_at
ON orders(created_at DESC);


CREATE INDEX idx_order_items_order_id
ON order_items(order_id);


CREATE INDEX idx_order_items_product_id
ON order_items(product_id);


CREATE INDEX idx_reviews_product_id
ON reviews(product_id);


-- =========================================
-- ONE DEFAULT ADDRESS PER USER
-- =========================================

CREATE UNIQUE INDEX idx_one_default_address_per_user
ON addresses(user_id)
WHERE is_default = TRUE;


-- =========================================
-- UPDATED_AT TRIGGER FUNCTION
-- =========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =========================================
-- UPDATED_AT TRIGGERS
-- =========================================

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TRIGGER update_cart_items_updated_at
BEFORE UPDATE ON cart_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TRIGGER update_addresses_updated_at
BEFORE UPDATE ON addresses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();