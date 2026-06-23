import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium uppercase tracking-wider text-text-secondary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-none border bg-surface px-4 py-3 font-body text-sm text-text-primary',
            'placeholder:text-text-muted',
            'transition-all duration-200',
            'focus:outline-none',
            error
              ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)] focus:border-red-400 focus:shadow-[0_0_30px_rgba(239,68,68,0.3)]'
              : 'border-border focus:border-fnk focus:shadow-[0_0_20px_rgba(255,60,0,0.15)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-text-muted">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
