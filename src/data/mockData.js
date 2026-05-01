// =============================================
// XPORA — Mock Data (MVP Static Data Layer)
// Replace with Supabase calls in Phase 2
// =============================================

export const PRODUCTS = [
  {
    id: 1,
    slug: 'tempe-medium-grade',
    name: 'Tempe',
    grade: 'Medium',
    category: 'Fermented Soybean',
    origin: 'Central Java, Indonesia',
    moq: 500,          // kg
    capacity: 15000,   // kg/month aggregate
    priceRange: { min: 2.8, max: 3.5, currency: 'USD', unit: 'kg' },
    description:
      'Traditional Indonesian fermented soybean cake, produced by a consortium of 30+ UMKM partners in Central Java. Consistent quality guaranteed through our AI-assisted QC system.',
    longDescription:
      'Xpora Tempe Medium Grade is sourced from a vetted network of micro-producers in Banyumas and Purwokerto, Central Java — the heartland of Indonesian tempe craftsmanship. Each batch undergoes standardized production protocols and visual QC verification before consolidation at our warehouse. Ideal for bulk importers, food manufacturers, and ethnic grocery distributors.',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    ],
    certifications: ['Halal MUI', 'BPOM Registered', 'SNI Compliant'],
    shippingTime: '14-21 days',
    incoterms: ['FOB Tanjung Priok', 'CIF Singapore', 'EXW Warehouse'],
    compliance: {
      japan: 'No import restrictions. JAS standard recommended.',
      singapore: 'SFA approved. No additional permits required.',
      us: 'FDA compliant. Standard commercial invoice required.',
      eu: 'EU food safety directive compliant.',
    },
    available: true,
    featured: true,
    tags: ['tempe', 'fermented', 'soy', 'plant-based', 'organic-friendly'],
  },
  {
    id: 2,
    slug: 'tempe-premium-grade',
    name: 'Tempe',
    grade: 'Premium',
    category: 'Fermented Soybean',
    origin: 'Central Java, Indonesia',
    moq: 300,
    capacity: 8000,
    priceRange: { min: 4.0, max: 5.0, currency: 'USD', unit: 'kg' },
    description:
      'Premium-grade tempe crafted from selected non-GMO soybeans with superior mycelium density. Perfect for upscale retail and restaurant chains.',
    longDescription:
      'Premium Grade Tempe uses 100% non-GMO soybeans sourced from certified local farmers, with a 48-hour controlled fermentation process ensuring optimal protein density and flavor profile. Suitable for premium retail packaging, restaurant supply chains, and health food brands.',
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    ],
    certifications: ['Halal MUI', 'BPOM Registered', 'Organic Certified', 'ISO 22000'],
    shippingTime: '14-21 days',
    incoterms: ['FOB Tanjung Priok', 'CIF Singapore'],
    compliance: {
      japan: 'JAS Organic consideration applicable.',
      singapore: 'SFA approved.',
      us: 'FDA + USDA Organic mark eligible.',
      eu: 'EU Organic regulation compatible.',
    },
    available: true,
    featured: true,
    tags: ['tempe', 'premium', 'non-gmo', 'organic', 'plant-based'],
  },
  {
    id: 3,
    slug: 'tempe-super-premium',
    name: 'Tempe',
    grade: 'Super Premium',
    category: 'Fermented Soybean',
    origin: 'Banyumas, Central Java',
    moq: 100,
    capacity: 3000,
    priceRange: { min: 6.5, max: 8.0, currency: 'USD', unit: 'kg' },
    description:
      'The pinnacle of Indonesian tempe craft — single-origin, artisanal production with full traceability from farm to export container.',
    longDescription:
      'Super Premium Tempe is a curated, small-batch product from Xpora\'s top-tier UMKM partners who have completed our full SOP certification. Each batch features full traceability: soybean farm origin, fermentation timestamp, QC score, and packer ID. Ideal for specialty food importers, michelin-starred restaurant supply, and premium health brands.',
    images: [
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    ],
    certifications: ['Halal MUI', 'BPOM Registered', 'Organic Certified', 'ISO 22000', 'Full Traceability'],
    shippingTime: '14-28 days',
    incoterms: ['FOB Tanjung Priok'],
    compliance: {
      japan: 'Premium import pathway applicable.',
      singapore: 'SFA approved.',
      us: 'USDA Organic eligible.',
      eu: 'EU Organic + GI consideration.',
    },
    available: true,
    featured: false,
    tags: ['tempe', 'super-premium', 'artisanal', 'traceable', 'single-origin'],
  },
]

