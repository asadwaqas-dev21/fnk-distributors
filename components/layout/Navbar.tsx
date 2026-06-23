'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Search, User, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { NAV_LINKS, CATEGORY_LINKS } from '@/lib/constants'
import MobileMenu from '@/components/layout/MobileMenu'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoryHover, setCategoryHover] = useState(false)
  const [mounted, setMounted] = useState(false)
  const totalItems = useCartStore((s) => s.totalItems())
  const toggleCart = useCartStore((s) => s.toggleCart)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 w-full shadow-sm">
        {/* Tier 1: Top Bar (Logo, Search, Actions) */}
        <div className="bg-surface border-b border-border">
          <div className="mx-auto flex h-20 max-w-container items-center justify-between gap-6 px-4 lg:px-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center transition-opacity hover:opacity-80"
            >
              <Image
                src="/logo.png"
                alt="FNK Distributors Logo"
                width={180}
                height={60}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden flex-1 max-w-2xl items-center lg:flex">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products, brands, or categories..."
                  className="w-full border border-border bg-void py-3 pl-4 pr-12 text-sm text-text-primary placeholder:text-text-muted focus:border-fnk focus:outline-none"
                />
                <button
                  className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-text-muted transition-colors hover:text-fnk"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden shrink-0 items-center gap-6 lg:flex">
              <Link
                href="/login"
                className="flex items-center gap-2 text-text-secondary transition-colors hover:text-fnk"
              >
                <User className="h-5 w-5" />
                <span className="text-sm font-semibold">My Account</span>
              </Link>
              <button
                onClick={toggleCart}
                className="group flex items-center gap-2 text-text-secondary transition-colors hover:text-fnk"
              >
                <div className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  <AnimatePresence>
                    {mounted && totalItems > 0 && (
                      <motion.span
                        key={totalItems}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-fnk text-[10px] font-bold text-white group-hover:bg-fnk-dim"
                      >
                        {totalItems > 9 ? '9+' : totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-sm font-semibold">Cart</span>
              </button>
            </div>

            {/* Mobile Toggles */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={toggleCart}
                className="relative p-2 text-text-secondary transition-colors hover:text-fnk"
              >
                <ShoppingBag className="h-5 w-5" />
                <AnimatePresence>
                  {mounted && totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-0 -top-0 flex h-4 w-4 items-center justify-center rounded-full bg-fnk text-[10px] font-bold text-white"
                    >
                      {totalItems > 9 ? '9+' : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 text-text-secondary transition-colors hover:text-fnk"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Tier 2: Navigation Bar (Blue) */}
        <nav className="hidden bg-volt lg:block">
          <div className="mx-auto flex h-14 max-w-container items-center px-4 lg:px-8">
            <div className="flex h-full items-center gap-8">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="flex h-full items-center relative"
                  onMouseEnter={() =>
                    'hasDropdown' in link && setCategoryHover(true)
                  }
                  onMouseLeave={() =>
                    'hasDropdown' in link && setCategoryHover(false)
                  }
                >
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-white/90 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {'hasDropdown' in link && (
                    <AnimatePresence>
                      {categoryHover && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full pt-0 z-50"
                        >
                          <div className="w-[400px] border border-border bg-surface p-6 shadow-xl">
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-fnk">
                              / Browse Categories
                            </p>
                            <div className="grid grid-cols-1 gap-3">
                              {CATEGORY_LINKS.map((cat) => (
                                <Link
                                  key={cat.label}
                                  href={cat.href}
                                  className="group flex items-center gap-4 rounded-none border border-transparent p-3 transition-all hover:bg-void"
                                >
                                  <div>
                                    <p className="font-display text-sm font-bold text-text-primary">
                                      {cat.label}
                                    </p>
                                    <p className="text-xs text-text-muted">
                                      {cat.description}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
