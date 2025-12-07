-- SALAMAN Seed Data
-- Run this AFTER the migration script

-- =====================
-- SEED SUPPLIER USER
-- =====================
-- Note: This creates a demo supplier. In production, users are created via Supabase Auth

INSERT INTO users (id, email, role, business_name, phone, address) VALUES
  ('00000000-0000-0000-0000-000000000001', 'supplier@demo.com', 'supplier', 'PT Sumber Pangan Nusantara', '081234567890', 'Jl. Pasar Induk No. 123, Jakarta Timur'),
  ('00000000-0000-0000-0000-000000000002', 'supplier2@demo.com', 'supplier', 'CV Berkah Sembako', '081234567891', 'Jl. Raya Bogor KM 25, Depok'),
  ('00000000-0000-0000-0000-000000000099', 'buyer@demo.com', 'buyer', 'Toko Demo Buyer', '081234567899', 'Jl. Demo No. 1, Jakarta')
ON CONFLICT (id) DO NOTHING;

-- =====================
-- SEED PRODUCTS
-- =====================
INSERT INTO products (id, supplier_id, name, description, category, price, unit, image_urls, is_active) VALUES
  -- Sembako
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 
   'Beras Premium 5kg', 'Beras putih premium kualitas terbaik dari Cianjur. Pulen dan wangi.', 
   'sembako', 75000, 'karung', 
   ARRAY['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'], true),
  
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 
   'Minyak Goreng 2L', 'Minyak goreng sawit murni, jernih dan sehat untuk masakan sehari-hari.', 
   'sembako', 32000, 'botol', 
   ARRAY['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'], true),
  
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 
   'Gula Pasir 1kg', 'Gula pasir putih kristal berkualitas tinggi.', 
   'sembako', 15000, 'kg', 
   ARRAY['https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400'], true),

  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 
   'Tepung Terigu 1kg', 'Tepung terigu protein sedang untuk berbagai masakan dan kue.', 
   'sembako', 12000, 'kg', 
   ARRAY['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'], true),

  -- Minuman
  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 
   'Teh Botol Sosro 450ml (1 Dus)', 'Teh manis dalam kemasan botol, isi 24 botol per dus.', 
   'minuman', 85000, 'dus', 
   ARRAY['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'], true),

  ('10000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000002', 
   'Aqua 600ml (1 Dus)', 'Air mineral dalam kemasan botol 600ml, isi 24 botol per dus.', 
   'minuman', 52000, 'dus', 
   ARRAY['https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400'], true),

  -- Snack
  ('10000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000002', 
   'Indomie Goreng (1 Dus)', 'Mie instan goreng favorit Indonesia, isi 40 bungkus per dus.', 
   'makanan', 115000, 'dus', 
   ARRAY['https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400'], true),

  ('10000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000001', 
   'Kopi Kapal Api Special Mix (Renceng)', 'Kopi instan 3in1, isi 10 sachet per renceng.', 
   'minuman', 18000, 'renceng', 
   ARRAY['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'], true),

  -- Bumbu
  ('10000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000001', 
   'Kecap Manis ABC 600ml', 'Kecap manis kualitas premium untuk masakan Indonesia.', 
   'bumbu', 25000, 'botol', 
   ARRAY['https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400'], true),

  ('10000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000002', 
   'Sambal ABC Extra Pedas 335ml', 'Sambal siap saji dengan tingkat kepedasan ekstra.', 
   'bumbu', 18000, 'botol', 
   ARRAY['https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400'], true),

  -- Produk Segar
  ('10000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', 
   'Telur Ayam 1 Tray (30 butir)', 'Telur ayam negeri segar, ukuran medium.', 
   'segar', 55000, 'tray', 
   ARRAY['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400'], true),

  ('10000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000002', 
   'Ayam Potong Segar 1kg', 'Ayam potong segar berkualitas, sudah dibersihkan.', 
   'segar', 38000, 'kg', 
   ARRAY['https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400'], true)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image_urls = EXCLUDED.image_urls;

-- =====================
-- VERIFY DATA
-- =====================
-- SELECT COUNT(*) as total_products FROM products;
-- SELECT * FROM products LIMIT 5;
