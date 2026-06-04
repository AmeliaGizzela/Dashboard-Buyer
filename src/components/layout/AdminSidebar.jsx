import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingCart, Users, Package,
  Settings, LogOut, ChevronLeft, ChevronRight,
  Layers, Bell
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useAdminStore } from '../../store'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard',  to: '/admin/dashboard' },
  { icon: ShoppingCart,    label: 'Orders',     to: '/admin/orders' },
  { icon: Layers,          label: 'Allocation', to: '/admin/allocation' },
  { icon: Users,           label: 'UMKM',       to: '/admin/umkm' },
  { icon: Package,         label: 'Products',   to: '/admin/products' },
  { icon: Settings,        label: 'Settings',   to: '/admin/settings' },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const navigate = useNavigate()

  const signOut = useAdminStore((state) => state.signOut)

  const handleLogout = async () => {
    await signOut()
    navigate('/admin')
  }

  return (
    <aside
      className={cn(
        'flex flex-col bg-dark-900 border-r border-dark-800 transition-all duration-300 h-screen sticky top-0',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center h-16 px-4 border-b border-dark-800 flex-shrink-0',
        collapsed ? 'justify-center' : 'gap-3'
      )}>
        {!logoError ? (
          <img 
            src="/logo.png" 
            alt="Xpora Logo" 
            className="h-8 w-auto object-contain flex-shrink-0"
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700
                          flex items-center justify-center flex-shrink-0">
            <span className="text-white font-display font-bold text-sm">X</span>
          </div>
        )}
        {!collapsed && (
          <div>
            <span className="font-display font-bold text-white text-base">Xpora</span>
            <p className="text-xs text-dark-500 -mt-0.5">Command Center</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 admin-scroll overflow-y-auto">
        {NAV_ITEMS.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
                'transition-colors duration-150 group',
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-dark-400 hover:text-white hover:bg-dark-800',
                collapsed && 'justify-center'
              )
            }
            title={collapsed ? label : undefined}
          >
            {() => (
              <>
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-dark-800 p-2 space-y-0.5 flex-shrink-0">
        {/* Notifications */}
        <button
          className={cn(
            'flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium',
            'text-dark-400 hover:text-white hover:bg-dark-800 transition-colors',
            collapsed && 'justify-center'
          )}
        >
          <Bell size={18} />
          {!collapsed && 'Notifications'}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={cn(
            'flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium',
            'text-dark-400 hover:text-red-400 hover:bg-dark-800 transition-colors',
            collapsed && 'justify-center'
          )}
        >
          <LogOut size={18} />
          {!collapsed && 'Logout'}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium',
            'text-dark-500 hover:text-white hover:bg-dark-800 transition-colors',
            collapsed && 'justify-center'
          )}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && 'Collapse'}
        </button>
      </div>
    </aside>
  )
}
