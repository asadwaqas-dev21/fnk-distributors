import { cn } from '@/lib/utils'

interface MarqueeTextProps {
  items: readonly string[]
  separator?: string
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
  reverse?: boolean
}

const speedMap = {
  slow: 'duration-[45s]',
  normal: 'duration-[30s]',
  fast: 'duration-[15s]',
}

export default function MarqueeText({
  items,
  separator = '✦',
  className,
  speed = 'normal',
  reverse = false,
}: MarqueeTextProps) {
  const text = items.join(` ${separator} `) + ` ${separator} `

  return (
    <div
      className={cn(
        'relative flex overflow-hidden whitespace-nowrap',
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'flex shrink-0 items-center gap-0',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          speedMap[speed]
        )}
        style={{ animationTimingFunction: 'linear' }}
      >
        <span className="shrink-0 px-2">{text}</span>
        <span className="shrink-0 px-2">{text}</span>
      </div>
      <div
        className={cn(
          'flex shrink-0 items-center gap-0',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          speedMap[speed]
        )}
        style={{ animationTimingFunction: 'linear' }}
      >
        <span className="shrink-0 px-2">{text}</span>
        <span className="shrink-0 px-2">{text}</span>
      </div>
    </div>
  )
}
