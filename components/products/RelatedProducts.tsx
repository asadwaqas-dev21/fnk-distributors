import SectionLabel from '@/components/ui/SectionLabel'
import ProductCard from '@/components/products/ProductCard'
import type { Product } from '@/types/product'

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="border-t border-border py-16">
      <SectionLabel className="mb-10">You Might Also Like</SectionLabel>
      <div className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
        {products.map((product) => (
          <div key={product.id} className="w-[260px] shrink-0 lg:w-[300px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}
