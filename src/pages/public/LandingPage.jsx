import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight, Search, FileText, Truck,
  ShieldCheck, Zap, Globe, Star, CheckCircle2,
  ChevronRight, Package
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { GradeBadge } from '../../components/ui/Badge'
import { METRICS, TESTIMONIALS, HOW_IT_WORKS } from '../../data/mockData'
import { useProducts } from '../../lib/api'

/* ── animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}
const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: 'easeOut' } },
})

function Section({ id, children, className = '' }) {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id={id} ref={ref}
      className={`section ${className}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <motion.div
        initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp}
        className="container-xl"
      >
        {children}
      </motion.div>
    </section>
  )
}

/* ════════════════════════════
   HERO
════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero bg-hero-pattern pt-16">
      {/* decorative blobs */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-brand-200 opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-brand-300 opacity-20 blur-3xl pointer-events-none" />

      <div className="container-xl relative z-10 py-20 text-center">
        {/* pill badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-white border border-brand-200 shadow-sm
                     text-brand-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-8"
        >
          <span className="status-active animate-pulse-slow" />
          Pilot Running · Tempe Export · Central Java 🇮🇩
        </motion.div>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-display font-bold text-dark-950 leading-[1.08]
                     text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6"
        >
          Indonesia's&nbsp;Smartest
          <br />
          <span className="text-gradient">B2B&nbsp;Export</span> Platform
        </motion.h1>

        {/* sub */}
        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-lg md:text-xl text-dark-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We aggregate micro-producers into export-ready supply chains.
          Global buyers get consistent quality. UMKM get global reach.{' '}
          <strong className="text-dark-800">Done-for-you.</strong>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link to="/public/products">
            <Button variant="primary" size="xl" id="hero-browse-products">
              Browse Products <ArrowRight size={20} />
            </Button>
          </Link>
          <Link to="/public/rfq">
            <Button variant="secondary" size="xl" id="hero-submit-rfq">
              Submit RFQ
            </Button>
          </Link>
        </motion.div>

        {/* metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: METRICS.totalUMKM + '+',        label: 'UMKM Partners' },
            { value: METRICS.buyerCountries + '+',   label: 'Buyer Countries' },
            { value: METRICS.aggregateCapacity,      label: 'Aggregate Capacity' },
            { value: METRICS.rfqConverted + '%',     label: 'RFQ Conversion Rate' },
          ].map((m) => (
            <div key={m.label} className="bg-white/70 backdrop-blur-sm border border-brand-100
                                           rounded-2xl p-5 text-center shadow-sm">
              <p className="font-display text-3xl font-extrabold text-brand-600">{m.value}</p>
              <p className="text-xs text-dark-500 mt-1 font-medium">{m.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 40C1200 0 960 60 720 40C480 20 240 60 0 40L0 80Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

/* ════════════════════════════
   FEATURES / VALUE PROPS
════════════════════════════ */
const FEATURES = [
  { icon: Zap,         title: 'AI-Powered Allocation',   desc: 'Smart MOQ splitting distributes large orders across dozens of UMKM automatically.' },
  { icon: ShieldCheck, title: 'Quality Assurance',        desc: 'Computer Vision QC at our consolidation warehouse ensures every batch is grade-certified.' },
  { icon: Globe,       title: 'Global Compliance',        desc: 'We prepare all export docs — LoI, COA, phytosanitary, and customs paperwork for your market.' },
  { icon: Package,     title: 'Done-For-You Logistics',   desc: 'From farm gate to your port of destination — one partner, zero complexity.' },
]

function Features() {
  return (
    <Section id="features" className="bg-white">
      <div className="text-center mb-14">
        <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Why Xpora</p>
        <h2 id="features-heading" className="font-display text-4xl md:text-5xl font-bold text-dark-900 mb-4">
          Built for Serious B2B Buyers
        </h2>
        <p className="text-dark-500 max-w-xl mx-auto leading-relaxed">
          Not a marketplace. Not a directory. Xpora is a full-stack export operator for Indonesian commodities.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((f, i) => (
          <motion.div key={f.title} variants={stagger(i * 0.08)}
            className="group p-6 rounded-2xl border border-dark-100 bg-white
                       hover:border-brand-200 hover:shadow-brand transition-all duration-300 cursor-default"
          >
            <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center
                            mb-4 group-hover:bg-brand-100 transition-colors">
              <f.icon size={22} />
            </div>
            <h3 className="font-display font-semibold text-dark-900 mb-2">{f.title}</h3>
            <p className="text-sm text-dark-500 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ════════════════════════════
   HOW IT WORKS
════════════════════════════ */
const HOW_ICONS = { Search, FileText, Truck }

function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-dark-50">
      <div className="text-center mb-14">
        <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Process</p>
        <h2 id="how-it-works-heading" className="font-display text-4xl md:text-5xl font-bold text-dark-900 mb-4">
          How It Works
        </h2>
        <p className="text-dark-500 max-w-xl mx-auto">
          From browsing to delivery — Xpora handles every step of your international purchase.
        </p>
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* connector line (desktop) */}
        <div className="hidden md:block absolute top-12 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)]
                        h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />

        {HOW_IT_WORKS.map((step, i) => {
          const Icon = HOW_ICONS[step.icon] || Package
          return (
            <motion.div key={step.step} variants={stagger(i * 0.12)}
              className="relative bg-white rounded-2xl p-8 text-center shadow-card border border-dark-100
                         hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              {/* step number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2
                              w-8 h-8 rounded-full bg-brand-600 text-white
                              flex items-center justify-center text-xs font-bold shadow-brand">
                {step.step}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600
                              flex items-center justify-center mx-auto mb-5 mt-2">
                <Icon size={26} />
              </div>
              <h3 className="font-display font-bold text-dark-900 text-lg mb-3">{step.title}</h3>
              <p className="text-dark-500 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

/* ════════════════════════════
   PRODUCT HIGHLIGHTS
════════════════════════════ */
function ProductHighlights() {
  const { data: PRODUCTS = [], isLoading } = useProducts()
  
  return (
    <Section id="products-preview" className="bg-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Catalog</p>
          <h2 id="products-preview-heading" className="font-display text-4xl md:text-5xl font-bold text-dark-900">
            Featured Products
          </h2>
        </div>
        <Link to="/public/products"
          className="flex items-center gap-1.5 text-brand-600 font-semibold hover:text-brand-700
                     transition-colors whitespace-nowrap group"
          id="view-all-products"
        >
          View all products
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {isLoading ? (
          <div className="col-span-3 text-center py-10 text-dark-400">Loading products...</div>
        ) : PRODUCTS.slice(0, 3).map((p, i) => (
          <motion.div key={p.id} variants={stagger(i * 0.1)}>
            <Link to={`/public/products/${p.slug}`} id={`product-card-${p.slug}`}>
              <div className="card-hover overflow-hidden group h-full">
                {/* image */}
                <div className="relative h-52 overflow-hidden">
                  <img src={p.images[0]} alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <GradeBadge grade={p.grade} />
                  </div>
                  {p.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="badge badge-green text-xs">
                        <Star size={10} /> Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* body */}
                <div className="card-body flex flex-col gap-3">
                  <div>
                    <p className="text-xs text-dark-400 font-medium uppercase tracking-wide">{p.category}</p>
                    <h3 className="font-display font-bold text-dark-900 text-xl">{p.name}</h3>
                  </div>
                  <p className="text-sm text-dark-500 leading-relaxed flex-1 line-clamp-2">{p.description}</p>

                  {/* specs row */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-dark-50 rounded-lg p-2.5">
                      <p className="text-dark-400">Min. Order</p>
                      <p className="font-semibold text-dark-800">{p.moq} kg</p>
                    </div>
                    <div className="bg-dark-50 rounded-lg p-2.5">
                      <p className="text-dark-400">Capacity</p>
                      <p className="font-semibold text-dark-800">{(p.capacity/1000).toFixed(1)} Ton/mo</p>
                    </div>
                  </div>

                  {/* price + cta */}
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-brand-600 font-bold text-base">
                      ${p.priceRange.min}–${p.priceRange.max}
                      <span className="text-dark-400 font-normal text-xs">/kg</span>
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-600
                                    group-hover:gap-2.5 transition-all">
                      Request Quote <ArrowRight size={13} />
                    </div>
                  </div>

                  {/* certs */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.certifications.slice(0, 2).map((c) => (
                      <span key={c} className="flex items-center gap-1 text-[10px] text-dark-500
                                               bg-dark-50 rounded-full px-2 py-0.5">
                        <CheckCircle2 size={9} className="text-brand-500" /> {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ════════════════════════════
   ABOUT / STORY
════════════════════════════ */
function About() {
  return (
    <Section id="about" className="bg-dark-950">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* text */}
        <div>
          <p className="text-brand-500 font-semibold text-sm uppercase tracking-widest mb-4">Our Story</p>
          <h2 id="about-heading" className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            From Local Villages<br />to Global Markets
          </h2>
          <p className="text-dark-400 leading-relaxed mb-6">
            Indonesia has 64 million micro-enterprises producing world-class goods — from artisanal tempe
            to premium coffee. But when a global buyer asks for 1 ton of consistent-quality product,
            these producers fail individually.
          </p>
          <p className="text-dark-400 leading-relaxed mb-8">
            <span className="text-white font-semibold">Xpora</span> solves this by aggregating dozens
            of UMKM into a single, AI-orchestrated supply chain. We handle quality control, export
            documentation, and logistics — so buyers get enterprise-grade reliability from micro-producers.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Founded', value: '2024' },
              { label: 'Pilot Product', value: 'Tempe' },
              { label: 'Headquarters', value: 'Jawa Tengah' },
              { label: 'Export Markets', value: '12 Countries' },
            ].map((i) => (
              <div key={i.label} className="bg-dark-800 rounded-xl p-4 border border-dark-700">
                <p className="text-dark-500 text-xs font-medium mb-1">{i.label}</p>
                <p className="text-white font-semibold">{i.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* visual card */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-dark border border-dark-800">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
              alt="Indonesian UMKM producer"
              className="w-full h-80 object-cover"
            />
            <div className="bg-dark-900 p-6 border-t border-dark-800">
              <p className="text-white font-semibold mb-1">Sari Tempe Banyumas</p>
              <p className="text-dark-400 text-sm">800 kg/month · Premium Grade · Central Java</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="badge badge-green text-xs">Active Partner</span>
                <span className="badge badge-gold text-xs">ISO 22000</span>
              </div>
            </div>
          </div>
          {/* floating stat */}
          <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-card-hover p-4 border border-dark-100">
            <p className="text-2xl font-display font-bold text-dark-900">38+</p>
            <p className="text-xs text-dark-500">UMKM Partners Onboarded</p>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ════════════════════════════
   TESTIMONIALS
════════════════════════════ */
function Testimonials() {
  return (
    <Section id="testimonials" className="bg-dark-50">
      <div className="text-center mb-14">
        <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Social Proof</p>
        <h2 id="testimonials-heading" className="font-display text-4xl md:text-5xl font-bold text-dark-900 mb-4">
          Trusted by Global Buyers
        </h2>
        <p className="text-dark-500 max-w-lg mx-auto">
          From Japan to the Netherlands — buyers across 12 countries rely on Xpora for consistent Indonesian exports.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.div key={t.id} variants={stagger(i * 0.1)}
            className="bg-white rounded-2xl p-7 shadow-card border border-dark-100
                       hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
          >
            {/* stars */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={14} className="text-gold-400 fill-gold-400" />
              ))}
            </div>
            <blockquote className="text-dark-700 text-sm leading-relaxed mb-6 italic">
              "{t.quote}"
            </blockquote>
            <div className="flex items-center gap-3 pt-4 border-t border-dark-100">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white
                              flex items-center justify-center font-bold text-sm flex-shrink-0">
                {t.avatar}
              </div>
              <div>
                <p className="font-semibold text-dark-900 text-sm">{t.name}</p>
                <p className="text-dark-400 text-xs">{t.company} {t.flag}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ════════════════════════════
   CTA BANNER
════════════════════════════ */
function CTABanner() {
  return (
    <section className="section bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 relative overflow-hidden">
      {/* bg decoration */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white opacity-5 -translate-y-1/2 translate-x-1/2" />

      <div className="container-xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p className="text-brand-200 font-semibold text-sm uppercase tracking-widest mb-4">Get Started</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Source from Indonesia?
          </h2>
          <p className="text-brand-100 text-lg mb-10 max-w-xl mx-auto">
            Submit your RFQ today. Our team responds within 24 hours with a competitive quote and timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/public/rfq" id="cta-submit-rfq">
              <Button variant="secondary" size="xl">
                Submit RFQ Now <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/join" id="cta-join-umkm">
              <Button size="xl"
                className="bg-white/10 border-2 border-white/30 text-white
                           hover:bg-white/20 hover:border-white/50">
                Join as UMKM Partner
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════
   MAIN EXPORT
════════════════════════════ */
export function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <ProductHighlights />
      <About />
      <Testimonials />
      <CTABanner />
    </div>
  )
}
