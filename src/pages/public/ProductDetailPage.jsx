import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, ChevronDown, CheckCircle2, MapPin,
  Shield, Clock, Package, ChevronLeft,
  Globe, FileText, Star, Truck
} from 'lucide-react'
import { GradeBadge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { PRODUCTS } from '../../data/mockData'

const COUNTRY_ICONS = { japan: '🇯🇵', singapore: '🇸🇬', us: '🇺🇸', eu: '🇪🇺' }

function ImageGallery({ images, name }) {
  const [active, setActive] = useState(0)
  return (
    <div className="space-y-3">
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-dark-100">
        <motion.img
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={images[active]}
          alt={`${name} - image ${active + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative rounded-xl overflow-hidden w-20 h-16 flex-shrink-0 border-2 transition-all
                ${active === i ? 'border-brand-500 shadow-brand' : 'border-dark-200 opacity-60 hover:opacity-100'}`}
            >
              <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function SpecRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-dark-100 last:border-0">
      <span className="text-sm text-dark-500 font-medium">{label}</span>
      <span className="text-sm text-dark-900 font-semibold text-right max-w-[55%]">{value}</span>
    </div>
  )
}

function ComplianceTable({ compliance }) {
  return (
    <div className="space-y-2">
      {Object.entries(compliance).map(([country, text]) => (
        <div key={country} className="flex items-start gap-3 bg-dark-50 rounded-xl p-3.5">
          <span className="text-lg flex-shrink-0">{COUNTRY_ICONS[country] ?? '🌍'}</span>
          <div>
            <p className="text-xs font-bold text-dark-700 uppercase tracking-wide mb-0.5">{country}</p>
            <p className="text-xs text-dark-500 leading-relaxed">{text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function RelatedProducts({ current }) {
  const related = PRODUCTS.filter((p) => p.id !== current.id && p.category === current.category)
  if (!related.length) return null
  return (
    <div className="mt-20">
      <h2 className="font-display text-2xl font-bold text-dark-900 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((p) => (
          <Link key={p.id} to={`/public/products/${p.slug}`}>
            <div className="card-hover overflow-hidden group">
              <div className="h-40 overflow-hidden">
                <img src={p.images[0]} alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="card-body">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-bold text-dark-900">{p.name}</h3>
                  <GradeBadge grade={p.grade} />
                </div>
                <p className="text-brand-600 font-semibold text-sm">
                  ${p.priceRange.min}–${p.priceRange.max}/kg
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function ProductDetailPage() {
  const { slug } = useParams()
  const product   = PRODUCTS.find((p) => p.slug === slug)

  if (!product) return <Navigate to="/public/products" replace />

  const [openAccordion, setOpenAccordion] = useState('specs')

  const toggleAccordion = (key) =>
    setOpenAccordion((prev) => (prev === key ? null : key))

  const ACCORDIONS = [
    { key: 'specs',      label: 'Product Specifications', icon: Package },
    { key: 'compliance', label: 'Market Compliance',      icon: Globe },
    { key: 'shipping',   label: 'Shipping & Incoterms',   icon: Truck },
    { key: 'docs',       label: 'Documentation',          icon: FileText },
  ]

  return (
    <div className="pt-20 pb-20 min-h-screen bg-white">
      {/* ── Breadcrumb ── */}
      <div className="bg-dark-50 border-b border-dark-100">
        <div className="container-xl py-4">
          <nav className="text-xs text-dark-400 flex items-center gap-2">
            <Link to="/public" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronDown size={12} className="-rotate-90" />
            <Link to="/public/products" className="hover:text-brand-600 transition-colors">Products</Link>
            <ChevronDown size={12} className="-rotate-90" />
            <span className="text-dark-700 font-medium">{product.name} {product.grade}</span>
          </nav>
        </div>
      </div>

      <div className="container-xl mt-10">
        {/* ── Back button ── */}
        <Link to="/public/products"
          className="inline-flex items-center gap-2 text-sm text-dark-500 hover:text-dark-900
                     transition-colors mb-8 group"
          id="back-to-catalog"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to catalog
        </Link>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          {/* LEFT: Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <ImageGallery images={product.images} name={product.name} />
          </motion.div>

          {/* RIGHT: Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} className="space-y-6">

            {/* header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs text-dark-400 font-medium uppercase tracking-wide">{product.category}</p>
                <GradeBadge grade={product.grade} />
                {product.available && (
                  <span className="badge badge-green text-xs">In Stock</span>
                )}
              </div>
              <h1 className="font-display text-4xl font-bold text-dark-900 leading-tight mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-1.5 text-sm text-dark-500">
                <MapPin size={14} className="text-brand-500" />
                {product.origin}
              </div>
            </div>

            {/* description */}
            <p className="text-dark-600 leading-relaxed">{product.longDescription}</p>

            {/* price + MOQ */}
            <div className="bg-dark-50 rounded-2xl p-5 border border-dark-100">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xs text-dark-400 mb-1">Price Range</p>
                  <p className="font-display font-bold text-brand-600 text-lg">
                    ${product.priceRange.min}–${product.priceRange.max}
                  </p>
                  <p className="text-xs text-dark-400">per kg</p>
                </div>
                <div className="text-center border-x border-dark-200">
                  <p className="text-xs text-dark-400 mb-1">Min. Order</p>
                  <p className="font-display font-bold text-dark-900 text-lg">{product.moq} kg</p>
                  <p className="text-xs text-dark-400">minimum</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-dark-400 mb-1">Capacity</p>
                  <p className="font-display font-bold text-dark-900 text-lg">
                    {(product.capacity / 1000).toFixed(1)}T
                  </p>
                  <p className="text-xs text-dark-400">per month</p>
                </div>
              </div>
            </div>

            {/* certifications */}
            <div>
              <p className="text-sm font-semibold text-dark-700 mb-3">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((c) => (
                  <div key={c} className="flex items-center gap-1.5 bg-brand-50 border border-brand-100
                                          text-brand-700 rounded-full px-3 py-1 text-xs font-medium">
                    <CheckCircle2 size={11} className="text-brand-500" /> {c}
                  </div>
                ))}
              </div>
            </div>

            {/* delivery */}
            <div className="flex items-center gap-3 text-sm text-dark-600">
              <Clock size={16} className="text-brand-500 flex-shrink-0" />
              Estimated shipping: <strong className="text-dark-900">{product.shippingTime}</strong>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to={`/public/rfq?product=${product.slug}&grade=${product.grade}`}
                className="flex-1" id="product-detail-rfq-btn">
                <Button variant="primary" size="lg" fullWidth>
                  Request Quotation <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/public/products">
                <Button variant="secondary" size="lg">Browse More</Button>
              </Link>
            </div>

            {/* trust strip */}
            <div className="flex items-center gap-4 pt-2 text-xs text-dark-500">
              {[
                { icon: Shield,  label: 'QC Verified' },
                { icon: Clock,   label: '< 24h Response' },
                { icon: Star,    label: 'Rated by Buyers' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon size={13} className="text-brand-500" /> {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Accordion Sections ── */}
        <div className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-dark-900 mb-6">Product Details</h2>
          <div className="space-y-3">
            {ACCORDIONS.map(({ key, label, icon: Icon }) => (
              <div key={key} className="border border-dark-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleAccordion(key)}
                  className="w-full flex items-center justify-between px-5 py-4
                             hover:bg-dark-50 transition-colors text-left"
                  id={`accordion-${key}`}
                >
                  <div className="flex items-center gap-2.5 font-semibold text-dark-900">
                    <Icon size={16} className="text-brand-500" />
                    {label}
                  </div>
                  <ChevronDown size={16}
                    className={`text-dark-400 transition-transform duration-200
                                ${openAccordion === key ? 'rotate-180' : ''}`} />
                </button>

                {openAccordion === key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5 border-t border-dark-100"
                  >
                    {key === 'specs' && (
                      <div className="pt-3">
                        <SpecRow label="Grade"        value={product.grade} />
                        <SpecRow label="Category"     value={product.category} />
                        <SpecRow label="Origin"       value={product.origin} />
                        <SpecRow label="Min. Order"   value={`${product.moq} kg`} />
                        <SpecRow label="Capacity"     value={`${(product.capacity/1000).toFixed(1)} Ton/month (aggregate)`} />
                        <SpecRow label="Price Range"  value={`$${product.priceRange.min}–$${product.priceRange.max} / kg`} />
                        <SpecRow label="Certifications" value={product.certifications.join(', ')} />
                        <SpecRow label="Tags"         value={product.tags.join(', ')} />
                      </div>
                    )}

                    {key === 'compliance' && (
                      <div className="pt-3">
                        <p className="text-sm text-dark-500 mb-4 leading-relaxed">
                          Import compliance overview for key target markets.
                          Our export team prepares all required documentation for each market.
                        </p>
                        <ComplianceTable compliance={product.compliance} />
                      </div>
                    )}

                    {key === 'shipping' && (
                      <div className="pt-3 space-y-4">
                        <SpecRow label="Est. Shipping Time" value={product.shippingTime} />
                        <div>
                          <p className="text-sm font-semibold text-dark-700 mb-3">Available Incoterms</p>
                          <div className="flex flex-wrap gap-2">
                            {product.incoterms.map((t) => (
                              <span key={t} className="bg-dark-50 border border-dark-200 text-dark-700
                                                        rounded-lg px-3 py-1.5 text-xs font-medium">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-dark-400 leading-relaxed">
                          Logistics coordinated through our partner freight forwarders.
                          We manage all phytosanitary, certificate of origin, and customs documentation.
                        </p>
                      </div>
                    )}

                    {key === 'docs' && (
                      <div className="pt-3 space-y-2">
                        {[
                          'Commercial Invoice',
                          'Certificate of Origin (COO)',
                          'Phytosanitary Certificate',
                          'Certificate of Analysis (COA)',
                          'Halal Certificate (MUI)',
                          'Bill of Lading / Airway Bill',
                          'Letter of Intent (LoI)',
                        ].map((doc) => (
                          <div key={doc} className="flex items-center gap-2.5 text-sm text-dark-600">
                            <CheckCircle2 size={14} className="text-brand-500 flex-shrink-0" />
                            {doc}
                          </div>
                        ))}
                        <p className="text-xs text-dark-400 mt-3 leading-relaxed">
                          All documents prepared and verified by Xpora's export compliance team.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Related ── */}
        <RelatedProducts current={product} />
      </div>
    </div>
  )
}


