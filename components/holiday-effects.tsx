"use client"

import React from "react"

import { useEffect, useState } from "react"

export function HolidayEffects() {
  const [holiday, setHoliday] = useState<string | null>(null)
  const [demoMode, setDemoMode] = useState(false)

  useEffect(() => {
    // Check for demo mode from URL
    const params = new URLSearchParams(window.location.search)
    if (params.get("holiday-demo") === "true") {
      setDemoMode(true)
      setHoliday("all")
      return
    }

    const checkHoliday = () => {
      const now = new Date()
      const month = now.getMonth() + 1 // 1-12
      const day = now.getDate()

      // New Year's Eve (December 31)
      if (month === 12 && day === 31) {
        setHoliday("new-years-eve")
      }
      // New Year's Day (January 1)
      else if (month === 1 && day === 1) {
        setHoliday("new-years-day")
      }
      // Easter (approximate - 2026: April 5)
      else if (month === 4 && day >= 3 && day <= 6) {
        setHoliday("easter")
      }
      // King's Day (April 27)
      else if (month === 4 && day === 27) {
        setHoliday("kings-day")
      }
      // Christmas (December 24-26)
      else if (month === 12 && day >= 24 && day <= 26) {
        setHoliday("christmas")
      } else {
        setHoliday(null)
      }
    }

    checkHoliday()
    // Check every hour in case date changes
    const interval = setInterval(checkHoliday, 3600000)
    return () => clearInterval(interval)
  }, [])

  if (!holiday && !demoMode) return null

  return (
    <>
      {(holiday === "new-years-eve" || demoMode) && <NewYearsEveEffects />}
      {(holiday === "easter" || demoMode) && <EasterEffects />}
      {(holiday === "kings-day" || demoMode) && <KingsDayEffects />}
      {holiday === "christmas" && <ChristmasEffects />}
      {demoMode && <ChristmasSnowOnly />}
    </>
  )
}

function NewYearsEveEffects() {
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number; particles: Array<{ angle: number; color: string }> }>>([])

  useEffect(() => {
    const createFirework = () => {
      const colors = ["#ff3333", "#ffee00", "#33ff77", "#3399ff", "#ff3399", "#cc33ff"]
      const particleCount = 12
      const particles = Array.from({ length: particleCount }, (_, i) => ({
        angle: (i * 360) / particleCount,
        color: colors[Math.floor(Math.random() * colors.length)]
      }))
      
      const newFirework = {
        id: Date.now() + Math.random(),
        x: 15 + Math.random() * 70,
        y: 10 + Math.random() * 40,
        particles
      }
      
      setFireworks(prev => [...prev, newFirework])
      setTimeout(() => {
        setFireworks(prev => prev.filter(f => f.id !== newFirework.id))
      }, 1500)
    }

    // Create firework every 4-8 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        createFirework()
      }
    }, 6000)

    // Initial firework after 2 seconds
    const timeout = setTimeout(createFirework, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes firework-particle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        .firework-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          pointer-events: none;
          animation: firework-particle 1.2s ease-out forwards;
          box-shadow: 0 0 8px currentColor;
        }
      `}</style>
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="fixed pointer-events-none z-[9999]"
          style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
        >
          {fw.particles.map((p, i) => (
            <div
              key={i}
              className="firework-particle"
              style={{
                backgroundColor: p.color,
                "--tx": `${Math.cos((p.angle * Math.PI) / 180) * 80}px`,
                "--ty": `${Math.sin((p.angle * Math.PI) / 180) * 80}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </>
  )
}

function EasterEffects() {
  return (
    <>
      <style jsx>{`
        .easter-item {
          position: fixed;
          font-size: 20px;
          pointer-events: none;
          z-index: 50;
          opacity: 0.7;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .easter-item:hover {
          transform: scale(1.3);
          opacity: 1;
        }
      `}</style>
      {/* Hidden in footer area - bottom of page */}
      <div className="easter-item" style={{ bottom: "80px", left: "8%" }}>🥚</div>
      <div className="easter-item" style={{ bottom: "95px", left: "25%" }}>🐰</div>
      <div className="easter-item" style={{ bottom: "70px", right: "15%" }}>🥚</div>
      <div className="easter-item" style={{ bottom: "85px", right: "35%" }}>🥚</div>
    </>
  )
}

function KingsDayEffects() {
  return (
    <>
      <style jsx>{`
        @keyframes crown-float {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        .kings-day-crown {
          position: fixed;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 24px;
          pointer-events: none;
          z-index: 9999;
          animation: crown-float 3s ease-in-out infinite;
        }
      `}</style>
      <div className="kings-day-crown">
        👑
      </div>
    </>
  )
}

function ChristmasEffects() {
  const [santa, setSanta] = useState({ x: -100, show: false })

  useEffect(() => {
    const moveSanta = () => {
      setSanta({ x: -100, show: true })
      
      const duration = 15000
      const startTime = Date.now()
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = elapsed / duration
        
        if (progress < 1) {
          setSanta({ x: -100 + (window.innerWidth + 200) * progress, show: true })
          requestAnimationFrame(animate)
        } else {
          setSanta({ x: window.innerWidth + 100, show: false })
        }
      }
      
      requestAnimationFrame(animate)
    }

    // Santa flies across every 2-3 minutes
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        moveSanta()
      }
    }, 150000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes snowfall {
          0% { transform: translateY(-10px) translateX(0); }
          100% { transform: translateY(100vh) translateX(30px); }
        }
        .snowflake {
          position: fixed;
          top: -10px;
          color: white;
          font-size: 12px;
          pointer-events: none;
          z-index: 9999;
          animation: snowfall linear infinite;
          opacity: 0.5;
        }
        .santa {
          position: fixed;
          top: 15%;
          font-size: 40px;
          pointer-events: none;
          z-index: 9999;
        }
      `}</style>
      
      {santa.show && (
        <div className="santa" style={{ left: `${santa.x}px` }}>
          🎅🛷
        </div>
      )}
      
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${(i * 16)}%`,
            animationDuration: `${12 + Math.random() * 8}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          ❄️
        </div>
      ))}
    </>
  )
}

function ChristmasSnowOnly() {
  return (
    <>
      <style jsx>{`
        @keyframes snowfall {
          0% { transform: translateY(-10px) translateX(0); }
          100% { transform: translateY(100vh) translateX(30px); }
        }
        .snowflake {
          position: fixed;
          top: -10px;
          color: white;
          font-size: 12px;
          pointer-events: none;
          z-index: 9999;
          animation: snowfall linear infinite;
          opacity: 0.5;
        }
      `}</style>
      
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${(i * 16)}%`,
            animationDuration: `${12 + Math.random() * 8}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          ❄️
        </div>
      ))}
    </>
  )
}
