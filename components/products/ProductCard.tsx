'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Heart, Plus } from 'lucide-react'
import { cn, formatPrice, getDiscountPercentage } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import Badge from '@/components/ui/Badge'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  className?: string
  index?: number
}

export default function ProductCard({
  product,
  className,
  index = 0,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 400,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 400,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0] || '/images/placeholder.jpg',
      price: product.price,
      comparePrice: product.comparePrice ?? undefined,
      quantity: 1,
    })
    openCart()
  }

  // Determine badge
  const getBadge = () => {
    if (!product.inStock) return <Badge variant="sold-out" />
    if (product.comparePrice) {
      const discount = getDiscountPercentage(product.price, product.comparePrice)
      return <Badge variant="sale" salePercent={discount} />
    }
    if (product.isTrending) return <Badge variant="trending" />
    if (product.isNew) return <Badge variant="new" />
    return null
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      className={cn('group', className)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          {/* Primary Image */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-void/20">
            <div className="flex h-full w-full items-center justify-center bg-gradient-card">
              <span className="font-display text-6xl font-bold text-volt/10">
                FNK
              </span>
            </div>
          </div>

          {/* Second Image on Hover (crossfade) */}
          {product.images.length > 1 && (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="flex h-full w-full items-center justify-center bg-surface">
                <span className="font-display text-6xl font-bold text-volt/5">
                  FNK
                </span>
              </div>
            </div>
          )}

          {/* Badge */}
          <div className="absolute left-3 top-3 z-10">{getBadge()}</div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-void/50 text-text-secondary opacity-0 backdrop-blur-sm transition-all duration-200 hover:text-fnk group-hover:opacity-100"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </button>

          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
            <button
              onClick={handleQuickAdd}
              disabled={!product.inStock}
              className="flex w-full items-center justify-center gap-2 bg-fnk py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-fnk-dim disabled:bg-muted disabled:text-text-muted"
            >
              <Plus className="h-3.5 w-3.5" />
              Quick Add
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-3 space-y-1.5">
          <h3 className="truncate font-display text-sm font-bold text-text-primary transition-colors group-hover:text-fnk">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    'text-xs',
                    i < Math.floor(product.rating)
                      ? 'text-volt'
                      : 'text-muted'
                  )}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-text-muted">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-body text-lg font-bold tabular-nums text-text-primary">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-sm tabular-nums text-text-muted line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
