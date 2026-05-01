import { Outlet } from 'react-router-dom'
import { AdminSidebar } from './AdminSidebar'
import { Bell, Search } from 'lucide-react'

/**
 * AdminLayout — wraps all /admin/* routes (except /admin login)
 */
export function AdminLayout() {
  return (
    <div className="flex h-screen bg-dark-950 text-white overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-6
                           border-b border-dark-800 bg-dark-900 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
              <input
                type="search"
                placeholder="Search orders, UMKM..."
                className="w-64 bg-dark-800 border border-dark-700 rounded-lg
                           pl-9 pr-4 py-2 text-sm text-dark-200 placeholder-dark-500
                           focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-dark-400 hover:text-white
                               hover:bg-dark-800 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-dark-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700
                              flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">Admin Xpora</p>
                <p className="text-xs text-dark-500">Konsorsium</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 admin-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
