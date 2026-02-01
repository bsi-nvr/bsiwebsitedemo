"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

// TYPES
interface Achievement {
    id: string
    title: string
    description: string
    icon: string
}

interface AchievementContextType {
    unlockAchievement: (id: string, title: string, desc: string) => void
}

const AchievementContext = createContext<AchievementContextType | null>(null)

export function useAchievements() {
    return useContext(AchievementContext)
}

// PROVIDER COMPONENT
export function AchievementProvider({ children, locale }: { children: React.ReactNode, locale: string }) {
    const [queue, setQueue] = useState<Achievement[]>([])
    const [active, setActive] = useState<Achievement | null>(null)
    const [unlocked] = useState<Set<string>>(new Set())

    const unlockAchievement = (id: string, title: string, description: string) => {
        if (unlocked.has(id)) return
        unlocked.add(id)
        setQueue(prev => [...prev, { id, title, description, icon: '🏆' }])
    }

    // 1. WATCH QUEUE -> PROMOTE TO ACTIVE
    useEffect(() => {
        if (active || queue.length === 0) return

        const next = queue[0]
        setActive(next)
        setQueue(prev => prev.slice(1))
    }, [active, queue.length]) // Trigger when queue changes or active becomes free

    // 2. WATCH ACTIVE -> SET DISMISS TIMER
    useEffect(() => {
        if (!active) return

        const timer = setTimeout(() => {
            setActive(null)
        }, 4000)

        return () => clearTimeout(timer)
    }, [active])

    return (
        <AchievementContext.Provider value={{ unlockAchievement }}>
            {children}

            {/* TOAST NOTIFICATION */}
            {/* Relocated to Bottom Center to avoid Header overlap (V8) */}
            <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${active ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                {active && (
                    <div className="bg-gray-900 border border-gray-700 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px]">
                        <div className="text-3xl animate-bounce">{active.icon}</div>
                        <div>
                            <h4 className="font-bold text-yellow-400">{active.title}</h4>
                            <p className="text-sm text-gray-300">{active.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </AchievementContext.Provider>
    )
}
