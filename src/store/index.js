import { create } from 'zustand'

// =============================================
// APP STORE — Global state via Zustand
// =============================================

/**
 * useAppStore — general app-level state
 */
export const useAppStore = create((set) => ({
  // UI
  isMobileMenuOpen: false,
  setMobileMenuOpen: (val) => set({ isMobileMenuOpen: val }),

  // Notifications (toast-like messages)
  notifications: [],
  addNotification: (msg) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now(), ...msg },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))

/**
 * useRFQStore — tracks current RFQ draft (pre-submit)
 */
export const useRFQStore = create((set) => ({
  draft: {
    company:      '',
    country:      '',
    email:        '',
    productSlug:  '',
    quantity:     '',
    grade:        '',
    deliveryDate: '',
    notes:        '',
  },
  setDraft: (fields) =>
    set((state) => ({ draft: { ...state.draft, ...fields } })),
  resetDraft: () =>
    set({
      draft: {
        company: '', country: '', email: '', productSlug: '',
        quantity: '', grade: '', deliveryDate: '', notes: '',
      },
    }),

  // Submitted RFQ reference
  submittedRefCode: null,
  setSubmittedRefCode: (code) => set({ submittedRefCode: code }),
}))

/**
 * useAdminStore — admin session & UI state
 */
export const useAdminStore = create((set) => ({
  // Auth (will be replaced with Supabase session in Task 6)
  isAuthenticated: false,
  adminUser: null,
  setAuth: (user) => set({ isAuthenticated: true, adminUser: user }),
  clearAuth: () => set({ isAuthenticated: false, adminUser: null }),

  // Orders filter state
  ordersFilter: { status: 'all', product: 'all', country: 'all' },
  setOrdersFilter: (filter) =>
    set((state) => ({ ordersFilter: { ...state.ordersFilter, ...filter } })),
}))
