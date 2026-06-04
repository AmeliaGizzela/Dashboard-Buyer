import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search, X,
  ArrowRight, CheckCircle2, Star,
  ChevronDown, Package
} from 'lucide-react'
import { GradeBadge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { useProducts } from '../../lib/api'

const GRADES   = ['All Grades', 'Medium', 'Premium', 'Super Premium']
const SORT_OPT = [
  { value: 'featured', label: 'Featured First' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'moq_asc', label: 'MOQ: Low → High' },
]

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link to={`/public/products/${product.slug}`} id={`product-card-${product.slug}`}>
        <div className="card-hover overflow-hidden group h-full flex flex-col">
          {/* image */}
          <div className="relative h-52 overflow-hidden flex-shrink-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent" />
            <div className="absolute top-3 right-3">
              <GradeBadge grade={product.grade} />
            </div>
            {product.featured && (
              <div className="absolute top-3 left-3">
                <span className="badge badge-green text-xs">
                  <Star size={10} className="fill-brand-600" /> Featured
                </span>
              </div>
            )}
            {product.available && (
              <div className="absolute bottom-3 left-3">
                <span className="badge bg-dark-900/80 text-white text-xs backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 inline-block mr-1" />
                  Available Stock
                </span>
              </div>
            )}
          </div>

          {/* body */}
          <div className="card-body flex flex-col flex-1 gap-3">
            <div>
              <p className="text-xs text-dark-400 font-medium uppercase tracking-wide">{product.category}</p>
              <h3 className="font-display font-bold text-dark-900 text-xl leading-tight">{product.name}</h3>
              <p className="text-xs text-dark-500 mt-0.5">{product.origin}</p>
            </div>

            <p className="text-sm text-dark-500 leading-relaxed flex-1 line-clamp-2">
              {product.description}
            </p>

            {/* specs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-dark-50 rounded-lg p-2.5">
                <p className="text-dark-400">Min. Order</p>
                <p className="font-semibold text-dark-800">{product.moq} kg</p>
              </div>
              <div className="bg-dark-50 rounded-lg p-2.5">
                <p className="text-dark-400">Capacity</p>
                <p className="font-semibold text-dark-800">{(product.capacity / 1000).toFixed(1)} Ton/mo</p>
              </div>
            </div>

            {/* price + CTA */}
            <div className="flex items-center justify-between pt-1 border-t border-dark-100">
              <p className="text-brand-600 font-bold text-base">
                ${product.priceRange.min}–${product.priceRange.max}
                <span className="text-dark-400 font-normal text-xs">/kg</span>
              </p>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-600
                              group-hover:gap-2.5 transition-all duration-200">
                Request Quote <ArrowRight size={13} />
              </div>
            </div>

            {/* certs */}
            <div className="flex flex-wrap gap-1.5">
              {product.certifications.slice(0, 3).map((c) => (
                <span key={c} className="flex items-center gap-1 text-[10px] text-dark-500
                                         bg-dark-50 rounded-full px-2 py-0.5 border border-dark-100">
                  <CheckCircle2 size={9} className="text-brand-500" /> {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function ProductCatalogPage() {
  const { data: PRODUCTS = [], isLoading } = useProducts()
  
  const [query,     setQuery]     = useState('')
  const [grade,     setGrade]     = useState('All Grades')
  const [sort,      setSort]      = useState('featured')

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]

    // search
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.grade.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      )
    }

    // grade filter
    if (grade !== 'All Grades') {
      list = list.filter((p) => p.grade === grade)
    }

    // sort
    if (sort === 'price_asc')  list.sort((a, b) => a.priceRange.min - b.priceRange.min)
    if (sort === 'price_desc') list.sort((a, b) => b.priceRange.max - a.priceRange.max)
    if (sort === 'moq_asc')    list.sort((a, b) => a.moq - b.moq)
    if (sort === 'featured')   list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

    return list
  }, [query, grade, sort, PRODUCTS])

  const hasFilter = query || grade !== 'All Grades'

  const clearFilters = () => { setQuery(''); setGrade('All Grades') }

  return (
    <div className="pt-20 pb-20 min-h-screen bg-white">
      {/* ── Page Header ── */}
      <div className="bg-dark-50 border-b border-dark-100">
        <div className="container-xl py-12">
          <nav className="text-xs text-dark-400 mb-4 flex items-center gap-2">
            <Link to="/public" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronDown size={12} className="-rotate-90" />
            <span className="text-dark-700 font-medium">Products</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-dark-900 mb-3">
            Product Catalog
          </h1>
          <p className="text-dark-500 max-w-xl leading-relaxed">
            Quality-assured, export-ready products aggregated from our Indonesian UMKM consortium.
            Every product is grade-certified and compliance-checked for your target market.
          </p>
        </div>
      </div>

      <div className="container-xl mt-8">
        {/* ── Search + Filter Bar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product, grade, origin…"
              className="input pl-10 pr-4"
            />
          </div>

          {/* grade filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors border
                  ${grade === g
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-dark-600 border-dark-200 hover:border-brand-300 hover:text-brand-600'
                  }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input pr-8 cursor-pointer appearance-none min-w-[160px]"
              id="product-sort"
            >
              {SORT_OPT.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none" />
          </div>
        </div>

        {/* ── Active filters row ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-dark-500">
            Showing <strong className="text-dark-900">{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
            {grade !== 'All Grades' && <span className="ml-1 text-brand-600">· {grade}</span>}
            {query && <span className="ml-1 text-brand-600">· "{query}"</span>}
          </p>
          {hasFilter && (
            <button onClick={clearFilters}
              className="flex items-center gap-1.5 text-sm text-dark-400 hover:text-red-500 transition-colors">
              <X size={14} /> Clear filters
            </button>
          )}
        </div>

        {/* ── Grid ── */}
        {isLoading ? (
          <div className="text-center py-24 text-dark-400">Loading products from database...</div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <Package size={48} className="text-dark-300 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-dark-700 text-xl mb-2">No products found</h3>
            <p className="text-dark-400 text-sm mb-6">Try adjusting your search or filters.</p>
            <Button variant="secondary" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}

        {/* ── CTA Row ── */}
        <div className="mt-16 bg-brand-50 border border-brand-100 rounded-2xl p-8 text-center">
          <h3 className="font-display font-bold text-dark-900 text-2xl mb-2">
            Don't see what you need?
          </h3>
          <p className="text-dark-500 text-sm mb-6 max-w-md mx-auto">
            Our UMKM network covers hundreds of Indonesian commodities beyond the pilot catalog.
            Submit a custom RFQ and we'll source it for you.
          </p>
          <Link to="/public/rfq">
            <Button variant="primary" size="lg" id="catalog-custom-rfq">
              Submit Custom RFQ <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
