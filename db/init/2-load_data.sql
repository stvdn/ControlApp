-- load_data.sql

-- Insert Users
INSERT INTO user_info (name, lastname, password_hash, email, role) VALUES
('Emily', 'Admin', 'admin123', 'emily@example.com', 'admin'), -- Replace with actual hashed password
('Steven', 'User', 'admin123', 'steven@example.com', 'user'); -- Replace with actual hashed password
-- Insert Providers
INSERT INTO provider (name) VALUES 
('Fashion Forward'),
('Urban Threads'),
('Classic Styles'),
('Active Wear Inc.'),
('Luxury Apparel');

-- Insert Categories
INSERT INTO category (name) VALUES 
('Men''s Clothing'),
('Women''s Clothing'),
('Kids'' Clothing'),
('Accessories'),
('Sportswear');

-- Insert Products (20 items)
INSERT INTO product (
    provider_id, category_id, name, description, price, stock, size, 
    discount, gender, age, tags, image_paths
) VALUES
-- Men's Clothing
(1, 1, 'Classic White Shirt', '100% cotton formal shirt', 29.99, 50, 'M', 0, 'male', 'adult', 
 '{"shirt", "formal", "cotton"}', '{"shirt_white_1.jpg", "shirt_white_2.jpg"}'),

(2, 1, 'Slim Fit Jeans', 'Dark blue denim jeans with stretch', 59.95, 30, '32x32', 10, 'male', 'adult', 
 '{"jeans", "denim", "slim fit"}', '{"jeans_blue_1.jpg"}'),

(3, 1, 'Leather Jacket', 'Genuine leather biker jacket', 199.99, 15, 'L', 0, 'male', 'adult', 
 '{"jacket", "leather", "biker"}', '{"jacket_leather_1.jpg", "jacket_leather_2.jpg"}'),

-- Women's Clothing
(1, 2, 'Floral Summer Dress', 'Lightweight dress with floral pattern', 45.50, 25, 'S', 15, 'female', 'adult', 
 '{"dress", "summer", "floral"}', '{"dress_floral_1.jpg"}'),

(2, 2, 'High-Waisted Jeans', 'Distressed skinny jeans', 65.00, 40, '28x30', 0, 'female', 'adult', 
 '{"jeans", "skinny", "distressed"}', '{"jeans_highwaist_1.jpg"}'),

(4, 2, 'Yoga Leggings', 'High-performance workout leggings', 39.99, 60, 'M', 20, 'female', 'adult', 
 '{"leggings", "sport", "yoga"}', '{"leggings_black_1.jpg"}'),

-- Kids' Clothing
(3, 3, 'Dinosaur T-Shirt', 'Cotton t-shirt with dinosaur print', 14.99, 100, '6-7', 0, 'unisex', 'child', 
 '{"t-shirt", "kids", "dinosaur"}', '{"tshirt_dino_1.jpg"}'),

(5, 3, 'Princess Dress', 'Sparkly dress for special occasions', 34.95, 20, '4-5', 10, 'female', 'child', 
 '{"dress", "princess", "sparkly"}', '{"dress_princess_1.jpg"}'),

-- Accessories
(2, 4, 'Wool Beanie', 'Warm winter hat in multiple colors', 19.99, 80, 'One Size', 0, 'unisex', 'adult', 
 '{"hat", "winter", "accessory"}', '{"beanie_gray_1.jpg"}'),

(4, 4, 'Sports Backpack', 'Lightweight backpack for workouts', 49.95, 35, NULL, 15, 'unisex', 'adult', 
 '{"bag", "sport", "backpack"}', '{"backpack_sports_1.jpg"}'),

-- More Men's
(5, 1, 'Cashmere Sweater', 'Luxury 100% cashmere pullover', 149.00, 12, 'XL', 0, 'male', 'adult', 
 '{"sweater", "winter", "luxury"}', '{"sweater_cashmere_1.jpg"}'),

(1, 1, 'Cargo Shorts', 'Utility shorts with multiple pockets', 34.99, 45, '34', 0, 'male', 'adult', 
 '{"shorts", "summer", "cargo"}', '{"shorts_cargo_1.jpg"}'),

-- More Women's
(3, 2, 'Silk Blouse', 'Elegant evening blouse', 79.95, 18, 'M', 25, 'female', 'adult', 
 '{"blouse", "silk", "elegant"}', '{"blouse_silk_1.jpg"}'),

(5, 2, 'Evening Gown', 'Red carpet ready gown', 299.99, 5, '8', 0, 'female', 'adult', 
 '{"gown", "evening", "formal"}', '{"gown_evening_1.jpg"}'),

-- More Kids'
(2, 3, 'Superhero Costume', 'Full costume with cape', 29.99, 30, '5-6', 0, 'male', 'child', 
 '{"costume", "superhero", "play"}', '{"costume_hero_1.jpg"}'),

(4, 3, 'Rain Jacket', 'Waterproof jacket with hood', 42.50, 25, '7-8', 10, 'unisex', 'child', 
 '{"jacket", "rain", "waterproof"}', '{"jacket_rain_1.jpg"}'),

-- Sportswear
(4, 5, 'Running Shoes', 'Lightweight performance runners', 89.99, 40, '9', 20, 'male', 'adult', 
 '{"shoes", "running", "sport"}', '{"shoes_running_1.jpg"}'),

(1, 5, 'Training Tank Top', 'Breathable workout top', 24.95, 65, 'L', 0, 'female', 'adult', 
 '{"top", "sport", "training"}', '{"tank_sports_1.jpg"}'),

-- More Accessories
(3, 4, 'Leather Belt', 'Genuine leather dress belt', 45.00, 30, '38', 0, 'male', 'adult', 
 '{"belt", "leather", "accessory"}', '{"belt_leather_1.jpg"}'),

(5, 4, 'Designer Handbag', 'Luxury leather tote bag', 249.00, 8, NULL, 0, 'female', 'adult', 
 '{"bag", "luxury", "handbag"}', '{"bag_designer_1.jpg"}');