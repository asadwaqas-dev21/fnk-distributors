'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

type Step = 'contact' | 'shipping' | 'review'

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('contact')
  const items = useCartStore((s) => s.items)
  const totalPrice = useCartStore((s) => s.totalPrice())
  const totalItems = useCartStore((s) => s.totalItems())
  const clearCart = useCartStore((s) => s.clearCart)

  const shipping = totalPrice > 50 ? 0 : 9.99
  const total = totalPrice + shipping

  const steps: { key: Step; label: string }[] = [
    { key: 'contact', label: 'Contact' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'review', label: 'Review' },
  ]

  const currentIndex = steps.findIndex((s) => s.key === step)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
          {/* Back Link */}
          <Link
            href="/cart"
            className="mb-6 inline-flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-text-secondary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Cart
          </Link>

          <h1 className="mb-8 font-display text-3xl font-bold text-text-primary">
            Checkout
          </h1>

          {/* Steps */}
          <div className="mb-10 flex items-center gap-4">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center text-xs font-bold ${
                      i < currentIndex
                        ? 'bg-volt text-black'
                        : i === currentIndex
                        ? 'bg-fnk text-white'
                        : 'bg-surface text-text-muted border border-border'
                    }`}
                  >
                    {i < currentIndex ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      i <= currentIndex ? 'text-text-primary' : 'text-text-muted'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`h-px w-12 ${
                      i < currentIndex ? 'bg-volt' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* Form */}
            <div>
              {step === 'contact' && (
                <div className="space-y-4">
                  <h2 className="font-display text-lg font-bold text-text-primary">
                    Contact Information
                  </h2>
                  <Input label="Email" type="email" placeholder="your@email.com" />
                  <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
                  <Button
                    variant="primary"
                    className="mt-4"
                    onClick={() => setStep('shipping')}
                  >
                    Continue to Shipping
                  </Button>
                </div>
              )}

              {step === 'shipping' && (
                <div className="space-y-4">
                  <h2 className="font-display text-lg font-bold text-text-primary">
                    Shipping Address
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="First Name" placeholder="John" />
                    <Input label="Last Name" placeholder="Doe" />
                  </div>
                  <Input label="Address" placeholder="123 Street" />
                  <Input label="Apartment / Suite" placeholder="Apt 4B (optional)" />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Input label="City" placeholder="New York" />
                    <Input label="State" placeholder="NY" />
                    <Input label="ZIP Code" placeholder="10001" />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button variant="ghost" onClick={() => setStep('contact')}>
                      Back
                    </Button>
                    <Button variant="primary" onClick={() => setStep('review')}>
                      Continue to Review
                    </Button>
                  </div>
                </div>
              )}

              {step === 'review' && (
                <div className="space-y-6">
                  <h2 className="font-display text-lg font-bold text-text-primary">
                    Review Your Order
                  </h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b border-border/30 py-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-text-primary">
                            {item.name}
                          </p>
                          <p className="text-xs text-text-muted">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-semibold tabular-nums text-text-primary">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="ghost" onClick={() => setStep('shipping')}>
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-1 animate-glow-pulse"
                      onClick={() => {
                        // Clear the cart when order is placed
                        clearCart()
                        // In production: redirect to Stripe Checkout
                        window.location.href = '/checkout/success'
                      }}
                    >
                      Place Order — {formatPrice(total)}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="border border-border bg-surface p-6 h-fit lg:sticky lg:top-24">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-volt">
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Items ({totalItems})</span>
                  <span className="text-text-primary tabular-nums">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Shipping</span>
                  <span className="text-text-primary tabular-nums">
                    {shipping === 0 ? (
                      <span className="text-volt">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="border-t border-border pt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-text-primary">Total</span>
                    <span className="text-lg font-bold tabular-nums text-text-primary">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
