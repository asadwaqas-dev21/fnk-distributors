import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import HeroSection from '@/components/home/HeroSection'
import MarqueeBar from '@/components/home/MarqueeBar'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import TrendingSection from '@/components/home/TrendingSection'
import StatsCounter from '@/components/home/StatsCounter'
import CtaBanner from '@/components/home/CtaBanner'
import WholesaleBenefits from '@/components/home/WholesaleBenefits'
import {
  getFeaturedProducts,
  getTrendingProducts,
  categories,
} from '@/lib/mock-data'

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const trendingProducts = getTrendingProducts()

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main>
        {/* Hero — Full Viewport */}
        <HeroSection />

        {/* Stats Counter */}
        <StatsCounter />

        {/* Marquee Ticker */}
        <MarqueeBar />

        {/* Featured Products */}
        <FeaturedProducts products={featuredProducts} />

        {/* Categories Bento Grid */}
        <CategoryShowcase categories={categories} />

        {/* Trending Now */}
        <TrendingSection products={trendingProducts} />

        {/* CTA Banner + Newsletter */}
        <CtaBanner />

        {/* Wholesale Benefits */}
        <WholesaleBenefits />
      </main>

      <Footer />
    </>
  )
}
