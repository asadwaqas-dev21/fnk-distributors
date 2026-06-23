import { cn } from '@/lib/utils'

type BadgeVariant = 'new' | 'trending' | 'sale' | 'sold-out' | 'hot'

interface BadgeProps {
  variant: BadgeVariant
  children?: React.ReactNode
  className?: string
  salePercent?: number
}

const variantStyles: Record<BadgeVariant, string> = {
  new: 'bg-volt text-white',
  trending: 'bg-fnk text-white',
  sale: 'bg-red-600 text-white',
  'sold-out': 'bg-muted text-text-muted',
  hot: 'bg-gradient-to-r from-fnk to-volt text-white',
}

const variantLabels: Record<BadgeVariant, string> = {
  new: 'NEW',
  trending: '🔥 TRENDING',
  sale: 'SALE',
  'sold-out': 'SOLD OUT',
  hot: '🔥 HOT',
}

export default function Badge({
  variant,
  children,
  className,
  salePercent,
}: BadgeProps) {
  const label =
    variant === 'sale' && salePercent
      ? `SALE ${salePercent}% OFF`
      : variantLabels[variant]

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5',
        'text-[10px] font-bold uppercase tracking-widest',
        'leading-none',
        variantStyles[variant],
        className
      )}
    >
      {children || label}
    </span>
  )
}
