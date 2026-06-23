'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { STATS } from '@/lib/constants'

export default function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      try {
        const gsapModule = await import('gsap')
        const scrollTriggerModule = await import('gsap/ScrollTrigger')
        const gsap = gsapModule.default
        gsap.registerPlugin(scrollTriggerModule.ScrollTrigger)

        if (!sectionRef.current) return

        const counters = sectionRef.current.querySelectorAll('.stat-value')
        counters.forEach((counter, i) => {
          const target = STATS[i]
          if (!target) return

          gsap.from(counter, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
            innerText: 0,
            duration: 2,
            snap: { innerText: target.value >= 100 ? 1 : 0.1 },
            ease: 'power2.out',
          })
        })
      } catch {
        // GSAP not available, numbers show statically
      }
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (!prefersReducedMotion) {
      initGSAP()
    }
  }, [])

  return (
    <section ref={sectionRef} className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-container grid-cols-2 gap-px bg-border lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center bg-surface px-6 py-12 text-center"
          >
            <div className="flex items-baseline gap-0.5">
              <span className="stat-value font-display text-4xl font-extrabold text-text-primary lg:text-5xl">
                {stat.value}
              </span>
              <span className="font-display text-2xl font-bold text-fnk lg:text-3xl">
                {stat.suffix}
              </span>
            </div>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
