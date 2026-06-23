'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel'
import type { Category } from '@/types/product'

interface CategoryShowcaseProps {
  categories: Category[]
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  // Bento grid layout: first 2 large, rest small
  const [first, second, ...rest] = categories

  return (
    <section className="mx-auto max-w-container px-4 py-20 lg:px-8">
      <SectionLabel className="mb-10">Browse by Category</SectionLabel>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        {/* Large Card 1 */}
        {first && (
          <CategoryCard
            category={first}
            className="lg:col-span-1 lg:row-span-2"
            large
          />
        )}
        {/* Large Card 2 */}
        {second && (
          <CategoryCard
            category={second}
            className="lg:col-span-1 lg:row-span-2"
            large
          />
        )}
        {/* Small Cards */}
        {rest.map((cat) => (
          <CategoryCard key={cat.id} category={cat} className="lg:col-span-1" />
        ))}
      </div>
    </section>
  )
}

interface CategoryCardProps {
  category: Category
  className?: string
  large?: boolean
}

function CategoryCard({ category, className, large }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        'group relative flex items-end overflow-hidden border border-border',
        large ? 'min-h-[400px]' : 'min-h-[200px]',
        className
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-card transition-transform duration-500 group-hover:scale-105">
        <div className="flex h-full w-full items-center justify-center">
          <span
            className={cn(
              'font-display font-bold text-border/20',
              large ? 'text-8xl' : 'text-5xl'
            )}
          >
            FNK
          </span>
        </div>
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Content */}
      <div className="relative z-10 w-full p-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-volt">
              {category.productCount} Products
            </p>
            <h3
              className={cn(
                'font-display font-bold text-text-primary',
                large ? 'text-3xl' : 'text-xl'
              )}
            >
              {category.name}
            </h3>
            {large && (
              <p className="mt-2 max-w-sm text-sm text-text-secondary">
                {category.description}
              </p>
            )}
          </div>
          <div className="flex h-10 w-10 items-center justify-center border border-border bg-surface/50 text-text-secondary transition-all group-hover:border-fnk group-hover:bg-fnk group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
