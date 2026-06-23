import Link from 'next/link'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center pt-16">
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-volt/10">
            <CheckCircle className="h-10 w-10 text-volt" />
          </div>

          <h1 className="font-display text-3xl font-bold text-text-primary">
            Order Confirmed!
          </h1>
          <p className="mt-3 text-text-secondary">
            Thank you for your order. We&apos;re preparing your extraordinary
            products for shipment. You&apos;ll receive a confirmation email
            shortly.
          </p>

          {/* Order Info */}
          <div className="mt-8 border border-border bg-surface p-6">
            <div className="flex items-center justify-center gap-2 text-text-muted">
              <Package className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Estimated Delivery
              </span>
            </div>
            <p className="mt-2 font-display text-lg font-bold text-text-primary">
              3-5 Business Days
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/products">
              <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Continue Shopping
              </Button>
            </Link>
            <Link href="/account">
              <Button variant="ghost">View Orders</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
