import { create } from 'zustand'
import { supabase } from '../lib/supabase'

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
  isAuthenticated: false,
  session: null,
  isInitializing: true,
  
  initSession: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    set({ isAuthenticated: !!session, session, isInitializing: false })
    
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ isAuthenticated: !!session, session })
    })
  },
  
  signIn: async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password })
  },
  
  signOut: async () => {
    await supabase.auth.signOut()
    set({ isAuthenticated: false, session: null })
  },

  // Orders filter state
  ordersFilter: { status: 'all', product: 'all', country: 'all' },
  setOrdersFilter: (filter) =>
    set((state) => ({ ordersFilter: { ...state.ordersFilter, ...filter } })),
}))
