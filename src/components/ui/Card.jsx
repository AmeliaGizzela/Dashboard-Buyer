import { cn } from '../../lib/utils'

/**
 * Card — base card wrapper
 */
export function Card({ children, hover = false, className, ...props }) {
  return (
    <div className={cn(hover ? 'card-hover' : 'card', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * CardBody — padded content area inside a Card
 */
export function CardBody({ children, className }) {
  return <div className={cn('card-body', className)}>{children}</div>
}

/**
 * CardHeader — optional header with title + optional action
 */
export function CardHeader({ title, subtitle, action, className }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 card-body pb-0', className)}>
      <div>
        {title && <h3 className="font-display font-semibold text-dark-900 text-base">{title}</h3>}
        {subtitle && <p className="text-sm text-dark-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}

/**
 * StatCard — KPI / metric display card
 */
export function StatCard({ label, value, delta, icon: Icon, color = 'brand', className }) {
  const colorMap = {
    brand: 'bg-brand-100 text-brand-600',
    gold:  'bg-gold-100  text-gold-600',
    blue:  'bg-blue-100  text-blue-600',
    red:   'bg-red-100   text-red-600',
  }
  return (
    <Card className={cn('', className)}>
      <CardBody>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-dark-500 font-medium">{label}</p>
            <p className="text-2xl font-display font-bold text-dark-900 mt-1">{value}</p>
            {delta && (
              <p className="text-xs text-dark-400 mt-1">{delta}</p>
            )}
          </div>
          {Icon && (
            <div className={cn('p-3 rounded-xl', colorMap[color])}>
              <Icon size={20} />
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
