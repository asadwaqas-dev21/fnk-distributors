'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import ProductCard from './ProductCard'
import type { Product } from '@/types/product'

interface ProductGridProps {
  products: Product[]
  className?: string
  columns?: 2 | 3 | 4
}

export default function ProductGrid({
  products,
  className,
  columns = 3,
}: ProductGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamic import GSAP only on client
    const initGSAP = async () => {
      try {
        const gsapModule = await import('gsap')
        const scrollTriggerModule = await import('gsap/ScrollTrigger')
        const gsap = gsapModule.default
        gsap.registerPlugin(scrollTriggerModule.ScrollTrigger)

        if (!gridRef.current) return

        const cards = gridRef.current.querySelectorAll('.product-card-item')
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        })
      } catch {
        // GSAP not available, graceful fallback
      }
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (!prefersReducedMotion) {
      initGSAP()
    }
  }, [products])

  const colClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div
      ref={gridRef}
      className={cn('grid gap-6 lg:gap-8', colClasses[columns], className)}
    >
      {products.map((product, index) => (
        <div key={product.id} className="product-card-item">
          <ProductCard product={product} index={index} />
        </div>
      ))}
    </div>
  )
}
