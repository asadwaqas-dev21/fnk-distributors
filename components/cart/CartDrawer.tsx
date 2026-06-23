'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import CartItem from '@/components/cart/CartItem'
import Button from '@/components/ui/Button'

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const totalPrice = useCartStore((s) => s.totalPrice())
  const totalItems = useCartStore((s) => s.totalItems())

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 right-0 top-0 z-[80] flex w-full max-w-md flex-col border-l border-border bg-void"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-fnk" />
                <h2 className="font-display text-lg font-bold text-text-primary">
                  Your Cart
                </h2>
                <span className="flex h-5 min-w-[20px] items-center justify-center bg-fnk px-1.5 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-1 text-text-muted transition-colors hover:text-text-primary"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <ShoppingBag className="mb-4 h-16 w-16 text-muted" />
                  <p className="font-display text-lg font-bold text-text-primary">
                    Your cart is empty
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Add something extraordinary
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeCart}
                    className="mt-6"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Subtotal</span>
                  <span className="font-body text-lg font-bold tabular-nums text-text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="text-xs text-text-muted">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link href="/checkout" onClick={closeCart} className="block">
                  <Button variant="primary" className="w-full animate-glow-pulse">
                    Checkout
                  </Button>
                </Link>
                <Link href="/cart" onClick={closeCart} className="block">
                  <Button variant="ghost" className="w-full">
                    View Full Cart
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