export const UMKM_LIST = [
  { id: 1, name: 'UMKM Sari Tempe Banyumas', location: 'Banyumas, Jawa Tengah', grade: 'Premium', capacity: 800, status: 'active' },
  { id: 2, name: 'Koperasi Tempe Maju Jaya',  location: 'Purwokerto, Jawa Tengah', grade: 'Medium', capacity: 1200, status: 'active' },
  { id: 3, name: 'UMKM Gemilang Pangan',       location: 'Cilacap, Jawa Tengah', grade: 'Medium', capacity: 600,  status: 'active' },
  { id: 4, name: 'Usaha Tempe Berkah',          location: 'Kebumen, Jawa Tengah', grade: 'Premium', capacity: 900, status: 'onboarding' },
  { id: 5, name: 'CV Tempe Nusantara',          location: 'Banjarnegara, Jawa Tengah', grade: 'Super Premium', capacity: 400, status: 'active' },
]

export const METRICS = {
  totalUMKM:         38,
  aggregateCapacity: '15 Ton/Month',
  buyerCountries:    12,
  rfqConverted:      85,    // percentage
  avgResponseTime:   '< 24 hours',
  yearEstablished:   2024,
}

export const ORDER_STATUSES = [
  { key: 'new',        label: 'New RFQ',       color: 'blue' },
  { key: 'reviewing',  label: 'Reviewing',     color: 'gold' },
  { key: 'negotiating',label: 'Negotiating',   color: 'gold' },
  { key: 'loi',        label: 'LoI Signed',    color: 'brand' },
  { key: 'dp_received',label: 'DP Received',   color: 'brand' },
  { key: 'executing',  label: 'Executing',     color: 'brand' },
  { key: 'shipped',    label: 'Shipped',       color: 'green' },
  { key: 'completed',  label: 'Completed',     color: 'green' },
]

export const MOCK_RFQS = [
  {
    id: 'XPR-260420-A1',
    company: 'Green Foods Japan Co.',
    country: 'Japan',
    email: 'procurement@greenfoodsjp.com',
    product: 'Tempe Premium Grade',
    quantity: 2000,
    grade: 'Premium',
    deliveryDate: '2026-07-01',
    status: 'negotiating',
    createdAt: '2026-04-20T08:00:00Z',
  },
  {
    id: 'XPR-260422-B3',
    company: 'SG Organic Pte Ltd',
    country: 'Singapore',
    email: 'ops@sgorganic.sg',
    product: 'Tempe Medium Grade',
    quantity: 1000,
    grade: 'Medium',
    deliveryDate: '2026-06-15',
    status: 'loi',
    createdAt: '2026-04-22T10:30:00Z',
  },
  {
    id: 'XPR-260423-C7',
    company: 'Dutch Plant Foods BV',
    country: 'Netherlands',
    email: 'info@dutchplantfoods.nl',
    product: 'Tempe Super Premium',
    quantity: 500,
    grade: 'Super Premium',
    deliveryDate: '2026-08-01',
    status: 'new',
    createdAt: '2026-04-23T14:00:00Z',
  },
]

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Hiroshi Tanaka',
    company: 'Green Foods Japan Co.',
    country: 'Japan',
    flag: '🇯🇵',
    quote:
      'Xpora solved our MOQ problem instantly. We needed 2 tons of consistent-quality tempe, and they delivered exactly that — on schedule and fully halal certified.',
    avatar: 'HT',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    company: 'SG Organic Pte Ltd',
    country: 'Singapore',
    flag: '🇸🇬',
    quote:
      'The quality consistency is what stands out. Every batch we receive from Xpora matches the specs we agreed on. No surprises, no disappointments.',
    avatar: 'SC',
  },
  {
    id: 3,
    name: 'Erik van Dijk',
    company: 'Dutch Plant Foods BV',
    country: 'Netherlands',
    flag: '🇳🇱',
    quote:
      'Finally, an Indonesian exporter that understands B2B requirements — proper documentation, traceability, and responsive communication. Game changer.',
    avatar: 'EV',
  },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Browse & Discover',
    description:
      'Explore our standardized product catalog. Each listing shows aggregate capacity, grade, certifications, and compliance info for your target market.',
    icon: 'Search',
  },
  {
    step: '02',
    title: 'Submit Your RFQ',
    description:
      'Tell us what you need: product, quantity, grade, and timeline. Our team responds within 24 hours with pricing and a formal quotation.',
    icon: 'FileText',
  },
  {
    step: '03',
    title: 'We Handle the Rest',
    description:
      'From UMKM aggregation and QC at our warehouse, to export documentation and logistics — Xpora is your single point of contact.',
    icon: 'Truck',
  },
]

export const COUNTRIES = [
  'Afghanistan', 'Australia', 'Bahrain', 'Bangladesh', 'Belgium', 'Brazil',
  'Canada', 'China', 'Denmark', 'Egypt', 'France', 'Germany', 'Hong Kong',
  'India', 'Indonesia', 'Italy', 'Japan', 'Jordan', 'Kuwait', 'Malaysia',
  'Netherlands', 'New Zealand', 'Norway', 'Oman', 'Pakistan', 'Philippines',
  'Qatar', 'Saudi Arabia', 'Singapore', 'South Korea', 'Spain', 'Sweden',
  'Taiwan', 'Thailand', 'UAE', 'United Kingdom', 'United States', 'Vietnam',
  'Other',
]
