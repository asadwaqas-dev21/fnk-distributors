'use client'

import { useRef, type ReactNode, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export default function GlowCard({
  children,
  className,
  glowColor = 'rgba(255, 60, 0, 0.4)',
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${glowColor}, transparent 40%)`
  }

  const handleMouseLeave = () => {
    if (!glowRef.current) return
    glowRef.current.style.background = 'transparent'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative overflow-hidden rounded-none border border-border',
        'bg-gradient-card transition-all duration-300',
        className
      )}
    >
      {/* Glow follow effect */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      {/* Gradient top border */}
      <div
        className="absolute left-0 right-0 top-0 z-10 h-px bg-gradient-brand opacity-0 transition-opacity duration-300 group-hover:opacity-60"
        aria-hidden="true"
      />
      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  )
}
