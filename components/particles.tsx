"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
}

import { cn } from "@/lib/utils"

interface ParticlesProps {
    className?: string
}

export function Particles({ className }: ParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { resolvedTheme } = useTheme()
    const mouseRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        // Don't run on mobile to save resources
        if (window.innerWidth < 768) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []

        // Configuration
        const particleCount = 60
        const connectionDistance = 150
        const mouseSafetyRadius = 200

        // Initialize particles
        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initParticles()
        }

        const initParticles = () => {
            particles = []
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                })
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const isDark = resolvedTheme === "dark"
            const particleColor = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
            const lineColor = isDark ? "rgba(255, 255, 255," : "rgba(0, 0, 0,"

            // Update and draw particles
            particles.forEach((p, i) => {
                // Move
                p.x += p.vx
                p.y += p.vy

                // Bounce off edges
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1

                // Draw particle
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = particleColor
                ctx.fill()

                // Connect to nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        const opacity = 1 - distance / connectionDistance
                        ctx.beginPath()
                        ctx.strokeStyle = `${lineColor}${opacity * 0.2})`
                        ctx.lineWidth = 1
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                }

                // Connect to mouse
                const dx = p.x - mouseRef.current.x
                const dy = p.y - mouseRef.current.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouseSafetyRadius) {
                    const opacity = 1 - distance / mouseSafetyRadius
                    ctx.beginPath()
                    ctx.strokeStyle = `${lineColor}${opacity * 0.3})`
                    ctx.lineWidth = 1
                    ctx.moveTo(p.x, p.y)
                    ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
                    ctx.stroke()
                }
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        const handleMouseMove = (e: MouseEvent) => {
            // Update mouse pos relative to canvas
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }

        window.addEventListener("resize", resize)
        window.addEventListener("mousemove", handleMouseMove)
        resize()
        animate()

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [resolvedTheme])

    return (
        <canvas
            ref={canvasRef}
            className={cn("absolute inset-0 z-0 pointer-events-none", className)}
            style={{ opacity: 0.8 }}
        />
    )
}
