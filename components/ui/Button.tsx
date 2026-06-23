import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type ButtonVariant = 'primary' | 'volt' | 'ghost' | 'dark'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-fnk text-white shadow-fnk-glow hover:bg-fnk-dim hover:shadow-fnk-glow-lg active:scale-[0.98]',
  volt:
    'bg-volt text-white hover:bg-volt-dim active:scale-[0.98]',
  ghost:
    'bg-transparent border border-fnk text-fnk hover:bg-fnk/10 active:scale-[0.98]',
  dark:
    'bg-surface border border-border text-text-primary hover:bg-muted active:scale-[0.98]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles — square corners per brand identity
          'relative inline-flex items-center justify-center gap-2 rounded-none font-body font-semibold uppercase tracking-wider',
          'transition-all duration-200 ease-out',
          'hover:-translate-y-0.5',
          'disabled:pointer-events-none disabled:opacity-50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fnk focus-visible:ring-offset-2 focus-visible:ring-offset-void',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
