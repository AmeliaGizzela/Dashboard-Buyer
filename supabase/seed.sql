-- Seed Data for Development
-- Hapus isi tabel sebelum insert (agar idempotent)
TRUNCATE TABLE public.allocations CASCADE;
TRUNCATE TABLE public.rfqs CASCADE;
TRUNCATE TABLE public.umkm CASCADE;
TRUNCATE TABLE public.products CASCADE;

-- Seed Products
INSERT INTO public.products (id, name, slug, category, description, grade, moq, capacity, price_min, price_max, featured, published, images)
VALUES
('d9b2d63d-a233-4123-8478-312152865910', 'Tempe Medium Grade', 'tempe-medium-grade', 'Soy Products', 'Standard grade tempe suitable for general food processing.', 'Grade C', 500, 15000, 1.2, 1.5, false, true, ARRAY['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80']),
('34d4db87-8438-4e89-a292-385d8363a033', 'Tempe Premium Grade', 'tempe-premium-grade', 'Soy Products', 'Premium export quality tempe, strictly organic soy.', 'Grade B', 1000, 8000, 1.8, 2.2, true, true, ARRAY['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80']),
('e43c5b9f-6893-4a15-9988-724e5233c7f1', 'Tempe Super Premium', 'tempe-super-premium', 'Soy Products', 'Highest grade tempe with artisan fermentation.', 'Grade A', 100, 2000, 3.5, 4.0, true, true, ARRAY['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80']),
('11111111-1111-1111-1111-111111111111', 'Gayo Arabica Green Beans', 'gayo-arabica', 'Coffee', 'Premium single-origin Arabica green coffee beans from the Gayo Highlands, Aceh.', 'Specialty', 1000, 20000, 6.5, 8.0, true, true, ARRAY['https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&q=80']),
('22222222-2222-2222-2222-222222222222', 'Sumatra Robusta Coffee', 'sumatra-robusta', 'Coffee', 'High caffeine Robusta beans grown in the volcanic soils of Sumatra, perfect for espresso blends.', 'Grade 1', 5000, 50000, 2.5, 3.5, false, true, ARRAY['https://images.unsplash.com/photo-1611162618479-ee3d24aaef8b?w=800&q=80']),
('33333333-3333-3333-3333-333333333333', 'Planifolia Vanilla Beans', 'planifolia-vanilla', 'Spices', 'Gourmet planifolia vanilla beans from Papua, rich in vanillin with a moisture content of 25-30%.', 'Gourmet', 10, 500, 120.0, 180.0, true, true, ARRAY['https://images.unsplash.com/photo-1608855238293-a8e53e1eb50e?w=800&q=80']),
('44444444-4444-4444-4444-444444444444', 'Cassava Flour (MOCAF)', 'mocaf-flour', 'Flour & Starch', 'Modified Cassava Flour, 100% gluten-free and versatile for baking and food manufacturing.', 'Premium', 1000, 30000, 0.8, 1.2, false, true, ARRAY['https://images.unsplash.com/photo-1627485937980-221c88ce04ea?w=800&q=80']),
('55555555-5555-5555-5555-555555555555', 'Coconut Briquette Charcoal', 'coconut-briquette', 'Charcoal', '100% natural coconut shell briquettes for shisha and BBQ. High heat, low ash, odorless.', 'Super Premium', 18000, 200000, 1.1, 1.4, true, true, ARRAY['https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80']),
('66666666-6666-6666-6666-666666666666', 'Raw Cocoa Beans', 'raw-cocoa-beans', 'Cocoa', 'Fermented and dried raw cocoa beans from Sulawesi, offering a robust flavor profile for chocolate makers.', 'Fermented', 5000, 40000, 3.0, 4.5, false, true, ARRAY['https://images.unsplash.com/photo-1604543519968-735905d8f683?w=800&q=80'])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  grade = EXCLUDED.grade,
  moq = EXCLUDED.moq,
  capacity = EXCLUDED.capacity,
  price_min = EXCLUDED.price_min,
  price_max = EXCLUDED.price_max,
  featured = EXCLUDED.featured,
  published = EXCLUDED.published,
  images = EXCLUDED.images;

-- Seed UMKM
INSERT INTO public.umkm (id, name, location, commodity, capacity, grade, status)
VALUES
('b9a2d63d-a233-4123-8478-312152865910', 'Sari Tempe Banyumas', 'Banyumas, Central Java', 'Tempe', 800, 'Grade A', 'active'),
('c4d4db87-8438-4e89-a292-385d8363a033', 'Koperasi Tempe Lestari', 'Malang, East Java', 'Tempe', 1500, 'Grade B', 'active'),
('f43c5b9f-6893-4a15-9988-724e5233c7f1', 'Tempe Makmur Jaya', 'Bandung, West Java', 'Tempe', 500, 'Grade C', 'onboarding');

-- Seed RFQs
INSERT INTO public.rfqs (id, ref_code, company, country, email, product_slug, quantity, grade, delivery_date, status)
VALUES
('a1b2d63d-a233-4123-8478-312152865910', 'RFQ-1029', 'Global Foods Inc', 'United States', 'procurement@globalfoods.com', 'tempe-premium-grade', 5000, 'Grade B', '2026-07-01', 'new'),
('a2d4db87-8438-4e89-a292-385d8363a033', 'RFQ-1030', 'EuroSoy BV', 'Netherlands', 'buyer@eurosoy.nl', 'tempe-super-premium', 1000, 'Grade A', '2026-06-15', 'loi');

-- Seed Allocations
INSERT INTO public.allocations (rfq_id, umkm_id, quantity)
VALUES
('a2d4db87-8438-4e89-a292-385d8363a033', 'b9a2d63d-a233-4123-8478-312152865910', 800);
