import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Share2, Globe, ExternalLink } from 'lucide-react'

const FOOTER_LINKS = {
  Products: [
    { label: 'Tempe Medium',        to: '/public/products/tempe-medium-grade' },
    { label: 'Tempe Premium',       to: '/public/products/tempe-premium-grade' },
    { label: 'Tempe Super Premium', to: '/public/products/tempe-super-premium' },
    { label: 'View All Products',   to: '/public/products' },
  ],
  Company: [
    { label: 'About Xpora',  to: '/public#about' },
    { label: 'How It Works', to: '/public#how-it-works' },
    { label: 'For UMKM',     to: '/join' },
    { label: 'Submit RFQ',   to: '/public/rfq' },
  ],
  Legal: [
    { label: 'Privacy Policy',    to: '#' },
    { label: 'Terms of Service',  to: '#' },
    { label: 'Export Compliance', to: '#' },
  ],
}

const SOCIALS = [
  { icon: Share2,      href: '#', label: 'Instagram' },
  { icon: Globe,       href: '#', label: 'LinkedIn' },
  { icon: ExternalLink,href: '#', label: 'Twitter/X' },
]


export function Footer() {
  return (
    <footer className="bg-dark-950 text-dark-300">
      <div className="container-xl py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-dark-800">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/public" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700
                              flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">X</span>
              </div>
              <span className="font-display font-bold text-xl text-white">Xpora</span>
            </Link>
            <p className="text-sm text-dark-400 leading-relaxed max-w-xs mb-6">
              Indonesia's AI-powered B2B export aggregator. Connecting global buyers
              with quality-assured UMKM products — done-for-you.
            </p>
            {/* Contact */}
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-brand-500 flex-shrink-0" />
                <a href="mailto:hello@xpora.id" className="hover:text-white transition-colors">
                  hello@xpora.id
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-brand-500 flex-shrink-0" />
                <a href="tel:+6281234567890" className="hover:text-white transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-dark-400">
                  Jawa Tengah, Indonesia
                </span>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-dark-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-500">
            © {new Date().getFullYear()} Xpora. All rights reserved.
            Built in Indonesia 🇮🇩
          </p>
          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-dark-800 flex items-center justify-center
                           text-dark-400 hover:text-white hover:bg-dark-700 transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
