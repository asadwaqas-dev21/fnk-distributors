'use client'

import { useRef } from 'react'
import { Eye } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import ProductCard from '@/components/products/ProductCard'
import Badge from '@/components/ui/Badge'
import type { Product } from '@/types/product'

interface TrendingSectionProps {
  products: Product[]
}

export default function TrendingSection({ products }: TrendingSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Generate fake view counts
  const viewCounts = [2300, 1800, 3100, 1500, 2700, 1200]

  return (
    <section className="py-20">
      <div className="mx-auto max-w-container px-4 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <SectionLabel>Trending Now</SectionLabel>
          <Badge variant="hot">Live</Badge>
        </div>
      </div>

      {/* Horizontal Scroll Strip */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 pb-4 scrollbar-hide lg:mx-auto lg:max-w-container lg:px-8"
        style={{ scrollbarWidth: 'none' }}
      >
        {products.map((product, i) => (
          <div key={product.id} className="w-[260px] shrink-0 lg:w-[280px]">
            <div className="relative">
              <ProductCard product={product} />
              {/* View Count Badge */}
              <div className="mt-2 flex items-center gap-1 text-text-muted">
                <Eye className="h-3 w-3" />
                <span className="text-xs">
                  {(viewCounts[i % viewCounts.length] / 1000).toFixed(1)}K views today
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
