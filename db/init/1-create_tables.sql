-- Create Users Table with role-based access control
CREATE TABLE user_info (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user', -- 'admin', 'user', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Providers Table
CREATE TABLE provider (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create Categories Table
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create Products Table with arrays for tags and images
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    provider_id INT,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    size VARCHAR(50),
    discount INT,
    gender VARCHAR(50),
    age VARCHAR(50),
    tags VARCHAR[] DEFAULT '{}',
    image_paths VARCHAR[] DEFAULT '{}',
    qr_code_uuid UUID DEFAULT gen_random_uuid(),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES provider(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Create Orders Table
CREATE TABLE order_ticket (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_info(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Order Items Table for individual products in an order
CREATE TABLE order_item (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES order_ticket(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);