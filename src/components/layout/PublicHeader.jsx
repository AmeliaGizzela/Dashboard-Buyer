import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'

const NAV_LINKS = [
  { label: 'Home',     to: '/public' },
  { label: 'Products', to: '/public/products' },
  { label: 'For UMKM', to: '/join' },
  { label: 'About',    to: '/public#about' },
]

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [lang, setLang]             = useState('EN')
  const [langOpen, setLangOpen]     = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-dark-100'
          : 'bg-transparent'
      )}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/public" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700
                            flex items-center justify-center shadow-brand
                            group-hover:shadow-brand-lg transition-shadow">
              <span className="text-white font-display font-bold text-sm">X</span>
            </div>
            <span className="font-display font-bold text-xl text-dark-900">
              Xpora
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-dark-600 hover:text-dark-900 hover:bg-dark-50'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setLangOpen(!langOpen)}
                onBlur={() => setTimeout(() => setLangOpen(false), 200)}
                className="flex items-center gap-1.5 text-sm font-medium text-dark-600 hover:text-dark-900 transition-colors"
              >
                <Globe size={16} />
                <span>{lang}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-dark-100 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <button 
                    onClick={() => { setLang('EN'); setLangOpen(false); alert('Language switched to English (Demo)') }} 
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${lang === 'EN' ? 'text-brand-600 bg-brand-50 font-medium' : 'text-dark-600 hover:bg-dark-50'}`}
                  >
                    English (EN)
                  </button>
                  <button 
                    onClick={() => { setLang('ID'); setLangOpen(false); alert('Bahasa Indonesia dipilih (Demo)') }} 
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${lang === 'ID' ? 'text-brand-600 bg-brand-50 font-medium' : 'text-dark-600 hover:bg-dark-50'}`}
                  >
                    Bahasa (ID)
                  </button>
                </div>
              )}
            </div>

            <Link to="/public/rfq">
              <Button variant="primary" size="sm">Submit RFQ</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-dark-600 hover:bg-dark-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-dark-100 animate-fade-in-down">
          <div className="container-xl py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-dark-600 hover:bg-dark-50'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-dark-100 mt-2">
              <Link to="/public/rfq" className="block">
                <Button variant="primary" size="sm" fullWidth>Submit RFQ</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
