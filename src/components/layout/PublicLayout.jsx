import { Outlet } from 'react-router-dom'
import { PublicHeader } from './PublicHeader'
import { Footer } from './Footer'
import { WhatsAppButton } from '../ui/WhatsAppButton'

/**
 * PublicLayout — wraps all /public/* routes
 * Includes sticky header, footer, and WhatsApp float button
 */
export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
