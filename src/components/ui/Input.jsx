import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { AlertCircle } from 'lucide-react'

/**
 * Input — base text input
 */
export const Input = forwardRef(function Input(
  { label, error, hint, className, containerClassName, required, ...props },
  ref
) {
  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label className="label">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        ref={ref}
        className={cn('input', error && 'input-error', className)}
        {...props}
      />
      {hint && !error && <p className="text-xs text-dark-400 mt-1">{hint}</p>}
      {error && (
        <p className="field-error flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
})

/**
 * Textarea
 */
export const Textarea = forwardRef(function Textarea(
  { label, error, hint, className, containerClassName, required, rows = 4, ...props },
  ref
) {
  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label className="label">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn('input resize-none', error && 'input-error', className)}
        {...props}
      />
      {hint && !error && <p className="text-xs text-dark-400 mt-1">{hint}</p>}
      {error && (
        <p className="field-error flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
})

/**
 * Select
 */
export const Select = forwardRef(function Select(
  { label, error, hint, className, containerClassName, required, children, ...props },
  ref
) {
  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label className="label">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={cn('input', error && 'input-error', className)}
        {...props}
      >
        {children}
      </select>
      {hint && !error && <p className="text-xs text-dark-400 mt-1">{hint}</p>}
      {error && (
        <p className="field-error flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
})
