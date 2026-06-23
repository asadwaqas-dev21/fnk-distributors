import MarqueeText from '@/components/ui/MarqueeText'
import { MARQUEE_ITEMS } from '@/lib/constants'

export default function MarqueeBar() {
  return (
    <div className="border-y border-border bg-surface/50 py-2.5">
      <MarqueeText
        items={MARQUEE_ITEMS}
        separator="✦"
        speed="normal"
        className="text-xs font-bold uppercase tracking-[0.15em] text-fnk"
      />
    </div>
  )
}
