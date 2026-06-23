import SectionLabel from '@/components/ui/SectionLabel'
import ProductGrid from '@/components/products/ProductGrid'
import type { Product } from '@/types/product'

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="mx-auto max-w-container px-4 py-20 lg:px-8">
      <SectionLabel className="mb-10">Featured Drops</SectionLabel>
      <ProductGrid products={products.slice(0, 4)} columns={4} />
    </section>
  )
}
