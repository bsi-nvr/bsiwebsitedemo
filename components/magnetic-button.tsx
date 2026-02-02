"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Spring options for magnet effect
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return

        const { clientX, clientY } = e
        const { height, width, left, top } = ref.current.getBoundingClientRect()

        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)

        x.set(middleX * 0.2)
        y.set(middleY * 0.2)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={cn("inline-block", className)}
        >
            {children}
        </motion.div>
    )
}
