'use client'

import { type ReactNode } from 'react'

interface CartProviderProps {
  children: ReactNode
}

export default function CartProvider({ children }: CartProviderProps) {
  // Zustand hydration happens automatically via persist middleware.
  // This provider exists as a boundary for cart-related context if needed later.
  return <>{children}</>
}
