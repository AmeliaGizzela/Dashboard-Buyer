-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. PRODUCTS TABLE
-- ==========================================
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT,
    description TEXT,
    grade TEXT,
    moq INTEGER DEFAULT 0,
    capacity INTEGER DEFAULT 0,
    price_min NUMERIC,
    price_max NUMERIC,
    images TEXT[] DEFAULT '{}',
    certifications TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Public can read published products, Admin can do everything
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published products" ON public.products FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage products" ON public.products USING (auth.role() = 'authenticated');

-- ==========================================
-- 2. UMKM TABLE (Partners)
-- ==========================================
CREATE TABLE public.umkm (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    location TEXT,
    commodity TEXT,
    capacity INTEGER DEFAULT 0,
    grade TEXT,
    whatsapp TEXT,
    status TEXT DEFAULT 'onboarding', -- 'active' or 'onboarding'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Public can read active UMKM, Admin can manage
ALTER TABLE public.umkm ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active UMKM" ON public.umkm FOR SELECT USING (status = 'active');
CREATE POLICY "Admins can manage UMKM" ON public.umkm USING (auth.role() = 'authenticated');

-- ==========================================
-- 3. RFQ SUBMISSIONS (Orders Pipeline)
-- ==========================================
CREATE TABLE public.rfqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ref_code TEXT UNIQUE NOT NULL,
    company TEXT NOT NULL,
    country TEXT,
    email TEXT NOT NULL,
    product_slug TEXT,
    quantity INTEGER,
    grade TEXT,
    delivery_date DATE,
    incoterm TEXT DEFAULT 'FOB',
    notes TEXT,
    status TEXT DEFAULT 'new', -- new, negotiating, loi, shipped
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Public can insert, Admin can manage. 
-- For MVP, we don't let public read RFQs (they only see their success page, which can be passed via URL state).
ALTER TABLE public.rfqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert RFQs" ON public.rfqs FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage RFQs" ON public.rfqs USING (auth.role() = 'authenticated');

-- ==========================================
-- 4. UMKM APPLICATIONS (Join Form)
-- ==========================================
CREATE TABLE public.umkm_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    location TEXT,
    commodity TEXT,
    capacity INTEGER,
    whatsapp TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Public can insert, Admin can manage.
ALTER TABLE public.umkm_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert UMKM applications" ON public.umkm_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage UMKM applications" ON public.umkm_applications USING (auth.role() = 'authenticated');

-- ==========================================
-- 5. ALLOCATIONS (Mapping RFQ to UMKM)
-- ==========================================
CREATE TABLE public.allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rfq_id UUID REFERENCES public.rfqs(id) ON DELETE CASCADE,
    umkm_id UUID REFERENCES public.umkm(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Only admins can manage allocations
ALTER TABLE public.allocations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage allocations" ON public.allocations USING (auth.role() = 'authenticated');
