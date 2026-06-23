'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Button from '@/components/ui/Button'
import { useCartStore } from '@/store/cartStore'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const totalPrice = useCartStore((s) => s.totalPrice())

  const shipping = totalPrice > 50 ? 0 : 9.99

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-container px-4 py-8 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="transition-colors hover:text-text-secondary">
              Home
            </Link>
            <span>/</span>
            <span className="text-text-secondary">Cart</span>
          </nav>

          <h1 className="mb-8 font-display text-3xl font-bold text-text-primary">
            Your Cart
          </h1>

          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <ShoppingBag className="mb-4 h-20 w-20 text-muted" />
              <p className="font-display text-2xl font-bold text-text-primary">
                Your cart is empty
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Looks like you haven&apos;t added anything extraordinary yet.
              </p>
              <Link href="/products" className="mt-6">
                <Button variant="primary">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[65%_35%]">
              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:sticky lg:top-24">
                <CartSummary
                  subtotal={totalPrice}
                  shipping={shipping}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
