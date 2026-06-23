'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const menuVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
}

const linkVariants = {
  closed: { opacity: 0, x: -30 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex flex-col bg-void"
        >
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/" onClick={onClose}>
              <Image 
                src="/logo.png" 
                alt="FNK Distributors Logo" 
                width={140} 
                height={40} 
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary transition-colors hover:text-text-primary"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-1 flex-col justify-center px-8">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                variants={linkVariants}
                initial="closed"
                animate="open"
                custom={i}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block border-b border-border/30 py-5 font-display text-3xl font-bold uppercase tracking-wider text-text-primary transition-colors hover:text-fnk"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Social Links */}
          <div className="border-t border-border/30 px-8 py-6">
            <div className="flex gap-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium uppercase tracking-wider text-text-muted transition-colors hover:text-fnk"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
