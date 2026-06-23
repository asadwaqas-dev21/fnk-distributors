import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
}

export default function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm bg-surface',
        'after:absolute after:inset-0',
        'after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent',
        'after:animate-shimmer after:bg-[length:200%_100%]',
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[4/5] w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-5 w-1/3" />
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <Skeleton className="aspect-square w-full" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="mt-6 h-20 w-full" />
        <Skeleton className="mt-4 h-12 w-full" />
      </div>
    </div>
  )
}
