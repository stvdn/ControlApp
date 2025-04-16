-- load_data.sql

-- Insert Users
INSERT INTO user_admin (name, lastname, password_hash, email, role) VALUES
('Emily', 'Admin', 'admin123', 'emily@example.com', 'admin'), -- Replace with actual hashed password
('Steven', 'User', 'admin123', 'steven@example.com', 'user'); -- Replace with actual hashed password
-- Insert Providers
INSERT INTO provider (name) VALUES
('Supplier A'),
('Supplier B'),
('Supplier C');

-- Insert Categories
INSERT INTO category (name) VALUES
('Electronics'),
('Clothing'),
('Books');

-- Insert Products
-- load_data.sql (Continued from previous)

-- Insert Clothing Products
INSERT INTO product (provider_id, category_id, name, price, stock, size, discount, gender, age, tags, image_paths) VALUES
(1, 2, 'Classic White T-Shirt', 19.99, 150, 'M', 0.00, 'Unisex', 'Adult', '{"clothing", "tshirt", "basic"}', '{"https://example.com/white_tshirt.jpg"}'),
(2, 2, 'Slim Fit Jeans', 49.99, 80, '32', 0.10, 'Male', 'Adult', '{"clothing", "jeans", "slim"}', '{"https://example.com/slim_jeans.jpg"}'),
(3, 2, 'Floral Print Dress', 39.99, 120, 'S', 0.05, 'Female', 'Adult', '{"clothing", "dress", "floral"}', '{"https://example.com/floral_dress.jpg"}'),
(1, 2, 'Hooded Sweatshirt', 34.99, 90, 'L', 0.15, 'Unisex', 'Adult', '{"clothing", "hoodie", "casual"}', '{"https://example.com/hooded_sweatshirt.jpg"}'),
(2, 2, 'Striped Polo Shirt', 24.99, 110, 'XL', 0.00, 'Male', 'Adult', '{"clothing", "polo", "striped"}', '{"https://example.com/striped_polo.jpg"}'),
(3, 2, 'Summer Shorts', 29.99, 100, '34', 0.20, 'Male', 'Adult', '{"clothing", "shorts", "summer"}', '{"https://example.com/summer_shorts.jpg"}'),
(1, 2, 'Knit Sweater', 44.99, 70, 'M', 0.10, 'Female', 'Adult', '{"clothing", "sweater", "knit"}', '{"https://example.com/knit_sweater.jpg"}'),
(2, 2, 'Cargo Pants', 39.99, 85, '36', 0.05, 'Male', 'Adult', '{"clothing", "pants", "cargo"}', '{"https://example.com/cargo_pants.jpg"}'),
(3, 2, 'Maxi Skirt', 34.99, 95, 'L', 0.15, 'Female', 'Adult', '{"clothing", "skirt", "maxi"}', '{"https://example.com/maxi_skirt.jpg"}'),
(1, 2, 'Baseball Cap', 14.99, 180, NULL, 0.00, 'Unisex', 'Adult', '{"clothing", "cap", "casual"}', '{"https://example.com/baseball_cap.jpg"}'),
(2, 2, 'Leather Belt', 29.99, 120, NULL, 0.10, 'Male', 'Adult', '{"clothing", "belt", "leather"}', '{"https://example.com/leather_belt.jpg"}'),
(3, 2, 'Silk Scarf', 24.99, 150, NULL, 0.05, 'Female', 'Adult', '{"clothing", "scarf", "silk"}', '{"https://example.com/silk_scarf.jpg"}'),
(1, 2, 'Ankle Socks (3-pack)', 9.99, 200, NULL, 0.00, 'Unisex', 'Adult', '{"clothing", "socks", "basic"}', '{"https://example.com/ankle_socks.jpg"}'),
(2, 2, 'Formal Shirt', 39.99, 80, '16', 0.15, 'Male', 'Adult', '{"clothing", "shirt", "formal"}', '{"https://example.com/formal_shirt.jpg"}'),
(3, 2, 'Leggings', 24.99, 130, 'M', 0.20, 'Female', 'Adult', '{"clothing", "leggings", "active"}', '{"https://example.com/leggings.jpg"}'),
(1, 2, 'Beanie Hat', 19.99, 160, NULL, 0.10, 'Unisex', 'Adult', '{"clothing", "hat", "beanie"}', '{"https://example.com/beanie_hat.jpg"}'),
(2, 2, 'Tie', 14.99, 140, NULL, 0.05, 'Male', 'Adult', '{"clothing", "tie", "formal"}', '{"https://example.com/tie.jpg"}'),
(3, 2, 'Cardigan', 49.99, 75, 'L', 0.00, 'Female', 'Adult', '{"clothing", "cardigan", "knit"}', '{"https://example.com/cardigan.jpg"}'),
(1, 2, 'Rain Jacket', 59.99, 60, 'XL', 0.15, 'Unisex', 'Adult', '{"clothing", "jacket", "rain"}', '{"https://example.com/rain_jacket.jpg"}'),
(2, 2, 'Boxer Briefs (3-pack)', 24.99, 100, NULL, 0.10, 'Male', 'Adult', '{"clothing", "underwear", "basic"}', '{"https://example.com/boxer_briefs.jpg"}');

-- Important: Replace example.com URLs with actual image URLs.
-- Insert Orders
INSERT INTO order_ticket (user_id, total_amount, status, payment_method) VALUES
(2, 1029.98, 'completed', 'Credit Card'),
(1, 14.99, 'pending', 'PayPal');

-- Insert Order Items
INSERT INTO order_item (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 999.99),
(1, 2, 1, 29.99),
(2, 3, 1, 14.99);
