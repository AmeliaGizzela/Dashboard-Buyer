import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from './supabase'

// ─── PRODUCTS ─────────────────────────────────────────────────────────────
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        
      if (error) throw error
      
      // Memetakan format database ke format UI (seperti mockData)
      return data.map(p => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        grade: p.grade,
        category: p.category || 'Commodity',
        origin: 'Indonesia', 
        moq: p.moq,
        capacity: p.capacity,
        priceRange: { min: p.price_min, max: p.price_max, currency: 'USD', unit: 'kg' },
        description: p.description,
        longDescription: p.description,
        images: p.images || [],
        certifications: p.certifications || [],
        shippingTime: '14-21 days',
        incoterms: ['FOB Tanjung Priok'],
        compliance: {},
        available: true,
        featured: p.featured,
        tags: [(p.category || '').toLowerCase(), p.name.toLowerCase()]
      }))
    }
  })
}

export const useProductBySlug = (slug) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single()
        
      if (error) throw error
      
      return {
        id: data.id,
        slug: data.slug,
        name: data.name,
        grade: data.grade,
        category: data.category || 'Commodity',
        origin: 'Indonesia',
        moq: data.moq,
        capacity: data.capacity,
        priceRange: { min: data.price_min, max: data.price_max, currency: 'USD', unit: 'kg' },
        description: data.description,
        longDescription: data.description,
        images: data.images || [],
        certifications: data.certifications || [],
        shippingTime: '14-21 days',
        incoterms: ['FOB Tanjung Priok'],
        compliance: {},
        available: true,
        featured: data.featured,
        tags: []
      }
    },
    enabled: !!slug
  })
}

// ─── ADMIN: UMKM & RFQs ───────────────────────────────────────────────────
export const useUMKM = () => {
  return useQuery({
    queryKey: ['umkm'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('umkm')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      
      return data.map(u => ({
        id: u.id,
        name: u.name,
        location: u.location,
        grade: u.grade,
        capacity: u.capacity,
        status: u.status
      }))
    }
  })
}

export const useRFQs = () => {
  return useQuery({
    queryKey: ['rfqs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rfqs')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      
      return data.map(r => ({
        id: r.ref_code,
        company: r.company,
        country: r.country,
        email: r.email,
        product: r.product_slug,
        quantity: r.quantity,
        grade: r.grade,
        deliveryDate: r.delivery_date,
        status: r.status,
        createdAt: r.created_at,
        notes: r.notes
      }))
    }
  })
}

export const useSubmitRFQ = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (rfqData) => {
      // Create unique ref code e.g., XPR-2024-ABC
      const refCode = `XPR-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      
      const payload = {
        ref_code: refCode,
        company: rfqData.company,
        country: rfqData.country,
        email: rfqData.email,
        product_slug: rfqData.productSlug,
        quantity: Number(rfqData.quantity),
        grade: rfqData.grade,
        delivery_date: rfqData.deliveryDate,
        notes: rfqData.notes,
        status: 'new'
      }

      const { data, error } = await supabase.from('rfqs').insert([payload]).select()
      if (error) throw error
      return data[0]
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rfqs'] })
    }
  })
}
