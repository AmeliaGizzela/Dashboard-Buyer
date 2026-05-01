import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility: merge Tailwind classes without conflicts
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency in IDR
 */
export function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format weight (kg/ton)
 */
export function formatWeight(kg) {
  if (kg >= 1000) return `${(kg / 1000).toFixed(1)} Ton`
  return `${kg} kg`
}

/**
 * Generate unique RFQ reference code
 */
export function generateRefCode() {
  const prefix = 'XPR'
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${date}-${rand}`
}

/**
 * Truncate text with ellipsis
 */
export function truncate(str, n = 80) {
  return str.length > n ? str.slice(0, n - 1) + '…' : str
}

/**
 * Format date to locale string
 */
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Slugify a string
 */
export function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

/**
 * Build WhatsApp URL
 */
export function buildWhatsAppUrl(phone, message = '') {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encoded}`
}

/**
 * Alias: generateRFQCode — same as generateRefCode
 */
export const generateRFQCode = generateRefCode

