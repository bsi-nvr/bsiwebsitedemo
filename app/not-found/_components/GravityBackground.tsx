"use client"

import React, { useEffect, useRef, useState } from 'react'

interface Orb {
    id: number
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    color: string
}

export function GravityBackground() {
    const [orbs, setOrbs] = useState<Orb[]>([])
    const requestRef = useRef<number>(0)
    const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 })
    const lastMouseRef = useRef({ x: 0, y: 0 })

    // PHYSICAL CONSTANTS
    const FRICTION = 0.98
    const MAX_SPEED = 2
    const MOUSE_FORCE = 0.15

    useEffect(() => {
        // Elegant, glowing gradient palettes (Google Material You / Antigravity feel)
        const palettes = [
            'from-blue-400 to-cyan-300',
            'from-purple-400 to-pink-300',
            'from-yellow-400 to-orange-300',
            'from-emerald-400 to-teal-300',
            'from-red-400 to-rose-300'
        ]

        // Spawn fewer, larger, higher-quality orbs
        const initialOrbs: Orb[] = Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: 15 + Math.random() * 20, // larger % width for responsiveness
            color: palettes[i % palettes.length]
        }))
        setOrbs(initialOrbs)

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100
            const y = (e.clientY / window.innerHeight) * 100

            // Calculate mouse velocity for "throwing" effect
            mouseRef.current.vx = x - lastMouseRef.current.x
            mouseRef.current.vy = y - lastMouseRef.current.y
            mouseRef.current.x = x
            mouseRef.current.y = y

            lastMouseRef.current = { x, y }
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useEffect(() => {
        const animate = () => {
            setOrbs(prevOrbs => prevOrbs.map(orb => {
                let { x, y, vx, vy } = orb

                // 1. Mouse Interaction (Repulsion + Drag)
                const dx = mouseRef.current.x - x
                const dy = mouseRef.current.y - y
                const dist = Math.sqrt(dx * dx + dy * dy)
                // Adjust interaction radius based on orb size
                const radius = 25

                if (dist < radius) {
                    const force = (radius - dist) / radius
                    // Push away gently
                    vx -= dx * force * 0.005
                    vy -= dy * force * 0.005

                    // If mouse is moving fast, impart velocity (smack it)
                    if (Math.abs(mouseRef.current.vx) > 0.5 || Math.abs(mouseRef.current.vy) > 0.5) {
                        vx += mouseRef.current.vx * 0.05
                        vy += mouseRef.current.vy * 0.05
                    }
                }

                // 2. Soft Gravity / Float
                // They should drift aimlessly but eventually return to center if too far
                const centerX = 50
                const centerY = 50
                vx += (centerX - x) * 0.00001
                vy += (centerY - y) * 0.00001

                // 3. Apply changes
                x += vx
                y += vy
                vx *= FRICTION
                vy *= FRICTION

                // 4. Soft Boundaries (Wrap around is better for "space" feel? No, bounce is better for physics)
                if (x < -10) { x = -10; vx *= -1 }
                if (x > 110) { x = 110; vx *= -1 }
                if (y < -10) { y = -10; vy *= -1 }
                if (y > 110) { y = 110; vy *= -1 }

                return { ...orb, x, y, vx, vy }
            }))

            requestRef.current = requestAnimationFrame(animate)
        }

        requestRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(requestRef.current)
    }, [])

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#111]">
            {/* Use simple CSS blurring for "glow" instead of heavy SVG filters */}
            <div className="absolute inset-0 w-full h-full opacity-60">
                {orbs.map(orb => (
                    <div
                        key={orb.id}
                        className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl transition-transform will-change-transform`}
                        style={{
                            left: `${orb.x}%`,
                            top: `${orb.y}%`,
                            width: `${orb.radius}vw`,
                            height: `${orb.radius}vw`,
                            transform: 'translate(-50%, -50%)',
                            mixBlendMode: 'screen', // This creates the light-mixing effect
                        }}
                    />
                ))}
            </div>

            {/* Noise overlay for texture */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        </div>
    )
}
