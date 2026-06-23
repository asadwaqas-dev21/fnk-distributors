import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import ProductInfo from '@/components/products/ProductInfo'
import RelatedProducts from '@/components/products/RelatedProducts'
import { getProductBySlug, getRelatedProducts, getProductReviews, products } from '@/lib/mock-data'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.name,
    description: product.shortDesc,
    openGraph: {
      title: product.name,
      description: product.shortDesc,
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const related = getRelatedProducts(product)
  const reviews = getProductReviews(product.id)

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-container px-4 py-8 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="transition-colors hover:text-text-secondary">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="transition-colors hover:text-text-secondary">
              Products
            </Link>
            <span>/</span>
            <span className="text-text-secondary">{product.name}</span>
          </nav>

          {/* Product Layout */}
          <div className="grid gap-10 lg:grid-cols-[55%_45%]">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden border border-border bg-surface">
                <div className="flex h-full w-full items-center justify-center bg-gradient-card">
                  <span className="font-display text-[120px] font-bold text-border/20">
                    FNK
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <button
                    key={i}
                    className={`aspect-square w-20 border bg-surface ${
                      i === 1
                        ? 'border-fnk'
                        : 'border-border hover:border-text-muted'
                    } transition-colors`}
                  >
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-display text-lg font-bold text-border/30">
                        {i}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <ProductInfo product={product} reviews={reviews} />
          </div>

          {/* Tabs Section */}
          <div className="mt-16 border-t border-border pt-10">
            <div className="mb-8 flex gap-8 border-b border-border">
              <button className="border-b-2 border-fnk pb-3 text-sm font-semibold text-text-primary">
                Description
              </button>
              <button className="pb-3 text-sm font-semibold text-text-muted transition-colors hover:text-text-secondary">
                Specifications
              </button>
              <button className="pb-3 text-sm font-semibold text-text-muted transition-colors hover:text-text-secondary">
                Reviews ({product.reviewCount})
              </button>
            </div>
            <div className="max-w-3xl">
              <p className="text-sm leading-relaxed text-text-secondary">
                {product.description}
              </p>

              {/* Specs from metadata */}
              {Object.keys(product.metadata).length > 0 && (
                <div className="mt-8 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-volt">
                    Specifications
                  </h3>
                  <div className="grid gap-2">
                    {Object.entries(product.metadata).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between border-b border-border/30 py-2 text-sm"
                      >
                        <span className="capitalize text-text-muted">{key}</span>
                        <span className="text-text-primary">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {reviews.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-volt">
                    Customer Reviews
                  </h3>
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-border bg-surface p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-text-primary">
                            {review.userName}
                          </span>
                          {review.verified && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-volt">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-xs ${
                                i < review.rating ? 'text-volt' : 'text-muted'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-text-primary">
                        {review.title}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">{review.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-8">
            <RelatedProducts products={related} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
