-- ShopIndia Extended Database Seed
-- Copy this entire file and paste it into the Supabase SQL Editor
-- Click "Run" to flood your database with massive realistic data!

-- Clear existing products to avoid conflicts (Optional, but recommended)
-- DELETE FROM products;

-- ==========================================
-- VERTICAL 1: E-COMMERCE (vertical: 'shop')
-- ==========================================

-- Mobiles & Tablets ('s-mobiles')
INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('s101', 'Apple iPhone 15 Pro Max (256 GB) - Black Titanium', 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.', 159900, 159900, 4.8, 24500, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80', 's-mobiles', 'Apple', 'shop', true, 'Delivery Tomorrow by 11 AM', '{"Display":"6.7-inch Super Retina XDR","Chip":"A17 Pro","Camera":"48MP Main + 5x Telephoto","Material":"Aerospace-grade Titanium"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('s102', 'Samsung Galaxy S24 Ultra 5G (AI Edition, 512GB) - Titanium Yellow', 'Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 6.8-inch flat display. It is an absolute marvel of design.', 139999, 149999, 4.7, 18200, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80', 's-mobiles', 'Samsung', 'shop', true, 'Delivery Tomorrow by 11 AM', '{"Display":"6.8-inch QHD+ AMOLED 2X","RAM/ROM":"12GB RAM, 512GB Storage","Camera":"200MP Quad Camera","Battery":"5000mAh"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('s103', 'OnePlus 12R (16GB RAM, 256GB Storage) - Iron Gray', 'Smooth beyond belief. Equipped with the Snapdragon 8 Gen 2, ultra-bright 120Hz ProXDR display, and 100W SUPERVOOC charging.', 45999, 48999, 4.5, 9300, 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=800&q=80', 's-mobiles', 'OnePlus', 'shop', true, 'Delivery in 2 Days', '{"Processor":"Snapdragon 8 Gen 2","Battery":"5500mAh with 100W Fast Charge","Display":"6.78-inch AMOLED"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

-- Electronics ('s-electronics')
INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('s201', 'Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones', 'Industry-leading noise cancellation. Two processors control 8 microphones for unprecedented noise cancellation.', 29990, 34990, 4.8, 45200, 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80', 's-electronics', 'Sony', 'shop', true, 'Delivery Tomorrow by 5 PM', '{"Battery":"30 Hours","Noise Cancelling":"Auto NC Optimizer","Type":"Over-Ear Wireless"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('s202', 'Apple MacBook Air M3 (13-inch, 16GB RAM, 512GB SSD) - Starlight', 'The incredibly thin and light MacBook Air features the M3 chip, giving you superfast performance in a highly portable design.', 134900, 134900, 4.9, 8100, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', 's-electronics', 'Apple', 'shop', true, 'Delivery in 3 Days', '{"Processor":"M3 8-Core CPU","Memory":"16GB Unified","Storage":"512GB SSD","Display":"Liquid Retina"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('s203', 'Samsung 55-inch 4K Ultra HD Smart QLED TV', 'Experience quantum brilliance with 100% Color Volume. Dual LED backlighting technology provides bolder and more accurate contrast.', 54990, 74990, 4.6, 12400, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80', 's-electronics', 'Samsung', 'shop', true, 'Delivery in 4 Days', '{"Resolution":"4K Ultra HD (3840 x 2160)","Refresh Rate":"60 Hertz","Smart TV":"Tizen OS, Built-in Voice Assistant"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

-- Fashion ('s-fashion')
INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('s301', 'Nike Air Force 1 ''07 Men''s Sneakers', 'The radiance lives on in the Nike Air Force 1 ’07, the b-ball icon that puts a fresh spin on what you know best.', 7495, 7495, 4.7, 54200, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80', 's-fashion', 'Nike', 'shop', false, 'Delivery in 3 Days', '{"Material":"Leather Upper","Sole":"Rubber","Style":"Low Top Sneaker"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('s302', 'Levi''s Men 511 Slim Fit Jeans', 'A modern slim with room to move. Added stretch for all-day comfort. Lean look that’s a great alternative to skinny jeans.', 2499, 3999, 4.4, 18900, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', 's-fashion', 'Levis', 'shop', true, 'Delivery Tomorrow by 8 PM', '{"Fit":"Slim Fit","Material":"99% Cotton, 1% Elastane","Wash Care":"Machine Wash"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('s303', 'Fossil Gen 6 Smartwatch (Black Silicone)', 'Gen 6 is the first smartwatch powered by the Qualcomm Snapdragon Wear 4100+ Platform for upgraded performance.', 14995, 23995, 4.3, 8500, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', 's-fashion', 'Fossil', 'shop', true, 'Delivery in 2 Days', '{"OS":"Wear OS by Google","Battery":"24 Hr + Multi Day Extended Mode","Sensors":"Heart Rate, SpO2"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;


-- ==========================================
-- VERTICAL 2: QUICK COMMERCE (vertical: 'quick')
-- ==========================================

-- Fruits & Veggies ('q-fruits')
INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('q101', 'Fresh Hass Avocado (Imported)', 'Creamy, rich, and nutrient-dense imported Hass Avocados. Perfect for guacamole or spreading on toast.', 149, 199, 4.6, 2100, 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80', 'q-fruits', 'FreshFarm', 'quick', false, '10 Mins', '{"Weight":"1 Piece (approx 200g)","Origin":"Peru/Mexico","Ripeness":"Semi-ripe"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('q102', 'Organic Red Onions (Premium)', 'Locally grown organic red onions with sharp, pungent flavor. Ideal for Indian curries and salads.', 45, 60, 4.4, 8400, 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80', 'q-fruits', 'Local Harvest', 'quick', false, '10 Mins', '{"Weight":"1 kg","Type":"Organic, Unpolished"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

-- Dairy ('q-dairy')
INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('q201', 'Amul Butter (Pasteurised) - 500g', 'Utterly butterly delicious Amul Butter. A staple in every Indian household.', 255, 260, 4.9, 45000, 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80', 'q-dairy', 'Amul', 'quick', false, '10 Mins', '{"Weight":"500g","Type":"Salted Milk Butter"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('q202', 'Epigamia Greek Yogurt (Blueberry)', 'Thick and creamy Greek Yogurt loaded with real blueberries. High in protein, low in fat.', 75, 75, 4.7, 12000, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80', 'q-dairy', 'Epigamia', 'quick', false, '10 Mins', '{"Weight":"120g","Flavor":"Blueberry","Protein":"High"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

-- Snacks ('q-snacks')
INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('q301', 'Doritos Nacho Cheese Tortilla Chips (150g)', 'Tooth-rattling crunch and intense nacho cheese flavor that awakens your taste buds.', 85, 85, 4.6, 23000, 'https://images.unsplash.com/photo-1600952841320-1c62e568c98c?w=800&q=80', 'q-snacks', 'Doritos', 'quick', false, '10 Mins', '{"Weight":"150g","Flavor":"Nacho Cheese"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;


-- ==========================================
-- VERTICAL 3: HOME SERVICES (vertical: 'services')
-- ==========================================

-- Cleaning ('v-cleaning')
INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('v101', 'Intense Bathroom Deep Cleaning', 'Professional cleaning of floor, tiles, sink, toilet bowl, and exhaust fan to remove hard water stains and grime.', 499, 799, 4.7, 18500, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80', 'v-cleaning', 'UrbanCare', 'services', true, 'Slot: Today, 2 PM', '{"Duration":"1.5 Hours","Includes":"Hard stain removal, acid wash"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('v102', 'Sofa Deep Cleaning (3 Seater)', 'Dry vacuuming followed by wet shampooing and mechanized extraction to remove deep-seated dust and allergens.', 699, 999, 4.6, 9200, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', 'v-cleaning', 'UrbanCare', 'services', true, 'Slot: Tomorrow, 10 AM', '{"Duration":"2 Hours","Includes":"Shampooing, Vacuuming"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

-- Appliance Repair ('v-appliance')
INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('v201', 'Washing Machine Repair (Fully Automatic)', 'Diagnosis and repair for all fully automatic washing machines. Spare parts charged separately.', 299, 399, 4.5, 14200, 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80', 'v-appliance', 'ProFix', 'services', false, 'Slot: Within 90 Mins', '{"Base Fee":"₹299 (Inspection)","Warranty":"30 Day Service Guarantee"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;

-- Salon at Home ('v-salon')
INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES 
('v301', 'Women''s Advanced Facial & Pedicure', 'Relaxing salon experience at home. Includes O3+ Facial, Spa Pedicure, and Threading.', 1499, 2199, 4.9, 32000, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80', 'v-salon', 'Glow Beauty', 'services', true, 'Slot: Tomorrow, 1 PM', '{"Duration":"2.5 Hours","Products":"Genuine O3+ brand products"}') ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;
