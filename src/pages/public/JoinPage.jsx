import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, ChevronDown, ChevronRight,
  Star, Users, TrendingUp, ShieldCheck,
  Package, FileText, Banknote, Globe,
  ArrowRight, MapPin, Phone, Building2
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input, Select, Textarea } from '../../components/ui/Input'

/* ── schema ── */
const joinSchema = z.object({
  ownerName:   z.string().min(2, 'Nama lengkap wajib diisi'),
  umkmName:    z.string().min(2, 'Nama UMKM wajib diisi'),
  phone:       z.string().min(8, 'Nomor HP/WA wajib diisi'),
  email:       z.string().email('Email tidak valid'),
  city:        z.string().min(2, 'Kota/kabupaten wajib diisi'),
  province:    z.string().min(1, 'Pilih provinsi'),
  product:     z.string().min(2, 'Produk utama wajib diisi'),
  capacity:    z.string().min(1, 'Estimasi kapasitas wajib diisi'),
  hasHalal:    z.string().min(1, 'Pilih salah satu'),
  description: z.string().optional(),
})

const PROVINCES = [
  'Jawa Tengah','Jawa Timur','Jawa Barat','DI Yogyakarta',
  'DKI Jakarta','Banten','Sumatera Utara','Sumatera Barat',
  'Sulawesi Selatan','Bali','Nusa Tenggara Barat','Lainnya',
]
const CAPACITIES = [
  '< 100 kg/bulan','100–500 kg/bulan','500 kg–1 Ton/bulan',
  '1–5 Ton/bulan','> 5 Ton/bulan',
]

/* ── Benefits data ── */
const BENEFITS = [
  { icon: Globe,      title: 'Akses Pasar Global',  desc: 'Produkmu dijual ke 12+ negara — Jepang, Singapura, Belanda, dan terus bertambah.' },
  { icon: Banknote,   title: 'Harga Premium',        desc: 'Ekspor lansung berarti harga lebih tinggi dibanding jual ke pengepul lokal.' },
  { icon: ShieldCheck,title: 'Pendampingan Sertifikasi', desc: 'Kami bantu proses Halal MUI, BPOM, dan sertifikasi lain yang diperlukan.' },
  { icon: TrendingUp, title: 'Pertumbuhan Terstruktur', desc: 'Program pelatihan, standarisasi produksi, dan akses ke jaringan UMKM lain.' },
  { icon: Package,    title: 'Logistik Beres',       desc: 'Dari gudang konsolidasi ke pelabuhan — semua kami yang urus.' },
  { icon: Users,      title: 'Komunitas UMKM',       desc: 'Gabung dengan 38+ UMKM partner yang sudah membuktikan manfaat Xpora.' },
]

/* ── Eligibility ── */
const ELIGIBLE = [
  'Produsen makanan/pertanian di Indonesia (prioritas Jawa Tengah)',
  'Kapasitas produksi minimal 100 kg/bulan',
  'Bersedia mengikuti proses standarisasi Xpora',
  'Memiliki legalitas usaha (NIB, SIUP, atau minimal KTP usaha)',
  'Produk berpotensi ekspor (fermentasi, rempah, olahan pertanian, dll)',
]

/* ── Steps ── */
const ONBOARDING_STEPS = [
  { n: '01', title: 'Daftar Online',   desc: 'Isi formulir di bawah — proses kurang dari 5 menit.' },
  { n: '02', title: 'Verifikasi Tim',  desc: 'Tim kami akan menghubungi dalam 2 hari kerja.' },
  { n: '03', title: 'Kunjungan Lokasi',desc: 'Survey produksi dan standarisasi awal bersama tim QC.' },
  { n: '04', title: 'Onboarding',      desc: 'Tanda tangan PKS dan mulai produksi untuk pesanan ekspor.' },
]

/* ── FAQ ── */
const FAQ = [
  {
    q: 'Apakah ada biaya untuk bergabung?',
    a: 'Tidak ada biaya pendaftaran. Xpora mengambil margin dari harga jual ekspor, sehingga kamu hanya perlu fokus pada produksi.',
  },
  {
    q: 'Produk apa saja yang bisa diekspor?',
    a: 'Saat ini fokus kami adalah tempe dan produk fermentasi kedelai dari Jawa Tengah. Namun kami terbuka untuk produk olahan pertanian lain seperti kopi, rempah, dan pangan lokal.',
  },
  {
    q: 'Berapa minimum kapasitas produksi yang diperlukan?',
    a: 'Minimal 100 kg/bulan. Namun kami mendorong UMKM dengan kapasitas lebih besar karena memudahkan pemenuhan pesanan ekspor yang umumnya 300–2000 kg per order.',
  },
  {
    q: 'Bagaimana sistem pembayaran ke UMKM?',
    a: 'Pembayaran dilakukan setelah barang diterima di gudang konsolidasi Xpora dan lolos QC. Transfer ke rekening UMKM dalam 3–5 hari kerja.',
  },
  {
    q: 'Apakah UMKM harus memiliki sertifikat Halal?',
    a: 'Belum wajib saat mendaftar, namun menjadi syarat untuk onboarding penuh. Kami membantu proses pengajuan Halal MUI secara kolektif dengan biaya lebih terjangkau.',
  },
]

