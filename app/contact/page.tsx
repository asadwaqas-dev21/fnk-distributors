'use client'

import { useState } from 'react'
import { Mail, MapPin, Clock, Send, Phone } from 'lucide-react'
import { toast } from 'sonner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import SectionLabel from '@/components/ui/SectionLabel'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    toast.success('Message sent! We\'ll get back to you within 24 hours.')
    setLoading(false)
  }

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-container px-4 py-8 lg:px-8">
          <SectionLabel className="mb-6">Contact Us</SectionLabel>
          <h1 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
            Let&apos;s Talk
          </h1>
          <p className="mt-2 max-w-lg text-sm text-text-secondary">
            Have a question, feedback, or partnership inquiry? We&apos;d love to
            hear from you.
          </p>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_400px]">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Name" placeholder="Your name" required />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <Input label="Subject" placeholder="How can we help?" required />
              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-wider text-text-secondary">
                  Message
                </label>
                <textarea
                  rows={6}
                  placeholder="Tell us more..."
                  required
                  className="w-full border border-border bg-surface px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:border-fnk focus:shadow-[0_0_20px_rgba(255,60,0,0.15)] focus:outline-none"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                rightIcon={<Send className="h-4 w-4" />}
              >
                Send Message
              </Button>
            </form>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="border border-border bg-surface p-6">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-volt">
                  / Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-fnk" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        Phone
                      </p>
                      <p className="text-sm text-text-secondary">
                        (512) 543-0353
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-fnk" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        Email
                      </p>
                      <p className="text-sm text-text-secondary">
                        info@fnkdistributors.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-fnk" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        Address
                      </p>
                      <p className="text-sm text-text-secondary">
                        5900 Balcones DR#, 27064 Austin Texas 78731
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 text-fnk" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        Response Time
                      </p>
                      <p className="text-sm text-text-secondary">
                        Within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-border bg-surface p-6">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-volt">
                  / FAQ
                </h3>
                <div className="space-y-3">
                  {[
                    { q: 'What is your return policy?', a: '30-day hassle-free returns on all products.' },
                    { q: 'How long does shipping take?', a: '3-5 business days for standard, 1-2 for express.' },
                    { q: 'Do you ship internationally?', a: 'Yes! We ship to 50+ countries worldwide.' },
                  ].map((faq) => (
                    <div key={faq.q} className="border-b border-border/30 pb-3">
                      <p className="text-sm font-semibold text-text-primary">
                        {faq.q}
                      </p>
                      <p className="mt-1 text-xs text-text-secondary">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
