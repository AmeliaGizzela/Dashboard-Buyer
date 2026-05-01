import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Clock, MessageCircle, Download } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { buildWhatsAppUrl } from '../../lib/utils'
import confetti from 'canvas-confetti'

const WA_NUMBER = '6281234567890'

export function RFQSuccessPage() {
  const [params]  = useSearchParams()
  const refCode   = params.get('ref') || 'XPR-XXXXXX'

  // 🎉 confetti burst on mount
  useEffect(() => {
    const t = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#22c55e', '#16a34a', '#86efac', '#fbbf24', '#ffffff'],
      })
    }, 300)
    return () => clearTimeout(t)
  }, [])

  const waMsg = encodeURIComponent(
    `Hi Xpora! 👋 I just submitted RFQ ${refCode}. Can you please confirm receipt?`
  )

  const NEXT_STEPS = [
    {
      icon: Clock,
      title: 'Within 24 hours',
      desc: 'Our export specialist will review your RFQ and prepare a competitive quotation.',
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      icon: MessageCircle,
      title: 'Quotation via Email',
      desc: "You'll receive a formal quotation with pricing, timeline, and compliance notes.",
      color: 'bg-brand-50 text-brand-600 border-brand-100',
    },
    {
      icon: ArrowRight,
      title: 'Negotiation & LoI',
      desc: 'Once agreed, we issue a Letter of Intent and begin supplier allocation.',
      color: 'bg-gold-50 text-gold-600 border-gold-100',
    },
  ]

  return (
    <div className="pt-20 pb-20 min-h-screen bg-dark-50 flex flex-col">
      <div className="container-xl flex-1 flex items-center justify-center">
        <div className="max-w-xl w-full">
          {/* ── Success card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.35 }}
            className="bg-white rounded-2xl shadow-card-hover border border-dark-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-hero-pattern opacity-10" />
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                className="relative z-10"
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center
                                mx-auto mb-4 backdrop-blur-sm">
                  <CheckCircle2 size={40} className="text-white" />
                </div>
                <h1 className="font-display text-3xl font-bold text-white mb-2">
                  RFQ Submitted! 🎉
                </h1>
                <p className="text-brand-100 text-sm">
                  Your request has been received and is being reviewed.
                </p>
              </motion.div>
            </div>

            {/* Ref code */}
            <div className="px-8 py-5 bg-dark-50 border-b border-dark-100 text-center">
              <p className="text-xs text-dark-500 mb-1 font-medium uppercase tracking-wide">
                Your RFQ Reference
              </p>
              <p className="font-mono text-2xl font-bold text-dark-900 tracking-wider">
                {refCode}
              </p>
              <p className="text-xs text-dark-400 mt-1">
                Keep this for your records — include it in any follow-up communication.
              </p>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
              <h2 className="font-display font-bold text-dark-900 text-lg text-center">
                What happens next?
              </h2>

              <div className="space-y-4">
                {NEXT_STEPS.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center
                                    flex-shrink-0 ${s.color}`}>
                      <s.icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-dark-900 text-sm">{s.title}</p>
                      <p className="text-dark-500 text-xs leading-relaxed mt-0.5">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="rfq-success-whatsapp"
                >
                  <Button variant="primary" size="md" fullWidth>
                    <MessageCircle size={16} />
                    Confirm via WhatsApp
                  </Button>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <Link to="/public/products" id="rfq-success-browse-more">
                    <Button variant="secondary" size="sm" fullWidth>
                      Browse More Products
                    </Button>
                  </Link>
                  <Link to="/public" id="rfq-success-back-home">
                    <Button variant="secondary" size="sm" fullWidth>
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust note */}
          <p className="text-center text-xs text-dark-400 mt-6">
            Questions? Email us at{' '}
            <a href="mailto:rfq@xpora.id" className="text-brand-600 hover:underline">
              rfq@xpora.id
            </a>{' '}
            or call <strong className="text-dark-600">+62 812-3456-7890</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
