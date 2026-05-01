import { buildWhatsAppUrl } from '../../lib/utils'
import { MessageCircle } from 'lucide-react'

const WA_NUMBER = '6281234567890' // Ganti dengan nomor WA bisnis Xpora
const WA_DEFAULT_MSG = 'Hello Xpora! 👋 I am interested in your products and would like to know more.'

/**
 * WhatsApp Floating Chat Button
 * Fixed position, bottom-right corner
 */
export function WhatsAppButton({ phone = WA_NUMBER, message = WA_DEFAULT_MSG }) {
  const url = buildWhatsAppUrl(phone, message)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Xpora on WhatsApp"
      id="whatsapp-float-btn"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group"
    >
      {/* Tooltip */}
      <span
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   bg-dark-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg
                   whitespace-nowrap shadow-dark"
      >
        Chat with us!
      </span>

      {/* Button */}
      <div
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white
                   flex items-center justify-center shadow-lg
                   hover:scale-110 active:scale-95 transition-transform duration-200
                   cursor-pointer"
      >
        {/* Ping animation ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <MessageCircle size={26} fill="white" />
      </div>
    </a>
  )
}
