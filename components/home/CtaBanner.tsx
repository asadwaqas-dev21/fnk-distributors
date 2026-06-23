'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { toast } from 'sonner'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import BackgroundGrid from '@/components/ui/BackgroundGrid'

export default function CtaBanner() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    // Simulate subscription
    await new Promise((r) => setTimeout(r, 1000))
    toast.success('Welcome to FNK! You\'re on the list.')
    setEmail('')
    setLoading(false)
  }

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-brand opacity-10" aria-hidden="true" />
      <BackgroundGrid />

      {/* Gradient Orbs */}
      <div
        className="absolute left-1/3 top-0 h-[400px] w-[600px] rounded-full opacity-15 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #FF3C00 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          New Drops Every Week.
          <br />
          <span className="text-gradient-brand">Be First.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-text-secondary">
          Join 50,000+ insiders who get early access to new products, exclusive
          deals, and behind-the-scenes content.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            rightIcon={<Send className="h-4 w-4" />}
          >
            Join The Drop
          </Button>
        </form>

        <p className="mt-3 text-xs text-text-muted">
          No spam. Unsubscribe anytime. That&apos;s an FNK promise.
        </p>
      </div>
    </section>
  )
}
