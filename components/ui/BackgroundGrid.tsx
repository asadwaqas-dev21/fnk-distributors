import { cn } from '@/lib/utils'

interface BackgroundGridProps {
  className?: string
}

export default function BackgroundGrid({ className }: BackgroundGridProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 grid-bg opacity-100',
        className
      )}
      aria-hidden="true"
    />
  )
}
