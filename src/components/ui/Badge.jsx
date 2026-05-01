import { cn } from '../../lib/utils'

/**
 * Badge Component
 * @param {'green'|'gold'|'gray'|'red'|'blue'} variant
 */
export function Badge({ children, variant = 'green', className }) {
  const cls = {
    green: 'badge-green',
    gold:  'badge-gold',
    gray:  'badge-gray',
    red:   'badge-red',
    blue:  'badge-blue',
  }[variant]

  return (
    <span className={cn(cls, className)}>
      {children}
    </span>
  )
}

/**
 * GradeBadge — maps grade string to badge color automatically
 */
export function GradeBadge({ grade }) {
  const map = {
    'Medium':        { variant: 'gray',  label: 'Medium' },
    'Premium':       { variant: 'gold',  label: 'Premium' },
    'Super Premium': { variant: 'green', label: 'Super Premium' },
  }
  const cfg = map[grade] || { variant: 'gray', label: grade }
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>
}

/**
 * StatusBadge — maps RFQ/order status to badge
 */
export function StatusBadge({ status }) {
  const map = {
    new:          { variant: 'blue',  label: 'New RFQ' },
    reviewing:    { variant: 'gold',  label: 'Reviewing' },
    negotiating:  { variant: 'gold',  label: 'Negotiating' },
    loi:          { variant: 'green', label: 'LoI Signed' },
    dp_received:  { variant: 'green', label: 'DP Received' },
    executing:    { variant: 'green', label: 'Executing' },
    shipped:      { variant: 'green', label: 'Shipped' },
    completed:    { variant: 'green', label: 'Completed' },
  }
  const cfg = map[status] || { variant: 'gray', label: status }
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>
}
