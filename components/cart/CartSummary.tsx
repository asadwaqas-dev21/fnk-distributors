import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

interface CartSummaryProps {
  subtotal: number
  shipping?: number
  discount?: number
}

export default function CartSummary({
  subtotal,
  shipping = 0,
  discount = 0,
}: CartSummaryProps) {
  const total = subtotal + shipping - discount

  return (
    <div className="border border-border bg-surface p-6">
      <h3 className="mb-6 font-display text-lg font-bold text-text-primary">
        Order Summary
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Subtotal</span>
          <span className="text-sm font-semibold tabular-nums text-text-primary">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Shipping</span>
          <span className="text-sm font-semibold tabular-nums text-text-primary">
            {shipping === 0 ? (
              <span className="text-volt">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Discount</span>
            <span className="text-sm font-semibold tabular-nums text-volt">
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="font-display text-base font-bold text-text-primary">
              Total
            </span>
            <span className="font-body text-xl font-bold tabular-nums text-text-primary">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Link href="/checkout" className="block">
          <Button variant="primary" className="w-full animate-glow-pulse">
            Proceed to Checkout
          </Button>
        </Link>
        <p className="text-center text-xs text-text-muted">
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  )
}
