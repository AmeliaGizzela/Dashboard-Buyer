import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAdminStore } from './store'

// Layouts
import { PublicLayout } from './components/layout/PublicLayout'
import { AdminLayout }  from './components/layout/AdminLayout'

// ---- PUBLIC PAGES ----
import { LandingPage }       from './pages/public/LandingPage'
import { ProductCatalogPage } from './pages/public/ProductCatalogPage'
import { ProductDetailPage }  from './pages/public/ProductDetailPage'
import { RFQPage }            from './pages/public/RFQPage'
import { RFQSuccessPage }     from './pages/public/RFQSuccessPage'
import { JoinPage }           from './pages/public/JoinPage'

// ---- ADMIN PAGES ----
// All admin pages live in AdminLoginPage.jsx (co-located placeholders)
import {
  AdminLoginPage,
  AdminDashboardPage,
  AdminOrdersPage,
  AdminOrderDetailPage,
  AdminAllocationPage,
  AdminUMKMPage,
  AdminUMKMDetailPage,
  AdminProductsPage,
  AdminSettingsPage,
} from './pages/admin/AdminLoginPage'

function AdminProtectedRoute({ children }) {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated)
  const isInitializing = useAdminStore((state) => state.isInitializing)

  if (isInitializing) {
    return <div className="min-h-screen bg-dark-950 flex items-center justify-center text-white">Loading session...</div>
  }
  return isAuthenticated ? children : <Navigate to="/admin" replace />
}

export default function App() {
  const initSession = useAdminStore(state => state.initSession)
  
  useEffect(() => {
    initSession()
  }, [initSession])

  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect → public landing */}
        <Route path="/" element={<Navigate to="/public" replace />} />

        {/* ======= PUBLIC SIDE ======= */}
        <Route element={<PublicLayout />}>
          <Route path="/public"                element={<LandingPage />} />
          <Route path="/public/products"       element={<ProductCatalogPage />} />
          <Route path="/public/products/:slug" element={<ProductDetailPage />} />
          <Route path="/public/rfq"            element={<RFQPage />} />
          <Route path="/public/rfq/success"    element={<RFQSuccessPage />} />
          <Route path="/join"                  element={<JoinPage />} />
        </Route>

        {/* ======= ADMIN SIDE ======= */}
        {/* Login — standalone, no AdminLayout */}
        <Route path="/admin" element={<AdminLoginPage />} />

        {/* Protected admin pages wrapped in AdminLayout */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard"   element={<AdminDashboardPage />} />
          <Route path="orders"      element={<AdminOrdersPage />} />
          <Route path="orders/:id"  element={<AdminOrderDetailPage />} />
          <Route path="allocation"  element={<AdminAllocationPage />} />
          <Route path="umkm"        element={<AdminUMKMPage />} />
          <Route path="umkm/:id"    element={<AdminUMKMDetailPage />} />
          <Route path="products"    element={<AdminProductsPage />} />
          <Route path="settings"    element={<AdminSettingsPage />} />
        </Route>

        {/* 404 — fallback to public landing */}
        <Route path="*" element={<Navigate to="/public" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
