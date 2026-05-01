import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, CheckCircle2,
  Package, Building2, ClipboardList, Loader2,
  Info
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input, Textarea, Select } from '../../components/ui/Input'
import { GradeBadge } from '../../components/ui/Badge'
import { PRODUCTS, COUNTRIES } from '../../data/mockData'
import { generateRFQCode } from '../../lib/utils'
import { useRFQStore } from '../../store'

/* ── Zod Schema ──────────────────────────────── */
const rfqSchema = z.object({
  // Step 1 — Product
  productSlug:  z.string().min(1, 'Please select a product'),
  grade:        z.string().min(1, 'Please select a grade'),
  quantity:     z
    .string()
    .min(1, 'Quantity is required')
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, 'Must be a positive number'),
  deliveryPort: z.string().min(2, 'Destination port is required'),
  deliveryDate: z.string().min(1, 'Target delivery date is required'),
  incoterm:     z.string().min(1, 'Please select an Incoterm'),

  // Step 2 — Company
  company:      z.string().min(2, 'Company name is required'),
  contactName:  z.string().min(2, 'Contact name is required'),
  email:        z.string().email('Invalid email address'),
  phone:        z.string().min(6, 'Phone number is required'),
  country:      z.string().min(1, 'Country is required'),
  website:      z.string().optional(),
  notes:        z.string().optional(),

  // consent
  consent: z.boolean().refine((v) => v === true, { message: 'You must agree to continue' }),
})

const STEPS = [
  { id: 1, label: 'Product',  icon: Package },
  { id: 2, label: 'Company',  icon: Building2 },
  { id: 3, label: 'Review',   icon: ClipboardList },
]

const INCOTERMS = ['FOB', 'CIF', 'EXW', 'DDP', 'CFR', 'FCA']

