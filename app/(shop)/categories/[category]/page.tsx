import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import ProductGrid from '@/components/products/ProductGrid'
import SectionLabel from '@/components/ui/SectionLabel'
import { getCategoryBySlug, getProductsByCategory, categories } from '@/lib/mock-data'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: category.name,
    description: category.description,
  }
}

export function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const categoryProducts = getProductsByCategory(category.id)

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
            <Link href="/products" className="transition-colors hover:text-text-secondary">
              Products
            </Link>
            <span>/</span>
            <span className="text-text-secondary">{category.name}</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <SectionLabel>{category.name}</SectionLabel>
            <p className="mt-3 max-w-lg text-sm text-text-secondary">
              {category.description}
            </p>
            <p className="mt-1 text-xs text-text-muted">
              {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Products */}
          {categoryProducts.length > 0 ? (
            <ProductGrid products={categoryProducts} columns={3} />
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <p className="font-display text-2xl font-bold text-text-primary">
                No products in this category yet
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                New drops coming soon. Stay tuned.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
