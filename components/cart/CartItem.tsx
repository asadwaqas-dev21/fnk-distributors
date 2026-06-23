'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import type { CartItem as CartItemType } from '@/types/cart'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <div className="flex gap-4 border-b border-border/50 pb-4">
      {/* Image Placeholder */}
      <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-surface">
        <span className="font-display text-lg font-bold text-border">FNK</span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold text-text-primary line-clamp-1">
            {item.name}
          </h4>
          {item.variant && (
            <p className="text-xs text-text-muted">{item.variant}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center border border-border">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex h-7 w-7 items-center justify-center text-text-muted transition-colors hover:text-text-primary"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="flex h-7 w-8 items-center justify-center text-xs font-semibold tabular-nums text-text-primary">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex h-7 w-7 items-center justify-center text-text-muted transition-colors hover:text-text-primary"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price + Remove */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tabular-nums text-text-primary">
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="p-1 text-text-muted transition-colors hover:text-red-400"
              aria-label="Remove item"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
