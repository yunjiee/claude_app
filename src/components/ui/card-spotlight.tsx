'use client'

import { useRef, useState, MouseEvent, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  color?: string
}

export function CardSpotlight({ children, className = '', color = 'rgba(99,102,241,0.18)' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative ${className}`}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(550px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}
