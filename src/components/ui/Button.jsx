import { cn } from '../../lib/utils'
import { Loader2 } from 'lucide-react'

/**
 * Button Component
 *
 * @param {'primary'|'secondary'|'outline'|'ghost'|'dark'} variant
 * @param {'sm'|'md'|'lg'|'xl'} size
 * @param {boolean} loading
 * @param {boolean} fullWidth
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  ...props
}) {
  const variantClass = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    outline:   'btn-outline',
    ghost:     'btn-ghost',
    dark:      'btn-dark',
  }[variant]

  const sizeClass = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
    xl: 'btn-xl',
  }[size]

  return (
    <button
      className={cn(variantClass, sizeClass, fullWidth && 'w-full', className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  )
}
