import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import Link from 'next/link'
import { Suspense } from 'react'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our full catalog of premium electronics, lifestyle essentials, and accessories. Find the extraordinary.',
}

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen pt-40">
        <div className="mx-auto max-w-container px-4 py-8 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="transition-colors hover:text-text-secondary">
              Home
            </Link>
            <span>/</span>
            <span className="text-text-secondary">All Products</span>
          </nav>

          <Suspense fallback={<div className="py-20 text-center text-sm text-text-muted">Loading products...</div>}>
            <ProductsClient />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
