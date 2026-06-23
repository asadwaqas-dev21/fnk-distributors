import type { Metadata } from 'next'
import { Syne, Space_Grotesk } from 'next/font/google'
import { Toaster } from 'sonner'
import LenisProvider from '@/components/providers/LenisProvider'
import CartProvider from '@/components/providers/CartProvider'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'FNK Distributors — Distribute the Extraordinary',
    template: '%s | FNK Distributors',
  },
  description:
    'Premium viral-first product distribution. Discover extraordinary electronics, lifestyle essentials, and accessories. Supreme meets modern e-commerce.',
  keywords: [
    'FNK Distributors',
    'premium products',
    'electronics',
    'lifestyle',
    'accessories',
    'viral products',
    'trending',
  ],
  authors: [{ name: 'FNK Distributors' }],
  creator: 'FNK Distributors',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FNK Distributors',
    title: 'FNK Distributors — Distribute the Extraordinary',
    description:
      'Premium viral-first product distribution. Discover extraordinary electronics, lifestyle essentials, and accessories.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FNK Distributors — Distribute the Extraordinary',
    description:
      'Premium viral-first product distribution. Supreme meets modern e-commerce.',
  },
  other: {
    'theme-color': '#050507',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen bg-void font-body text-text-primary antialiased">
        <LenisProvider>
          <CartProvider>
            {/* Noise texture overlay */}
            <div className="noise-overlay" aria-hidden="true" />
            {children}
          </CartProvider>
        </LenisProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0D0D12',
              border: '1px solid #1C1C26',
              color: '#F0F0F5',
              fontFamily: 'var(--font-space-grotesk)',
            },
          }}
        />
      </body>
    </html>
  )
}