/* ── Components ── */
function BenefitCard({ icon: Icon, title, desc, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
      className="bg-white rounded-2xl p-6 border border-dark-100
                 hover:border-brand-200 hover:shadow-brand transition-all duration-300 group"
    >
      <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center
                      text-brand-600 mb-4 group-hover:bg-brand-100 transition-colors">
        <Icon size={22} />
      </div>
      <h3 className="font-display font-semibold text-dark-900 mb-2">{title}</h3>
      <p className="text-sm text-dark-500 leading-relaxed">{desc}</p>
    </motion.div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-dark-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4
                   hover:bg-dark-50 transition-colors text-left"
      >
        <span className="font-semibold text-dark-900 text-sm pr-4">{q}</span>
        <ChevronDown size={16}
          className={`text-dark-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="px-5 pb-5 border-t border-dark-100"
          >
            <p className="text-sm text-dark-600 leading-relaxed pt-3">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Registration Form ── */
function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const form = useForm({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      ownerName:'', umkmName:'', phone:'', email:'',
      city:'', province:'', product:'', capacity:'', hasHalal:'', description:'',
    },
    mode: 'onTouched',
  })
  const { register, handleSubmit, formState: { errors } } = form

  const onSubmit = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={36} className="text-brand-600" />
        </div>
        <h3 className="font-display text-2xl font-bold text-dark-900 mb-2">
          Pendaftaran Diterima! 🎉
        </h3>
        <p className="text-dark-500 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
          Tim Xpora akan menghubungi kamu dalam <strong>2 hari kerja</strong> melalui
          WhatsApp atau email yang sudah kamu daftarkan.
        </p>
        <Link to="/public">
          <Button variant="secondary" size="md">Kembali ke Beranda</Button>
        </Link>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h3 className="font-display text-xl font-bold text-dark-900 mb-1">Daftar Sekarang</h3>
        <p className="text-sm text-dark-500">Gratis · Proses 5 menit · Tim kami akan segera follow-up</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Nama Pemilik / PIC" required placeholder="Budi Santoso"
          error={errors.ownerName?.message} {...register('ownerName')} />
        <Input label="Nama UMKM / Usaha" required placeholder="UMKM Sari Tempe"
          error={errors.umkmName?.message} {...register('umkmName')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="No. HP / WhatsApp" type="tel" required placeholder="+62 812 xxxx xxxx"
          error={errors.phone?.message} {...register('phone')} />
        <Input label="Email" type="email" required placeholder="umkm@email.com"
          error={errors.email?.message} {...register('email')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Kota / Kabupaten" required placeholder="Banyumas"
          error={errors.city?.message} {...register('city')} />
        <Select label="Provinsi" required error={errors.province?.message} {...register('province')}>
          <option value="">— Pilih provinsi —</option>
          {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
        </Select>
      </div>

      <Input label="Produk Utama" required placeholder="Tempe, Kopi, Rempah, dll."
        error={errors.product?.message} {...register('product')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select label="Estimasi Kapasitas Produksi" required
          error={errors.capacity?.message} {...register('capacity')}>
          <option value="">— Pilih kapasitas —</option>
          {CAPACITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Select label="Sudah punya sertifikat Halal MUI?" required
          error={errors.hasHalal?.message} {...register('hasHalal')}>
          <option value="">— Pilih —</option>
          <option value="ya">Ya, sudah ada</option>
          <option value="proses">Sedang diproses</option>
          <option value="belum">Belum, butuh bantuan</option>
        </Select>
      </div>

      <Textarea label="Cerita singkat tentang usahamu" rows={3}
        placeholder="Berdiri sejak..., produksi per hari..., sudah pernah ekspor/tidak..."
        error={errors.description?.message} {...register('description')} />

      <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}
        id="join-submit-btn">
        {loading ? 'Mengirim...' : 'Kirim Pendaftaran →'}
      </Button>

      <p className="text-xs text-dark-400 text-center leading-relaxed">
        Dengan mendaftar, kamu setuju dengan{' '}
        <Link to="#" className="text-brand-600 hover:underline">Syarat & Ketentuan</Link> Xpora.
        Data kamu aman dan tidak akan disebarkan.
      </p>
    </form>
  )
}

/* ── Main Page ── */
export function JoinPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative bg-dark-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full
                        bg-brand-600 opacity-10 blur-3xl pointer-events-none" />
        <div className="container-xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-500/30
                       text-brand-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-6"
          >
            <Users size={14} /> Program Mitra UMKM
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Jual Produkmu ke<br />
            <span className="text-gradient">Pasar Global</span> bersama Xpora
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-dark-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Xpora mengagregasi UMKM Indonesia menjadi supply chain kelas ekspor.
            Kamu produksi, kami yang urus sisanya — sertifikasi, dokumentasi, logistik, dan pembeli global.
          </motion.p>
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { value: '38+',   label: 'UMKM sudah bergabung' },
              { value: '12',    label: 'Negara tujuan ekspor' },
              { value: '24h',   label: 'Respons pendaftaran' },
              { value: 'Gratis',label: 'Biaya pendaftaran' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-brand-400">{s.value}</p>
                <p className="text-xs text-dark-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="section bg-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Keuntungan</p>
            <h2 className="font-display text-4xl font-bold text-dark-900 mb-4">
              Kenapa Bergabung dengan Xpora?
            </h2>
            <p className="text-dark-500 max-w-lg mx-auto">
              Kami bukan sekadar platform — kami adalah mitra ekspor yang benar-benar bekerja
              untuk kesuksesan UMKM Indonesia.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => <BenefitCard key={b.title} {...b} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── Eligibility + Steps (split) ── */}
      <section className="section bg-dark-50">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Eligibility */}
            <div>
              <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Persyaratan</p>
              <h2 className="font-display text-3xl font-bold text-dark-900 mb-6">
                Siapa yang Bisa Bergabung?
              </h2>
              <div className="space-y-3">
                {ELIGIBLE.map((e) => (
                  <div key={e} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-brand-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-dark-700 leading-relaxed">{e}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Onboarding Steps */}
            <div>
              <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Proses</p>
              <h2 className="font-display text-3xl font-bold text-dark-900 mb-6">
                Bagaimana Cara Kerjanya?
              </h2>
              <div className="space-y-4">
                {ONBOARDING_STEPS.map((s, i) => (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-4 bg-white rounded-xl p-5 border border-dark-100
                               hover:border-brand-200 hover:shadow-card transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-bold text-sm
                                    flex items-center justify-center flex-shrink-0">
                      {s.n}
                    </div>
                    <div>
                      <p className="font-semibold text-dark-900 mb-1">{s.title}</p>
                      <p className="text-sm text-dark-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Registration Form ── */}
      <section id="daftar" className="section bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Sidebar info */}
            <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-28">
              <div>
                <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">Daftar</p>
                <h2 className="font-display text-3xl font-bold text-dark-900 mb-4">
                  Mulai Perjalanan Ekspormu
                </h2>
                <p className="text-dark-500 leading-relaxed text-sm">
                  Isi formulir dan tim kami akan menghubungi dalam 2 hari kerja.
                  Pendaftaran gratis, tidak ada komitmen awal.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Phone,    text: '+62 812-3456-7890 (WA)' },
                  { icon: FileText, text: 'rfq@xpora.id' },
                  { icon: MapPin,   text: 'Jawa Tengah, Indonesia' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-dark-600">
                    <Icon size={15} className="text-brand-500 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
              {/* Testimonial mini */}
              <div className="bg-dark-50 rounded-2xl p-5 border border-dark-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className="text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-sm text-dark-700 italic leading-relaxed mb-3">
                  "Sejak bergabung dengan Xpora, kapasitas produksi saya naik 3x dan saya bisa
                  jual langsung ke Jepang dengan harga premium."
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center
                                  justify-center font-bold text-xs">BW</div>
                  <div>
                    <p className="text-xs font-semibold text-dark-900">Bu Wati</p>
                    <p className="text-xs text-dark-400">UMKM Sari Tempe · Banyumas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white border border-dark-100 rounded-2xl p-8 shadow-card">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section bg-dark-50">
        <div className="container-xl max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-dark-900 mb-3">
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <p className="text-dark-500 text-sm">
              Masih ada pertanyaan? Hubungi kami via WhatsApp kapan saja.
            </p>
          </div>
          <div className="space-y-3">
            {FAQ.map((f) => <FaqItem key={f.q} {...f} />)}
          </div>
          <div className="text-center mt-10">
            <a href="https://wa.me/6281234567890?text=Halo+Xpora%2C+saya+ingin+tanya+tentang+program+UMKM"
              target="_blank" rel="noopener noreferrer"
              id="join-wa-contact"
            >
              <Button variant="primary" size="lg">
                <Building2 size={16} /> Tanya via WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
