# Supabase Setup Instructions

## Step 1: Run Database Migration

1. Buka Supabase Dashboard → SQL Editor
2. Copy isi file `supabase/migrations/001_initial_schema.sql`
3. Paste dan klik **Run**
4. Pastikan tidak ada error

## Step 2: Run Seed Data

1. Di SQL Editor yang sama
2. Copy isi file `supabase/seed/002_seed_data.sql`
3. Paste dan klik **Run**
4. Verifikasi dengan query: `SELECT COUNT(*) FROM products;` (harus 12)

## Step 3: Setup Storage Buckets

1. Buka Supabase Dashboard → Storage
2. Klik **New bucket**
3. Buat bucket dengan nama: `products`
   - Public bucket: ✅ Yes
4. Buat bucket lagi dengan nama: `delivery-proofs`
   - Public bucket: ✅ Yes

### Storage Policies (untuk bucket `products`):

```sql
-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'products');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'products' 
    AND auth.role() = 'authenticated'
  );
```

### Storage Policies (untuk bucket `delivery-proofs`):

```sql
-- Allow authenticated read access
CREATE POLICY "Authenticated read access" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'delivery-proofs' 
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload proofs" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'delivery-proofs' 
    AND auth.role() = 'authenticated'
  );
```

## Step 4: Enable Auth Providers

1. Buka Supabase Dashboard → Authentication → Providers
2. Pastikan **Email** provider sudah enabled
3. Di Settings → Authentication:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/**`

## Step 5: Disable Email Confirmation (untuk development)

1. Buka Authentication → Settings
2. Di bagian "Email Auth":
   - **Enable email confirmations**: OFF (untuk development)
   - Atau biarkan ON dan cek email untuk konfirmasi

## Verification

Jalankan query ini untuk memastikan setup berhasil:

```sql
-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check products count
SELECT COUNT(*) as total_products FROM products;

-- Check sample products
SELECT name, category, price FROM products LIMIT 5;
```

## Troubleshooting

### Error: "permission denied for table users"
- Pastikan RLS policies sudah dibuat dengan benar
- Untuk testing, bisa disable RLS sementara:
  ```sql
  ALTER TABLE users DISABLE ROW LEVEL SECURITY;
  ```

### Error: "relation does not exist"
- Jalankan migration script terlebih dahulu
- Pastikan tidak ada error saat menjalankan script
