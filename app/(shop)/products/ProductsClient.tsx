'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import ProductGrid from '@/components/products/ProductGrid'
import SectionLabel from '@/components/ui/SectionLabel'
import Link from 'next/link'
import { products, categories } from '@/lib/mock-data'

export default function ProductsClient() {
  const searchParams = useSearchParams()
  const filterParam = searchParams.get('filter')
  const categoryParam = searchParams.get('category')
  const sortParam = searchParams.get('sort') || 'newest'

  // Filter products
  let filteredProducts = [...products]

  if (filterParam === 'new') {
    filteredProducts = filteredProducts.filter((p) => p.isNew)
  } else if (filterParam === 'trending') {
    filteredProducts = filteredProducts.filter((p) => p.isTrending)
  } else if (filterParam === 'sale') {
    filteredProducts = filteredProducts.filter((p) => p.comparePrice !== null)
  }

  if (categoryParam) {
    filteredProducts = filteredProducts.filter(
      (p) => p.categoryId === `cat-${categoryParam}`
    )
  }

  // Sort
  if (sortParam === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortParam === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sortParam === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating)
  }

  return (
    <>
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <SectionLabel>All Products</SectionLabel>
          <p className="mt-2 text-sm text-text-muted">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filters */}
          <div className="flex gap-2">
            <Link
              href="/products"
              className={`border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${!categoryParam
                ? 'border-fnk bg-fnk/10 text-fnk'
                : 'border-border text-text-secondary hover:border-text-muted'
                }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className={`border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${categoryParam === cat.slug
                  ? 'border-fnk bg-fnk/10 text-fnk'
                  : 'border-border text-text-secondary hover:border-text-muted'
                  }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Sort */}
          <select
            defaultValue={sortParam}
            onChange={(e) => {
              const url = new URL(window.location.href)
              url.searchParams.set('sort', e.target.value)
              window.history.pushState({}, '', url.toString())
            }}
            className="border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary focus:border-fnk focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} columns={3} />
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="font-display text-2xl font-bold text-text-primary">
            No products found
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            Try adjusting your filters or check back for new drops.
          </p>
          <Link
            href="/products"
            className="mt-6 border border-fnk px-6 py-2 text-xs font-bold uppercase tracking-wider text-fnk transition-colors hover:bg-fnk/10"
          >
            Clear Filters
          </Link>
        </div>
      )}
    </>
  )
}
