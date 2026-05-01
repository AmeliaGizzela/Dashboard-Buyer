import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShoppingCart, Users, Package, TrendingUp, Eye,
  Clock, CheckCircle2, AlertCircle, Filter,
  BarChart2, MapPin, ArrowUpRight, RefreshCw
} from 'lucide-react'
import { StatusBadge, GradeBadge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { MOCK_RFQS, UMKM_LIST, METRICS, ORDER_STATUSES } from '../../data/mockData'
import { formatDate, formatWeight } from '../../lib/utils'

/* ─── StatCard ─────────────────────────────────────── */
function StatCard({ label, value, delta, icon: Icon, color = 'brand', trend = 'up' }) {
  const colors = {
    brand: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
    blue:  'bg-blue-500/10 text-blue-400 border-blue-500/20',
    gold:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
    red:   'bg-red-500/10 text-red-400 border-red-500/20',
  }
  return (
    <motion.div
      whileHover={{ y: -2 }} transition={{ duration: 0.2 }}
      className="bg-dark-900 border border-dark-800 rounded-xl p-5 hover:border-dark-700 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${colors[color]}`}>
          <Icon size={18} />
        </div>
        <span className={`text-xs font-medium flex items-center gap-1
          ${trend === 'up' ? 'text-brand-400' : 'text-red-400'}`}>
          <ArrowUpRight size={12} className={trend === 'down' ? 'rotate-90' : ''} />
          {delta}
        </span>
      </div>
      <p className="font-display text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-dark-500 font-medium">{label}</p>
    </motion.div>
  )
}

/* ─── Pipeline funnel ─────────────────────────────── */
function PipelineFunnel() {
  const stages = [
    { key: 'new',        label: 'New RFQ',    count: 1, color: 'bg-blue-500' },
    { key: 'negotiating',label: 'Negotiating',count: 1, color: 'bg-amber-500' },
    { key: 'loi',        label: 'LoI Signed', count: 1, color: 'bg-brand-500' },
    { key: 'shipped',    label: 'Shipped',    count: 0, color: 'bg-emerald-500' },
  ]
  const max = Math.max(...stages.map(s => s.count), 1)
  return (
    <div className="bg-dark-900 border border-dark-800 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
        <BarChart2 size={16} className="text-brand-400" /> Pipeline Funnel
      </h3>
      <div className="space-y-3">
        {stages.map((s) => (
          <div key={s.key} className="flex items-center gap-3">
            <span className="text-xs text-dark-500 w-24 flex-shrink-0">{s.label}</span>
            <div className="flex-1 bg-dark-800 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${s.color} transition-all duration-700`}
                style={{ width: `${(s.count / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-dark-400 w-4 text-right">{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Activity Feed ───────────────────────────────── */
function ActivityFeed() {
  const items = [
    { icon: CheckCircle2, color: 'text-brand-400', text: 'LoI signed — SG Organic Pte Ltd', time: '2h ago' },
    { icon: AlertCircle,  color: 'text-amber-400',  text: 'New RFQ from Dutch Plant Foods BV', time: '5h ago' },
    { icon: Users,        color: 'text-blue-400',   text: 'CV Tempe Nusantara onboarded',     time: '1d ago' },
    { icon: Package,      color: 'text-brand-400',  text: 'QC passed — batch #B-042 (800kg)', time: '1d ago' },
    { icon: TrendingUp,   color: 'text-emerald-400',text: 'Green Foods Japan reorder confirmed', time: '2d ago' },
  ]
  return (
    <div className="bg-dark-900 border border-dark-800 rounded-xl p-6">
      <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
        <Clock size={16} className="text-brand-400" /> Recent Activity
      </h3>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <item.icon size={15} className={`mt-0.5 flex-shrink-0 ${item.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-dark-300 leading-relaxed">{item.text}</p>
              <p className="text-xs text-dark-600 mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── UMKM Capacity Bar ───────────────────────────── */
function UMKMCapacity() {
  return (
    <div className="bg-dark-900 border border-dark-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <Users size={16} className="text-brand-400" /> UMKM Capacity
        </h3>
        <Link to="/admin/umkm" className="text-xs text-brand-400 hover:text-brand-300">
          View all →
        </Link>
      </div>
      <div className="space-y-3">
        {UMKM_LIST.slice(0, 4).map((u) => (
          <div key={u.id} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-dark-800 flex items-center justify-center flex-shrink-0">
              <MapPin size={11} className="text-brand-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-dark-300 font-medium truncate">{u.name}</p>
              <p className="text-xs text-dark-600">{u.location.split(',')[0]}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-semibold text-white">{u.capacity} kg</p>
              <span className={`badge text-[10px] ${u.status === 'active' ? 'badge-green' : 'badge-gold'}`}>
                {u.status === 'active' ? 'Active' : 'Onboarding'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Dashboard Page ──────────────────────────────── */
export function AdminDashboardPage() {
  const [refreshing, setRefreshing] = useState(false)
  const refresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 800)
  }
  const now = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-dark-500 text-sm">{now} · Live overview</p>
        </div>
        <button onClick={refresh}
          className={`flex items-center gap-2 text-sm text-dark-400 hover:text-white
                     transition-colors bg-dark-800 border border-dark-700 rounded-xl px-4 py-2
                     ${refreshing ? 'opacity-50' : ''}`}
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total RFQ Masuk"   value={MOCK_RFQS.length}            delta="+2 this week" icon={ShoppingCart} color="blue" />
        <StatCard label="UMKM Aktif"        value={METRICS.totalUMKM}           delta="38 partners"  icon={Users}        color="brand" />
        <StatCard label="Pipeline Value"    value="~$18K"                        delta="Est. month"   icon={TrendingUp}   color="gold" />
        <StatCard label="Aggregate Cap."    value={METRICS.aggregateCapacity}   delta="Per month"    icon={Package}      color="brand" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* RFQ Table — 2/3 */}
        <div className="xl:col-span-2 bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-dark-800 flex items-center justify-between">
            <h2 className="font-semibold text-white">Recent RFQs</h2>
            <Link to="/admin/orders">
              <Button variant="secondary" size="xs" className="text-xs border-dark-700 text-dark-400
                         hover:text-white hover:border-dark-600 bg-transparent">
                View all <ArrowUpRight size={12} />
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-800">
                  {['Ref ID','Buyer','Product','Qty','Status','Date'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-dark-500 font-medium text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-800">
                {MOCK_RFQS.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-dark-800/50 transition-colors group">
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs text-brand-400">{rfq.id}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-white text-sm font-medium">{rfq.company}</p>
                      <p className="text-dark-500 text-xs">{rfq.country}</p>
                    </td>
                    <td className="px-5 py-3.5 text-dark-400 text-xs">{rfq.product}</td>
                    <td className="px-5 py-3.5 text-dark-400 text-xs">{rfq.quantity.toLocaleString()} kg</td>
                    <td className="px-5 py-3.5"><StatusBadge status={rfq.status} /></td>
                    <td className="px-5 py-3.5 text-dark-500 text-xs">{formatDate(rfq.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <PipelineFunnel />
          <ActivityFeed />
        </div>
      </div>

      {/* Bottom row */}
      <UMKMCapacity />
    </div>
  )
}

/* ─── Orders Page ─────────────────────────────────── */
export function AdminOrdersPage() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all'
    ? MOCK_RFQS
    : MOCK_RFQS.filter(r => r.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Pipeline Pesanan</h1>
          <p className="text-dark-500 text-sm">Kelola RFQ dan status pesanan ekspor.</p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {[{ key:'all', label:'All' }, ...ORDER_STATUSES.slice(0,5)].map((s) => (
          <button key={s.key}
            onClick={() => setFilter(s.key)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors
              ${filter === s.key
                ? 'bg-brand-600 text-white'
                : 'bg-dark-800 text-dark-400 hover:text-white border border-dark-700'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-800 bg-dark-800/40">
                {['Ref ID','Buyer','Country','Product','Grade','Qty (kg)','Target Date','Status','Action'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-dark-500 font-medium text-xs whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {filtered.map((rfq) => (
                <tr key={rfq.id} className="hover:bg-dark-800/50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-brand-400 whitespace-nowrap">{rfq.id}</td>
                  <td className="px-5 py-4 text-white font-medium text-sm whitespace-nowrap">{rfq.company}</td>
                  <td className="px-5 py-4 text-dark-400 text-xs">{rfq.country}</td>
                  <td className="px-5 py-4 text-dark-400 text-xs whitespace-nowrap">{rfq.product}</td>
                  <td className="px-5 py-4"><GradeBadge grade={rfq.grade} /></td>
                  <td className="px-5 py-4 text-dark-300 text-xs">{rfq.quantity.toLocaleString()}</td>
                  <td className="px-5 py-4 text-dark-400 text-xs whitespace-nowrap">{formatDate(rfq.deliveryDate)}</td>
                  <td className="px-5 py-4"><StatusBadge status={rfq.status} /></td>
                  <td className="px-5 py-4">
                    <Link to={`/admin/orders/${rfq.id}`}
                      className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 text-xs font-medium">
                      <Eye size={13} /> Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-dark-500 text-sm">
              No orders match this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── UMKM Page ───────────────────────────────────── */
export function AdminUMKMPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-1">Database UMKM</h1>
        <p className="text-dark-500 text-sm">{UMKM_LIST.length} mitra terdaftar.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-dark-900 border border-dark-800 rounded-xl p-5">
          <p className="text-xs text-dark-500 mb-1">Total UMKM</p>
          <p className="font-display text-2xl font-bold text-white">{METRICS.totalUMKM}</p>
        </div>
        <div className="bg-dark-900 border border-dark-800 rounded-xl p-5">
          <p className="text-xs text-dark-500 mb-1">Active Partners</p>
          <p className="font-display text-2xl font-bold text-brand-400">
            {UMKM_LIST.filter(u => u.status === 'active').length}
          </p>
        </div>
        <div className="bg-dark-900 border border-dark-800 rounded-xl p-5">
          <p className="text-xs text-dark-500 mb-1">Aggregate Capacity</p>
          <p className="font-display text-2xl font-bold text-white">{METRICS.aggregateCapacity}</p>
        </div>
      </div>

      <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-800 bg-dark-800/40">
                {['#','Nama UMKM','Lokasi','Grade','Kapasitas/bln','Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-dark-500 font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {UMKM_LIST.map((u) => (
                <tr key={u.id} className="hover:bg-dark-800/50 transition-colors">
                  <td className="px-5 py-4 text-dark-600 text-xs">{u.id}</td>
                  <td className="px-5 py-4 text-white font-medium">{u.name}</td>
                  <td className="px-5 py-4 text-dark-400 text-xs">{u.location}</td>
                  <td className="px-5 py-4"><GradeBadge grade={u.grade} /></td>
                  <td className="px-5 py-4 text-dark-300 text-xs">{formatWeight(u.capacity)}</td>
                  <td className="px-5 py-4">
                    <span className={`badge ${u.status === 'active' ? 'badge-green' : 'badge-gold'}`}>
                      {u.status === 'active' ? 'Active' : 'Onboarding'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ─── Placeholder pages ─────────────────────────── */
export function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700
                          flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-display font-bold text-xl">X</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Command Center</h1>
          <p className="text-dark-400 text-sm">Xpora Admin — Restricted Access</p>
        </div>
        <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 space-y-4">
          <div>
            <label className="label text-dark-300">Email</label>
            <input type="email" className="input bg-dark-800 border-dark-700 text-white placeholder-dark-500"
              placeholder="admin@xpora.id" />
          </div>
          <div>
            <label className="label text-dark-300">Password</label>
            <input type="password" className="input bg-dark-800 border-dark-700 text-white placeholder-dark-500"
              placeholder="••••••••" />
          </div>
          <Link to="/admin/dashboard">
            <Button variant="primary" size="md" fullWidth>Sign In</Button>
          </Link>
        </div>
        <p className="text-center text-dark-600 text-xs mt-6">Xpora Konsorsium only</p>
      </div>
    </div>
  )
}

export function AdminOrderDetailPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Order Detail</h1>
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 text-dark-400 text-center py-20">
        Detail order dengan panel alokasi — Task 7.
      </div>
    </div>
  )
}

export function AdminAllocationPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Alokasi Kuota</h1>
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 text-dark-400 text-center py-20">
        Panel alokasi kuota ke UMKM — Task 7.
      </div>
    </div>
  )
}

export function AdminUMKMDetailPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Profil UMKM</h1>
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 text-dark-400 text-center py-20">
        Profil detail UMKM — Task 8.
      </div>
    </div>
  )
}

export function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Manajemen Produk</h1>
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 text-dark-400 text-center py-20">
        CRUD produk katalog — Task 8.
      </div>
    </div>
  )
}

export function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Pengaturan</h1>
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 text-dark-400 text-center py-20">
        Pengaturan platform — Task 9.
      </div>
    </div>
  )
}
