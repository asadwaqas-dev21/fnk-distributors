'use client'

import { useState } from 'react'
import { Minus, Plus, Heart, Share2, ShieldCheck, Undo2, Truck } from 'lucide-react'
import { toast } from 'sonner'
import { cn, formatPrice, getDiscountPercentage } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import type { Product, Review } from '@/types/product'

interface ProductInfoProps {
  product: Product
  reviews: Review[]
}

export default function ProductInfo({ product, reviews }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0] || '/images/placeholder.jpg',
      price: product.price,
      comparePrice: product.comparePrice ?? undefined,
      quantity,
    })
    openCart()
    toast.success(`${product.name} added to cart`)
  }

  const category = product.categoryId.replace('cat-', '')
  const discount = product.comparePrice
    ? getDiscountPercentage(product.price, product.comparePrice)
    : null

  return (
    <div className="space-y-6">
      {/* Category Tag */}
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-volt">
        {category}
      </span>

      {/* Product Name */}
      <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'text-sm',
                i < Math.floor(product.rating) ? 'text-volt' : 'text-muted'
              )}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-text-secondary">
          {product.rating} · {product.reviewCount} reviews
        </span>
      </div>

      {/* Price Block */}
      <div className="flex items-center gap-3">
        <span className="font-body text-3xl font-bold tabular-nums text-fnk">
          {formatPrice(product.price)}
        </span>
        {product.comparePrice && (
          <>
            <span className="text-lg tabular-nums text-text-muted line-through">
              {formatPrice(product.comparePrice)}
            </span>
            <Badge variant="sale" salePercent={discount ?? 0} />
          </>
        )}
      </div>

      {/* Short Description */}
      <p className="text-sm leading-relaxed text-text-secondary">
        {product.shortDesc}
      </p>

      {/* Quantity Picker */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
          Quantity
        </label>
        <div className="flex items-center border border-border w-fit">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-11 w-11 items-center justify-center text-text-muted transition-colors hover:text-text-primary"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="flex h-11 w-14 items-center justify-center border-x border-border text-sm font-semibold tabular-nums text-text-primary">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-11 w-11 items-center justify-center text-text-muted transition-colors hover:text-text-primary"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex gap-3">
        <Button
          variant="primary"
          size="lg"
          className="flex-1 animate-glow-pulse"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <button
          className="flex h-[52px] w-[52px] items-center justify-center border border-border text-text-secondary transition-all hover:border-fnk hover:text-fnk"
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5" />
        </button>
        <button
          className="flex h-[52px] w-[52px] items-center justify-center border border-border text-text-secondary transition-all hover:border-fnk hover:text-fnk"
          aria-label="Share"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            toast.success('Link copied to clipboard')
          }}
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* Stock Status */}
      {product.inStock && product.stockCount < 20 && (
        <p className="text-xs text-fnk">
          🔥 Only {product.stockCount} left in stock — order soon!
        </p>
      )}

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-4 border-t border-border pt-6">
        <div className="flex items-center gap-2 text-text-muted">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-xs">Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <Undo2 className="h-4 w-4" />
          <span className="text-xs">Free Returns</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <Truck className="h-4 w-4" />
          <span className="text-xs">Fast Shipping</span>
        </div>
      </div>
    </div>
  )
}
