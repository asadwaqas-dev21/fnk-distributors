import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: string
  className?: string
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="text-sm font-bold text-fnk">/</span>
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-fnk">
        {children}
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
    </div>
  )
}
