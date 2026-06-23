export const SITE_CONFIG = {
  name: 'FNK Distributors',
  tagline: 'Distribute the Extraordinary.',
  description: 'Premium viral-first product distribution. Supreme meets modern e-commerce — dark, electric, high-energy.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Categories', href: '/products', hasDropdown: true },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export const CATEGORY_LINKS = [
  { label: 'Electronics', href: '/categories/electronics', description: 'Next-gen tech and gadgets' },
  { label: 'Lifestyle', href: '/categories/lifestyle', description: 'Premium lifestyle essentials' },
  { label: 'Accessories', href: '/categories/accessories', description: 'Statement pieces and gear' },
] as const

export const FOOTER_LINKS = {
  shop: [
    { label: 'All Products', href: '/products' },
    { label: 'New Arrivals', href: '/products?filter=new' },
    { label: 'Trending', href: '/products?filter=trending' },
    { label: 'Sale', href: '/products?filter=sale' },
  ],
  company: [
    { label: 'About FNK', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Careers', href: '/about#careers' },
  ],
  support: [
    { label: 'Shipping Info', href: '/contact' },
    { label: 'Returns & Exchanges', href: '/contact' },
    { label: 'FAQ', href: '/contact' },
    { label: 'Track Order', href: '/account' },
  ],
} as const

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/fnkdistributors', icon: 'instagram' },
  { label: 'Twitter / X', href: 'https://x.com/fnkdistributors', icon: 'twitter' },
  { label: 'TikTok', href: 'https://tiktok.com/@fnkdistributors', icon: 'tiktok' },
  { label: 'YouTube', href: 'https://youtube.com/@fnkdistributors', icon: 'youtube' },
] as const

export const MARQUEE_ITEMS = [
  'FREE SHIPPING OVER $50',
  'NEW DROPS EVERY WEEK',
  'FNK QUALITY GUARANTEED',
  'DISTRIBUTE THE EXTRAORDINARY',
  'JOIN 50K+ HAPPY CUSTOMERS',
] as const

export const STATS = [
  { label: 'Products', value: 10000, suffix: '+', prefix: '' },
  { label: 'Orders Shipped', value: 50000, suffix: '+', prefix: '' },
  { label: 'Avg. Rating', value: 4.9, suffix: '★', prefix: '' },
  { label: 'Support', value: 24, suffix: '/7', prefix: '' },
] as const

export const TRUST_BADGES = [
  { label: 'Secure Checkout', icon: 'shield-check' },
  { label: 'Free Returns', icon: 'undo-2' },
  { label: 'Fast Shipping', icon: 'truck' },
] as const
