'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
  targetDate: Date
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - Date.now()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center border border-border bg-surface px-3 py-2 font-body text-xl font-bold tabular-nums text-text-primary">
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-1 text-[10px] uppercase tracking-widest text-text-muted">
        {label}
      </span>
    </div>
  )
}

export default function CountdownTimer({
  targetDate,
  className,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate)
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-lg font-bold text-fnk">:</span>
      <TimeUnit value={timeLeft.hours} label="Hrs" />
      <span className="text-lg font-bold text-fnk">:</span>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <span className="text-lg font-bold text-fnk">:</span>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  )
}
