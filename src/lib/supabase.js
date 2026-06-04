import { createClient } from '@supabase/supabase-js'

// Note: Using import.meta.env.VITE_* instead of process.env.NEXT_PUBLIC_*
// because this is a Vite project, not a Next.js project.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase URL or Anon Key is missing. Please check your .env.local file.')
}

// Client browser (hanya menggunakan anon key)
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)