/* ── Step indicator ──────────────────────────── */
function StepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done    = current > step.id
        const active  = current === step.id
        const Icon    = step.icon
        return (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
              ${active ? 'bg-brand-600 text-white shadow-brand'
                : done  ? 'bg-brand-100 text-brand-700'
                        : 'bg-dark-100 text-dark-400'}`}
            >
              {done
                ? <CheckCircle2 size={15} />
                : <Icon size={15} />}
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-0.5 ${done ? 'bg-brand-400' : 'bg-dark-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Field wrapper (avoids prop-drilling) ────── */
function Field({ children }) {
  return <div className="space-y-1">{children}</div>
}

/* ── Step 1: Product Info ─────────────────────── */
function Step1({ form, products }) {
  const { register, formState: { errors }, watch, setValue } = form
  const selectedSlug = watch('productSlug')
  const selectedProduct = products.find((p) => p.slug === selectedSlug)

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-bold text-dark-900 mb-1">Product & Quantity</h2>
        <p className="text-sm text-dark-500">Tell us what you need and how much.</p>
      </div>

      {/* Product select */}
      <Field>
        <Select
          label="Product"
          required
          error={errors.productSlug?.message}
          {...register('productSlug')}
        >
          <option value="">— Select a product —</option>
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name} · {p.grade} (MOQ {p.moq} kg)
            </option>
          ))}
        </Select>
      </Field>

      {/* Product preview card */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 bg-brand-50 border border-brand-100 rounded-xl p-4"
        >
          <img src={selectedProduct.images[0]} alt={selectedProduct.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-dark-900">{selectedProduct.name}</p>
              <GradeBadge grade={selectedProduct.grade} />
            </div>
            <p className="text-xs text-dark-500">
              Capacity: {(selectedProduct.capacity / 1000).toFixed(1)} Ton/mo ·
              Price: ${selectedProduct.priceRange.min}–${selectedProduct.priceRange.max}/kg
            </p>
          </div>
        </motion.div>
      )}

      {/* Grade */}
      <Field>
        <Select label="Grade" required error={errors.grade?.message} {...register('grade')}>
          <option value="">— Select grade —</option>
          {['Medium', 'Premium', 'Super Premium'].map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </Select>
      </Field>

      {/* Quantity */}
      <Field>
        <Input
          label="Quantity (kg)"
          type="number"
          required
          min="1"
          placeholder="e.g. 1000"
          hint="Minimum order varies per grade. We will confirm feasibility."
          error={errors.quantity?.message}
          {...register('quantity')}
        />
      </Field>

      {/* Delivery port + date (grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field>
          <Input
            label="Destination Port / City"
            required
            placeholder="e.g. Port of Tokyo"
            error={errors.deliveryPort?.message}
            {...register('deliveryPort')}
          />
        </Field>
        <Field>
          <Input
            label="Target Delivery Date"
            type="date"
            required
            error={errors.deliveryDate?.message}
            {...register('deliveryDate')}
          />
        </Field>
      </div>

      {/* Incoterm */}
      <Field>
        <Select label="Preferred Incoterm" required error={errors.incoterm?.message} {...register('incoterm')}>
          <option value="">— Select Incoterm —</option>
          {INCOTERMS.map((t) => <option key={t} value={t}>{t}</option>)}
        </Select>
      </Field>
    </div>
  )
}

/* ── Step 2: Company Info ─────────────────────── */
function Step2({ form }) {
  const { register, formState: { errors } } = form
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-bold text-dark-900 mb-1">Company Details</h2>
        <p className="text-sm text-dark-500">So we know who to send the quotation to.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field>
          <Input label="Company Name" required placeholder="Acme Foods Inc."
            error={errors.company?.message} {...register('company')} />
        </Field>
        <Field>
          <Input label="Contact Person" required placeholder="John Doe"
            error={errors.contactName?.message} {...register('contactName')} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field>
          <Input label="Business Email" type="email" required placeholder="procurement@company.com"
            error={errors.email?.message} {...register('email')} />
        </Field>
        <Field>
          <Input label="Phone / WhatsApp" type="tel" required placeholder="+1 555 000 0000"
            error={errors.phone?.message} {...register('phone')} />
        </Field>
      </div>

      <Field>
        <Select label="Country" required error={errors.country?.message} {...register('country')}>
          <option value="">— Select country —</option>
          {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
      </Field>

      <Field>
        <Input label="Company Website" type="url" placeholder="https://yourcompany.com"
          hint="Optional — helps us understand your business"
          error={errors.website?.message} {...register('website')} />
      </Field>

      <Field>
        <Textarea label="Additional Notes" rows={4}
          placeholder="Any special requirements, packaging preferences, certifications needed, etc."
          error={errors.notes?.message} {...register('notes')} />
      </Field>

      {/* Consent */}
      <div className="bg-dark-50 rounded-xl p-4 border border-dark-200">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register('consent')}
            className="mt-0.5 w-4 h-4 rounded border-dark-300 accent-brand-600 cursor-pointer" />
          <span className="text-sm text-dark-600 leading-relaxed">
            I agree that Xpora may contact me regarding this RFQ and understand this is
            a non-binding request for quotation.{' '}
            <Link to="#" className="text-brand-600 hover:underline">Privacy Policy</Link>
          </span>
        </label>
        {form.formState.errors.consent && (
          <p className="text-xs text-red-500 mt-2">{form.formState.errors.consent.message}</p>
        )}
      </div>
    </div>
  )
}

/* ── Step 3: Review ──────────────────────────── */
function Step3({ data, products }) {
  const product = products.find((p) => p.slug === data.productSlug)
  const rows = [
    { label: 'Product',    value: product ? `${product.name} · ${data.grade}` : data.productSlug },
    { label: 'Quantity',   value: `${Number(data.quantity).toLocaleString()} kg` },
    { label: 'Incoterm',   value: data.incoterm },
    { label: 'Destination',value: data.deliveryPort },
    { label: 'Target Date',value: new Date(data.deliveryDate).toLocaleDateString('en-GB', { year:'numeric',month:'long',day:'numeric' }) },
    { label: 'Company',    value: data.company },
    { label: 'Contact',    value: data.contactName },
    { label: 'Email',      value: data.email },
    { label: 'Phone',      value: data.phone },
    { label: 'Country',    value: data.country },
  ]
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-bold text-dark-900 mb-1">Review Your RFQ</h2>
        <p className="text-sm text-dark-500">Please confirm the details before submitting.</p>
      </div>

      {product && (
        <div className="flex items-center gap-4 bg-brand-50 border border-brand-100 rounded-xl p-4">
          <img src={product.images[0]} alt={product.name}
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
          <div>
            <p className="font-semibold text-dark-900">{product.name}</p>
            <GradeBadge grade={data.grade} />
          </div>
        </div>
      )}

      <div className="bg-white border border-dark-100 rounded-xl overflow-hidden">
        {rows.map(({ label, value }, i) => (
          <div key={label} className={`flex items-start justify-between px-5 py-3 text-sm
            ${i % 2 === 0 ? 'bg-dark-50/50' : 'bg-white'}`}>
            <span className="text-dark-500 font-medium">{label}</span>
            <span className="text-dark-900 text-right max-w-[60%] font-medium">{value}</span>
          </div>
        ))}
        {data.notes && (
          <div className="px-5 py-3 text-sm bg-white border-t border-dark-100">
            <p className="text-dark-500 font-medium mb-1">Notes</p>
            <p className="text-dark-700 leading-relaxed">{data.notes}</p>
          </div>
        )}
      </div>

      <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <Info size={15} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700 leading-relaxed">
          After submission, our team will review your RFQ and respond within{' '}
          <strong>24 hours</strong> with a competitive quotation and availability confirmation.
        </p>
      </div>
    </div>
  )
}

/* ── Main Page ───────────────────────────────── */
export function RFQPage() {
  const [step, setStep]     = useState(1)
  const [submitting, setSub] = useState(false)
  const navigate             = useNavigate()
  const [searchParams]       = useSearchParams()
  const { setSubmittedRefCode } = useRFQStore()

  const form = useForm({
    resolver: zodResolver(rfqSchema),
    defaultValues: {
      productSlug:  searchParams.get('product') || '',
      grade:        searchParams.get('grade')   || '',
      quantity:     '',
      deliveryPort: '',
      deliveryDate: '',
      incoterm:     'FOB',
      company:      '',
      contactName:  '',
      email:        '',
      phone:        '',
      country:      '',
      website:      '',
      notes:        '',
      consent:      false,
    },
    mode: 'onTouched',
  })

  const STEP1_FIELDS = ['productSlug','grade','quantity','deliveryPort','deliveryDate','incoterm']
  const STEP2_FIELDS = ['company','contactName','email','phone','country','consent']

  const nextStep = async () => {
    const fields = step === 1 ? STEP1_FIELDS : STEP2_FIELDS
    const valid  = await form.trigger(fields)
    if (valid) setStep((s) => s + 1)
  }

  const onSubmit = async (data) => {
    setSub(true)
    await new Promise((r) => setTimeout(r, 1400)) // simulate API call
    const refCode = generateRFQCode()
    setSubmittedRefCode(refCode)
    navigate(`/public/rfq/success?ref=${refCode}`)
  }

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  }

  return (
    <div className="pt-20 pb-20 min-h-screen bg-dark-50">
      {/* Page header */}
      <div className="bg-white border-b border-dark-100">
        <div className="container-xl py-10">
          <nav className="text-xs text-dark-400 flex items-center gap-2 mb-4">
            <Link to="/public" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-dark-700 font-medium">Submit RFQ</span>
          </nav>
          <h1 className="font-display text-4xl font-bold text-dark-900 mb-2">
            Request for Quotation
          </h1>
          <p className="text-dark-500 max-w-lg">
            Fill in your requirements below. Our team will respond with a formal quotation
            within <strong>24 hours</strong>.
          </p>
        </div>
      </div>

      <div className="container-xl mt-10">
        <div className="max-w-2xl mx-auto">
          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {[
              '✅ Non-binding request',
              '⚡ 24-hour response',
              '🔒 Your data is private',
            ].map((b) => (
              <span key={b} className="text-xs text-dark-500 bg-white border border-dark-100
                                        rounded-full px-4 py-1.5 shadow-sm">{b}</span>
            ))}
          </div>

          {/* Main card */}
          <div className="bg-white rounded-2xl shadow-card border border-dark-100 p-8">
            <StepBar current={step} />

            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait" custom={1}>
                <motion.div
                  key={step}
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  {step === 1 && <Step1 form={form} products={PRODUCTS} />}
                  {step === 2 && <Step2 form={form} />}
                  {step === 3 && <Step3 data={form.getValues()} products={PRODUCTS} />}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark-100">
                {step > 1 ? (
                  <button type="button" onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-2 text-sm text-dark-500 hover:text-dark-900
                               font-medium transition-colors">
                    <ChevronLeft size={16} /> Back
                  </button>
                ) : (
                  <Link to="/public/products"
                    className="flex items-center gap-2 text-sm text-dark-500 hover:text-dark-900
                               font-medium transition-colors">
                    <ChevronLeft size={16} /> Back to Catalog
                  </Link>
                )}

                {step < 3 ? (
                  <Button type="button" variant="primary" size="md" onClick={nextStep}
                    id={`rfq-next-step-${step}`}>
                    Continue <ChevronRight size={16} />
                  </Button>
                ) : (
                  <Button type="submit" variant="primary" size="md" loading={submitting}
                    id="rfq-submit-btn">
                    {submitting ? 'Submitting…' : 'Submit RFQ →'}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Help text */}
          <p className="text-center text-xs text-dark-400 mt-6">
            Need help?{' '}
            <a href="https://wa.me/6281234567890?text=Hi%20Xpora,%20I%20need%20help%20with%20my%20RFQ"
              target="_blank" rel="noopener noreferrer"
              className="text-brand-600 hover:underline">
              Chat with us on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
