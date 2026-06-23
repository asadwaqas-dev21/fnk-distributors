import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Globe, Shield } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import BackgroundGrid from '@/components/ui/BackgroundGrid'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind FNK Distributors — we distribute the extraordinary to people who refuse to settle.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen pt-16">
        {/* Hero */}
        <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
          <BackgroundGrid />
          <div
            className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[120px]"
            style={{ background: 'radial-gradient(circle, #FF3C00 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="relative z-10 px-4 text-center">
            <SectionLabel className="mb-6 justify-center">About FNK</SectionLabel>
            <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              We Distribute
              <br />
              <span className="text-gradient-brand">the Future.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-text-secondary">
              Born from a belief that everyday products should be extraordinary.
              We curate, source, and deliver premium goods that blur the line
              between function and art.
            </p>
          </div>
        </section>

        {/* Origin Story */}
        <section className="mx-auto max-w-container px-4 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionLabel className="mb-6">Our Mission</SectionLabel>
              <h2 className="font-display text-3xl font-bold text-text-primary">
                Strategic Partnerships for Sustainable Growth
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary text-justify">
                At FNK Distributors, we go far beyond simply purchasing and holding inventory — we invest in meaningful, long-term partnerships built on trust, performance, and shared growth. We view every brand relationship as a strategic collaboration, not just a transaction.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary text-justify">
                Our mission is to help brands scale with confidence by providing consistent purchase volume, reliable reordering, and strategic placement across multiple retail channels. Through our strong distribution network and multi-channel expertise, we position products where they perform best maximizing visibility, protecting brand value, and driving sustainable sell-through.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary text-justify">
                We are committed to maintaining brand integrity at every level. From responsible pricing strategies to professional representation across retail and eCommerce platforms, we ensure that your products are marketed and distributed in a way that strengthens your brand equity.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary text-justify">
                When you partner with FNK Distributors, you gain more than a wholesale buyer you gain a growth focused ally dedicated to expanding your market presence, increasing velocity, and building long-term brand stability.
              </p>
              <p className="mt-6 text-base font-bold leading-relaxed text-text-primary">
                Together, we don’t just move products.<br />
                We build stronger, more recognized, and more profitable brands.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[400px] w-full max-w-md border border-border bg-gradient-card">
                <div className="flex h-full items-center justify-center">
                  <span className="font-display text-[100px] font-bold text-border/15">
                    FNK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Stats */}
        <section className="border-y border-border bg-surface py-20">
          <div className="mx-auto max-w-container px-4 lg:px-8">
            <SectionLabel className="mb-10">What Drives Us</SectionLabel>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: 'Innovation First',
                  desc: 'We source products from the bleeding edge of design and technology. If it doesn\'t push boundaries, it doesn\'t make the cut.',
                },
                {
                  icon: Globe,
                  title: 'Global Curation',
                  desc: 'Our team scouts the world for extraordinary products. From Tokyo labs to Stockholm design studios — we find the best.',
                },
                {
                  icon: Shield,
                  title: 'Quality Guaranteed',
                  desc: 'Every product is tested, verified, and backed by our satisfaction guarantee. We stand behind everything we distribute.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border border-border bg-void p-8"
                >
                  <item.icon className="mb-4 h-8 w-8 text-fnk" />
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-container px-4 text-center lg:px-8">
            <h2 className="font-display text-3xl font-bold text-text-primary">
              Join the FNK Movement
            </h2>
            <p className="mt-3 text-text-secondary">
              50,000+ people have already chosen extraordinary.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/products">
                <Button variant="primary" size="lg">
                  Shop Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
