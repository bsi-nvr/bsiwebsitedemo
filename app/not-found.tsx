"use client"

import React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { Home, X, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { achievements, catJokes } from "./not-found/_components/not-found-data"

// Visiting friend messages
const friendMessages = {
  nl: {
    lilly: 'Hoi! Ik ben Lilly! Luca\'s vriendin. Ik kwam even kijken hoe het hier gaat!',
    zuko: 'Meow! Zuko hier. Luca zei dat er iemand was die blijft klikken. Interessant!',
    misty: 'Waf waf! Ik ben Misty! Ik speel graag met Luca en zijn vrienden!'
  },
  en: {
    lilly: 'Hi! I\'m Lilly! Luca\'s friend. I came to see how things are going here!',
    zuko: 'Meow! Zuko here. Luca said someone keeps clicking. Interesting!',
    misty: 'Woof woof! I\'m Misty! I love playing with Luca and his friends!'
  }
}

export default function NotFound() {
  const { locale } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [currentMessage, setCurrentMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [achievement, setAchievement] = useState<{ title: string; description: string } | null>(null)
  const [showAchievement, setShowAchievement] = useState(false)
  const [showPortal, setShowPortal] = useState(false)
  const [showMiniGame, setShowMiniGame] = useState(false)
  
  // Luca state
  const [lucaX, setLucaX] = useState(50)
  const [lucaDirection, setLucaDirection] = useState<1 | -1>(1)
  const [lucaActivity, setLucaActivity] = useState<'idle' | 'eating' | 'playing' | 'chasing' | 'jumping'>('idle')
  const [isFollowingCursor, setIsFollowingCursor] = useState(true)
  
  // Activity objects
  const [foodTray, setFoodTray] = useState<{ visible: boolean; x: number } | null>(null)
  const [woolBall, setWoolBall] = useState<{ visible: boolean; x: number } | null>(null)
  const [toy, setToy] = useState<{ visible: boolean; x: number; type: string } | null>(null)
  const [laser, setLaser] = useState<{ visible: boolean; x: number; y: number } | null>(null)
  
  // Visiting friends
  const [visitor, setVisitor] = useState<{ type: 'lilly' | 'zuko' | 'misty'; x: number; direction: 1 | -1 } | null>(null)
  
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const visitorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Initialize
  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setCurrentMessage(locale === 'nl' ? 'Meow! Ik ben Luca van Brainsoft! Klik op mij!' : 'Meow! I am Luca from Brainsoft! Click on me!')
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 6000)
    }, 1000)
    return () => clearTimeout(timer)
  }, [locale])
  
  // Make Luca follow cursor
  useEffect(() => {
    if (!mounted || !isFollowingCursor) return
    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth
      const mouseXPercent = (e.clientX / windowWidth) * 100
      const targetX = Math.max(10, Math.min(90, mouseXPercent))
      setLucaX(prev => {
        const diff = targetX - prev
        if (Math.abs(diff) > 0.5) {
          setLucaDirection(diff > 0 ? 1 : -1)
        }
        return prev + diff * 0.08
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mounted, isFollowingCursor])
  
  // Schedule random activities for Luca
  useEffect(() => {
    if (!mounted || !isFollowingCursor) return
    
    const scheduleActivity = () => {
      const randomTime = 10000 + Math.random() * 10000 // 10-20 seconds
      activityTimeoutRef.current = setTimeout(() => {
        const randomChoice = Math.random()
        if (randomChoice < 0.15) {
          showFoodTray()
        } else if (randomChoice < 0.35) {
          showWoolBall()
        } else if (randomChoice < 0.50) {
          showToy()
        } else if (randomChoice < 0.75) {
          chaseLaser()
        } else {
          randomJump()
        }
      }, randomTime)
    }
    
    scheduleActivity()
    return () => {
      if (activityTimeoutRef.current) clearTimeout(activityTimeoutRef.current)
    }
  }, [mounted, isFollowingCursor, lucaActivity])
  
  // Schedule visiting friends
  useEffect(() => {
    if (!mounted) return
    
    const scheduleVisitor = () => {
      const randomTime = 20000 + Math.random() * 30000 // 20-50 seconds
      visitorTimeoutRef.current = setTimeout(() => {
        const visitors = ['lilly', 'zuko', 'misty'] as const
        const randomVisitor = visitors[Math.floor(Math.random() * visitors.length)]
        const startX = Math.random() > 0.5 ? -10 : 110
        const direction = startX < 0 ? 1 : -1
        
        setVisitor({ type: randomVisitor, x: startX, direction: direction as 1 | -1 })
        
        // Show visitor message
        const messages = friendMessages[locale as keyof typeof friendMessages] || friendMessages.en
        setCurrentMessage(messages[randomVisitor])
        setShowMessage(true)
        if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current)
        messageTimeoutRef.current = setTimeout(() => setShowMessage(false), 3000)
        
        // Animate visitor across screen - slower speed for interaction
        const walkInterval = setInterval(() => {
          setVisitor(prev => {
            if (!prev) return null
            const newX = prev.x + (prev.direction * 0.3)
            if ((prev.direction === 1 && newX > 110) || (prev.direction === -1 && newX < -10)) {
              clearInterval(walkInterval)
              scheduleVisitor()
              return null
            }
            return { ...prev, x: newX }
          })
        }, 80)
      }, randomTime)
    }
    
    scheduleVisitor()
    return () => {
      if (visitorTimeoutRef.current) clearTimeout(visitorTimeoutRef.current)
    }
  }, [mounted, locale])
  
  // Activity functions
  const showFoodTray = useCallback(() => {
    if (lucaActivity !== 'idle') return
    setIsFollowingCursor(false)
    setLucaActivity('eating')
    const trayX = 75
    setFoodTray({ visible: true, x: trayX })
    setCurrentMessage(locale === 'nl' ? 'Eten! Mijn favoriete bezigheid!' : 'Food! My favorite activity!')
    setShowMessage(true)
    
    // Move Luca to food
    const moveInterval = setInterval(() => {
      setLucaX(prev => {
        const diff = trayX - prev
        if (Math.abs(diff) < 2) {
          clearInterval(moveInterval)
          // Eating animation
          setTimeout(() => {
            setFoodTray(null)
            setLucaActivity('idle')
            setIsFollowingCursor(true)
            setCurrentMessage(locale === 'nl' ? 'Mmm, dat was lekker!' : 'Mmm, that was delicious!')
            setTimeout(() => setShowMessage(false), 4000)
          }, 3000)
          return trayX
        }
        setLucaDirection(diff > 0 ? 1 : -1)
        return prev + (diff > 0 ? 0.7 : -0.7)
      })
    }, 80)
  }, [lucaActivity, locale])
  
  const showWoolBall = useCallback(() => {
    if (lucaActivity !== 'idle') return
    setIsFollowingCursor(false)
    setLucaActivity('playing')
    const ballX = 20 + Math.random() * 60
    setWoolBall({ visible: true, x: ballX })
    setCurrentMessage(locale === 'nl' ? 'Wol! Mijn favoriete speeltje!' : 'Wool! My favorite toy!')
    setShowMessage(true)
    
    // Move Luca to wool ball
    const moveToWool = () => {
      const moveInterval = setInterval(() => {
        setLucaX(prev => {
          const diff = (woolBall?.x || ballX) - prev
          if (Math.abs(diff) < 3) {
            clearInterval(moveInterval)
            // Play with wool for a bit
            let playCount = 0
            const playInterval = setInterval(() => {
              const newBallX = 20 + Math.random() * 60
              setWoolBall({ visible: true, x: newBallX })
              setLucaX(newBallX)
              setLucaDirection(Math.random() > 0.5 ? 1 : -1)
              playCount++
              if (playCount >= 5) {
                clearInterval(playInterval)
                setWoolBall(null)
                setLucaActivity('idle')
                setIsFollowingCursor(true)
                setCurrentMessage(locale === 'nl' ? 'Dat was leuk!' : 'That was fun!')
                setTimeout(() => setShowMessage(false), 4000)
              }
            }, 1000)
            return prev
          }
          setLucaDirection(diff > 0 ? 1 : -1)
          return prev + (diff > 0 ? 0.9 : -0.9)
        })
      }, 80)
    }
    moveToWool()
  }, [lucaActivity, locale, woolBall])
  
  const showToy = useCallback(() => {
    if (lucaActivity !== 'idle') return
    setIsFollowingCursor(false)
    setLucaActivity('chasing')
    const toyX = 20 + Math.random() * 60
    const toyTypesNl = ['Muis', 'Vis', 'Vogel', 'Veer']
    const toyTypesEn = ['Mouse', 'Fish', 'Bird', 'Feather']
    const toyIndex = Math.floor(Math.random() * toyTypesNl.length)
    const toyName = locale === 'nl' ? toyTypesNl[toyIndex] : toyTypesEn[toyIndex]
    setToy({ visible: true, x: toyX, type: toyName })
    setCurrentMessage(locale === 'nl' ? 'Ik zie iets bewegen! Ik ga erop jagen!' : 'I see something moving! I\'ll hunt it!')
    setShowMessage(true)
    
    // Chase toy
    const moveInterval = setInterval(() => {
      setLucaX(prev => {
        const diff = toyX - prev
        if (Math.abs(diff) < 3) {
          clearInterval(moveInterval)
          setToy(null)
          setLucaActivity('idle')
          setIsFollowingCursor(true)
          setCurrentMessage(locale === 'nl' 
            ? `Voor jou! Ik heb dit gevangen uit het 404-rijk. Een ${toyName}!` 
            : `For you! I caught this from the 404 realm. A ${toyName}!`)
          setTimeout(() => setShowMessage(false), 6000)
          return prev
        }
        setLucaDirection(diff > 0 ? 1 : -1)
        return prev + (diff > 0 ? 0.9 : -0.9)
      })
    }, 80)
  }, [lucaActivity, locale])
  
  const chaseLaser = useCallback(() => {
    if (lucaActivity !== 'idle') return
    setIsFollowingCursor(false)
    setLucaActivity('chasing')
    setCurrentMessage(locale === 'nl' ? 'Rood licht! Moet vangen! Moet vangen!' : 'Red light! Must catch! Must catch!')
    setShowMessage(true)
    
    let chaseCount = 0
    const maxChases = 5 + Math.floor(Math.random() * 5)
    
    const moveLaser = () => {
      const newX = 20 + Math.random() * 60
      const newY = 10 + Math.random() * 40
      setLaser({ visible: true, x: newX, y: newY })
      
      const moveInterval = setInterval(() => {
        setLucaX(prev => {
          const diff = newX - prev
          if (Math.abs(diff) < 2) {
            clearInterval(moveInterval)
            chaseCount++
            if (chaseCount < maxChases) {
              setTimeout(moveLaser, 500)
            } else {
              setLaser(null)
              setLucaActivity('idle')
              setIsFollowingCursor(true)
              setCurrentMessage(locale === 'nl' ? 'Waar is het heen? Ik had het bijna!' : 'Where did it go? I almost had it!')
              // Keep showing message longer
              setTimeout(() => setShowMessage(false), 5000)
            }
            return prev
          }
          setLucaDirection(diff > 0 ? 1 : -1)
          return prev + (diff > 0 ? 0.8 : -0.8)
        })
      }, 80)
    }
    moveLaser()
  }, [lucaActivity, locale])
  
  const randomJump = useCallback(() => {
    if (lucaActivity !== 'idle') return
    setLucaActivity('jumping')
    setCurrentMessage(locale === 'nl' ? 'Meow! Ik spring gewoon voor de lol!' : 'Meow! I jump just for fun!')
    setShowMessage(true)
    
    // Jump animation
    setTimeout(() => {
      setLucaActivity('idle')
      setTimeout(() => setShowMessage(false), 4500)
    }, 800)
  }, [lucaActivity, locale])
  
  const handleVisitorClick = useCallback((type: 'lilly' | 'zuko' | 'misty') => {
    const visitorMessages = locale === 'nl' ? {
      lilly: 'Hoi! Ik ben Lilly! Luca\'s vriendin. Ik kwam even kijken hoe het hier gaat!',
      zuko: 'Meow! Zuko hier. Luca zei dat er iemand was die blijft klikken. Interessant!',
      misty: 'Waf waf! Ik ben Misty! Ik speel graag met Luca en zijn vrienden!'
    } : {
      lilly: 'Hi! I\'m Lilly! Luca\'s friend. I came to see how things are going here!',
      zuko: 'Meow! Zuko here. Luca said someone keeps clicking. Interesting!',
      misty: 'Woof woof! I\'m Misty! I love playing with Luca and his friends!'
    }
    
    setCurrentMessage(visitorMessages[type])
    setShowMessage(true)
    
    if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current)
    messageTimeoutRef.current = setTimeout(() => setShowMessage(false), 6000)
  }, [locale])
  
  const handleLucaClick = useCallback(() => {
    setClickCount(prev => {
      const newCount = prev + 1
      const jokes = catJokes[locale as keyof typeof catJokes] || catJokes.en
      setCurrentMessage(jokes[(newCount - 1) % jokes.length])
      setShowMessage(true)
      
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current)
      messageTimeoutRef.current = setTimeout(() => setShowMessage(false), 4000)
      
      const achievementData = achievements[locale as keyof typeof achievements] || achievements.en
      if (newCount === 10 || newCount === 20 || newCount === 30 || newCount === 99) {
        const achv = achievementData[newCount as keyof typeof achievementData]
        if (achv) {
          setAchievement(achv)
          setShowAchievement(true)
          setTimeout(() => setShowAchievement(false), 5000)
          if (newCount === 99) {
            setTimeout(() => setShowPortal(true), 2000)
          }
        }
      }
      return newCount
    })
  }, [locale])
  
  const handlePortalComplete = useCallback(() => {
    setShowPortal(false)
    setShowMiniGame(true)
  }, [])
  
  const handleMiniGameClose = useCallback(() => {
    setShowMiniGame(false)
    setCurrentMessage(locale === 'nl' ? 'Dat was leuk! Kom je nog eens spelen?' : 'That was fun! Will you play again?')
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 5000)
  }, [locale])

  const t = locale === 'nl' ? {
    title: '404',
    subtitle: 'Oeps! Deze pagina is in een doos gekropen',
    description: 'Het lijkt erop dat de pagina die je zoekt zich verstopt heeft — misschien achter de bank, onder een kleedje, of gewoon poef verdwenen!',
    subdescription: 'Maar geen zorgen, we miauwen je zo weer de goede kant op.',
    cta: 'Laten we je weer op weg helpen!',
    homeButton: 'Terug naar Home',
  } : {
    title: '404',
    subtitle: 'Oops! This page crawled into a box',
    description: 'It seems like the page you\'re looking for is hiding — maybe behind the couch, under a rug, or just poof gone!',
    subdescription: 'But don\'t worry, we\'ll meow you back in the right direction.',
    cta: 'Let us help you get back on track!',
    homeButton: 'Back to Home',
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <style jsx global>{`
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes tailWag {
          0%, 100% { transform: rotate(25deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes tailWagFast {
          0%, 100% { transform: rotate(30deg); }
          50% { transform: rotate(-10deg); }
        }
        @keyframes tongueWag {
          0%, 100% { height: 12px; }
          50% { height: 16px; }
        }
        @keyframes legMove {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.3); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes portalPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes portalSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes woolBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes jump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-40px); }
        }
      `}</style>

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center px-4 py-16 relative">
        <div className="max-w-4xl w-full flex flex-col items-center text-center">
          <h1 className="text-8xl font-bold text-accent mb-4 font-playfair">😿 404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance font-playfair">{t.subtitle}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance font-inter">{t.description}</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 text-balance font-inter">{t.subdescription}</p>
          
          {/* Speech bubble in main content */}
          {showMessage && currentMessage && (
            <div className="mt-6 mb-4">
              <div className="bg-muted/95 border border-border rounded-xl px-6 py-4 shadow-xl min-w-[240px] max-w-[560px]">
                <p className="text-sm text-foreground text-center leading-relaxed whitespace-normal font-inter">{currentMessage}</p>
              </div>
            </div>
          )}
          
          <div className="mt-10">
            <p className="text-muted-foreground mb-8 text-balance font-inter">{t.cta}</p>
            <Link
              href="/"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-foreground text-sm uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-inter"
            >
              <Home className="w-4 h-4" />
              {t.homeButton}
            </Link>
          </div>
        </div>
      </div>

      {/* Pet playground */}
      <div className="relative h-48 overflow-visible">
        {/* Luca */}
        <div
          className={lucaActivity === 'jumping' ? '' : 'transition-all duration-300 ease-out'}
          style={{ 
            left: `${lucaX}%`, 
            transform: 'translateX(-50%)',
            animation: lucaActivity === 'jumping' ? 'jump 0.8s ease-in-out' : 'none',
            position: 'absolute',
            bottom: '32px'
          }}
        >
          <CatDiv color="tuxedo" direction={lucaDirection} isWalking={lucaActivity !== 'idle' && lucaActivity !== 'jumping'} name="Luca" onClick={handleLucaClick} />
        </div>
        
        {/* Visiting friend */}
          {visitor && (
            <div
              className="absolute bottom-8 transition-all duration-300 ease-linear"
              style={{ left: `${visitor.x}%`, transform: 'translateX(-50%)' }}
            >
              {visitor.type === 'lilly' && <CatDiv color="orange" direction={visitor.direction} isWalking={true} name="Lilly" onClick={() => handleVisitorClick('lilly')} showName={false} />}
              {visitor.type === 'zuko' && <CatDiv color="black" direction={visitor.direction} isWalking={true} name="Zuko" onClick={() => handleVisitorClick('zuko')} showName={false} />}
              {visitor.type === 'misty' && <DogDiv direction={visitor.direction} isWalking={true} name="Misty" onClick={() => handleVisitorClick('misty')} showName={false} />}
            </div>
          )}
        
        {/* Food tray */}
        {foodTray && (
          <div
            className="absolute bottom-0 w-16 h-4 bg-gray-600 rounded-lg"
            style={{ left: `${foodTray.x}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-0.5 left-3 w-10 h-2 bg-amber-700 rounded-full" />
          </div>
        )}
        
        {/* Wool ball */}
        {woolBall && (
          <div
            className="absolute bottom-2 w-6 h-6 rounded-full"
            style={{ 
              left: `${woolBall.x}%`, 
              transform: 'translateX(-50%)',
              background: 'radial-gradient(circle at 30% 30%, #f87171, #ef4444)',
              animation: 'woolBounce 1.4s infinite alternate'
            }}
          />
        )}
        
        {/* Toy */}
        {toy && (
          <div
            className="absolute bottom-2 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-xs"
            style={{ left: `${toy.x}%`, transform: 'translateX(-50%)' }}
          >
            🐁
          </div>
        )}
        
        {/* Laser pointer */}
        {laser && (
          <div
            className="absolute w-3 h-3 rounded-full"
            style={{ 
              left: `${laser.x}%`, 
              bottom: `${laser.y}px`,
              transform: 'translateX(-50%)',
              background: 'radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(255,0,0,0.7) 30%, rgba(255,0,0,0) 100%)',
              boxShadow: '0 0 10px rgba(255,0,0,0.8)'
            }}
          />
        )}
      </div>

      {/* Achievement popup */}
      {showAchievement && achievement && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 bg-background border-2 border-accent rounded-xl p-6 shadow-2xl z-50 max-w-sm text-center font-sans"
          style={{ animation: 'fadeIn 0.5s ease-out' }}
        >
          <div className="text-5xl mb-3">🏆</div>
          <div className="text-xl font-bold text-accent mb-2">{locale === 'nl' ? 'Achievement Ontgrendeld' : 'Achievement Unlocked'}: {achievement.title}</div>
          <div className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</div>
        </div>
      )}

      {/* Portal */}
      {showPortal && <Portal onComplete={handlePortalComplete} locale={locale} />}

      {/* Mini-game */}
      {showMiniGame && <MiniGame onClose={handleMiniGameClose} locale={locale} />}
    </main>
  )
}
// Cat component
function CatDiv({ color, direction, isWalking, name, onClick, showName = true }: { 
  color: string
  direction: 1 | -1
  isWalking: boolean
  name: string
  onClick: () => void
  showName?: boolean
}) {
  const colorMap: Record<string, { body: string; dark: string; isLuca?: boolean }> = {
    tuxedo: { body: 'bg-gray-800', dark: 'bg-gray-900', isLuca: true },
    orange: { body: 'bg-orange-400', dark: 'bg-orange-500' },
    black: { body: 'bg-gray-800', dark: 'bg-gray-900' },
    gray: { body: 'bg-gray-500', dark: 'bg-gray-600' },
  }
  const colors = colorMap[color] || colorMap.gray
  const isLuca = colors.isLuca

  return (
    <div 
      onClick={onClick}
      className="relative w-24 h-24 cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
      style={{ transform: `scaleX(${direction})` }}
    >
      {/* Name tag */}
      {showName && (
        <div 
          className="absolute -top-5 left-1/2 text-xs font-medium text-foreground whitespace-nowrap z-10"
          style={{ transform: `translateX(-50%) scaleX(${direction})` }}
        >
          {name}
        </div>
      )}
      
      {/* Cat Head */}
      <div className={`${colors.body} w-14 h-11 rounded-full absolute left-1/2 -translate-x-1/2 -top-3 z-10`}>
        {/* Ears */}
        <div className={`${colors.body} w-4 h-6 absolute -top-3 left-1 rounded-tl-full rounded-tr-full transform rotate-[-20deg]`} />
        <div className={`${colors.body} w-4 h-6 absolute -top-3 right-1 rounded-tl-full rounded-tr-full transform rotate-[20deg]`} />
        {/* Inner ears */}
        <div className="bg-pink-300 w-2 h-3 absolute -top-2 left-2 rounded-tl-full rounded-tr-full transform rotate-[-20deg]" />
        <div className="bg-pink-300 w-2 h-3 absolute -top-2 right-2 rounded-tl-full rounded-tr-full transform rotate-[20deg]" />
        
        {/* White chest patch for Luca */}
        {isLuca && (
          <div className="bg-white w-7 h-5 rounded-b-full absolute left-1/2 -translate-x-1/2 top-5 z-0" />
        )}
        
        {/* Eyes */}
        <div className="flex justify-center gap-4 absolute w-full top-2 z-10">
          <div className="bg-yellow-400 w-2.5 h-4 rounded-full flex items-center justify-center">
        <div className="bg-black w-1 h-2.5 rounded-full" style={{ animation: 'blink 6s infinite' }} />
          </div>
          <div className="bg-yellow-400 w-2.5 h-4 rounded-full flex items-center justify-center">
        <div className="bg-black w-1 h-2.5 rounded-full" style={{ animation: 'blink 6s infinite' }} />
          </div>
        </div>
        
        {/* Nose */}
        <div className="bg-pink-300 w-2 h-1.5 rounded-full absolute left-1/2 -translate-x-1/2 top-6 z-10" />
        
        {/* White mustache for Luca */}
        {isLuca && (
          <div className="absolute left-1/2 -translate-x-1/2 top-[26px] z-10">
            <div className="flex gap-1">
              <div className="bg-white w-3.5 h-1.5 rounded-full" />
              <div className="bg-white w-3.5 h-1.5 rounded-full" />
            </div>
          </div>
        )}
        
        {/* Whiskers */}
        <div className="absolute w-full top-6 z-10">
          <div className="w-5 h-px bg-foreground/40 absolute -left-5 top-0 rotate-[10deg]" />
          <div className="w-5 h-px bg-foreground/40 absolute -left-5 top-1.5" />
          <div className="w-5 h-px bg-foreground/40 absolute -right-5 top-0 rotate-[-10deg]" />
          <div className="w-5 h-px bg-foreground/40 absolute -right-5 top-1.5" />
        </div>
      </div>
      
      {/* Body */}
      <div className="relative">
        <div className={`${colors.body} w-16 h-14 rounded-t-3xl absolute left-1/2 -translate-x-1/2 top-6`} />
        {/* White belly for Luca */}
        {isLuca && (
          <div className="bg-white w-8 h-10 rounded-b-full absolute left-1/2 -translate-x-1/2 top-8" />
        )}
      </div>
      
      {/* Tail */}
      <div 
        className={`${colors.body} w-3 h-12 absolute -right-3 top-8 rounded-full`}
        style={{ transformOrigin: 'bottom center', animation: 'tailWag 2.6s infinite' }}
      />
      
      {/* Legs */}
      <div className="absolute bottom-0 w-full flex justify-between px-2">
        {[0, 0.1, 0.2, 0.3].map((delay, i) => (
          <div 
            key={i}
            className={`${isLuca && (i === 1 || i === 2) ? 'bg-white' : colors.dark} w-3 rounded-b-lg`}
            style={{ height: '20px', animation: isWalking ? `legMove 0.6s infinite ${delay}s` : 'none' }}
          />
        ))}
      </div>
    </div>
  )
}

// Dog component
function DogDiv({ direction, isWalking, name, onClick, showName = true }: { 
  direction: 1 | -1
  isWalking: boolean
  name: string
  onClick: () => void
  showName?: boolean
}) {
  return (
    <div 
      onClick={onClick}
      className="relative w-28 h-24 cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
      style={{ transform: `scaleX(${direction})` }}
    >
      {showName && (
        <div 
          className="absolute -top-5 left-1/2 text-xs font-medium text-foreground whitespace-nowrap z-10"
          style={{ transform: `translateX(-50%) scaleX(${direction})` }}
        >
          {name}
        </div>
      )}
      
      <div className="bg-orange-100 w-14 h-12 rounded-full absolute left-2 -top-1 z-10">
        <div className="bg-orange-600 w-5 h-10 absolute -top-1 -left-2 rounded-full transform rotate-[-15deg]" />
        <div className="bg-orange-600 w-5 h-10 absolute -top-1 -right-2 rounded-full transform rotate-[15deg]" />
        <div className="bg-gray-900 w-3 h-4 absolute -top-2 -left-1 rounded-full transform rotate-[-15deg]" />
        <div className="bg-gray-900 w-3 h-4 absolute -top-2 -right-1 rounded-full transform rotate-[15deg]" />
        
        <div className="flex justify-center gap-3 absolute w-full top-3">
          <div className="bg-amber-800 w-2.5 h-2.5 rounded-full" />
          <div className="bg-amber-800 w-2.5 h-2.5 rounded-full" />
        </div>
        
        <div className="bg-orange-50 w-8 h-5 rounded-full absolute left-1/2 -translate-x-1/2 top-5">
          <div className="bg-gray-900 w-3 h-2 rounded-full absolute left-1/2 -translate-x-1/2 top-0.5" />
        </div>
        
        <div className="bg-pink-400 w-2 h-3 rounded-b-full absolute left-1/2 -translate-x-1/2 top-9" style={{ animation: 'tongueWag 1.4s infinite' }} />
      </div>
      
      <div className="bg-orange-100 w-20 h-14 rounded-2xl absolute left-4 top-7">
        <div className="bg-orange-500 w-8 h-6 rounded-full absolute top-2 left-2" />
        <div className="bg-orange-500 w-6 h-5 rounded-full absolute top-4 right-3" />
      </div>
      
      <div 
        className="bg-orange-200 w-4 h-10 absolute right-0 top-7 rounded-full"
        style={{ transformOrigin: 'bottom center', animation: 'tailWagFast 0.9s infinite' }}
      />
      
      <div className="absolute bottom-0 w-full flex justify-between px-4">
        {[0, 0.09, 0.18, 0.27].map((delay, i) => (
          <div 
            key={i}
            className="bg-orange-100 w-3 rounded-b-lg"
            style={{ height: '18px', animation: isWalking ? `legMove 0.6s infinite ${delay}s` : 'none' }}
          />
        ))}
      </div>
    </div>
  )
}

// Speech bubble
function SpeechBubble({ message, visible }: { message: string; visible: boolean }) {
  if (!visible || !message) return null
  
  return (
    <div
      className="absolute -top-28 left-1/2 -translate-x-1/2 bg-muted/95 border border-border rounded-xl px-5 py-3 shadow-xl z-30 min-w-[200px] max-w-[320px]"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      <p className="text-sm text-foreground text-center leading-relaxed whitespace-normal">{message}</p>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-muted/95" />
      </div>
    </div>
  )
}

// Portal component
function Portal({ onComplete, locale }: { onComplete: () => void; locale: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <div className="relative w-64 h-64 rounded-full flex items-center justify-center">
        <div 
          className="absolute w-full h-full rounded-full border-8 border-primary"
          style={{ animation: 'portalPulse 3s infinite' }}
        />
        <div 
          className="absolute w-5/6 h-5/6 rounded-full border-8 border-accent"
          style={{ animation: 'portalSpin 10s linear infinite' }}
        />
        <div className="absolute w-2/3 h-2/3 rounded-full bg-gradient-to-br from-primary via-accent to-pink-600" />
        <div className="absolute w-1/2 h-1/2 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
          <span className="text-white text-lg font-bold">
            {locale === 'nl' ? 'Portaal' : 'Portal'}
          </span>
        </div>
      </div>
    </div>
  )
}

// Mini-game component
function MiniGame({ onClose, locale }: { onClose: () => void; locale: string }) {
  const [gameScore, setGameScore] = useState(0)
  const [gameTimer, setGameTimer] = useState(30)
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [catX, setCatX] = useState(50)
  const [mice, setMice] = useState<Array<{ id: number; x: number; y: number; dirX: number; dirY: number }>>([])
  const [gameEnded, setGameEnded] = useState(false)
  const [highScores, setHighScores] = useState<Array<{ score: number; date: string }>>([])
  
  const arenaRef = useRef<HTMLDivElement>(null)
  const miceIdRef = useRef(0)

  useEffect(() => {
    const stored = localStorage.getItem('lucaMouseGameScores')
    if (stored) {
      setHighScores(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    if (!isGameRunning) return
    
    const timer = setInterval(() => {
      setGameTimer(prev => {
        if (prev <= 1) {
          setIsGameRunning(false)
          setGameEnded(true)
          // Save high score
          const newScores = [...highScores, { score: gameScore, date: new Date().toLocaleDateString() }]
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
          setHighScores(newScores)
          localStorage.setItem('lucaMouseGameScores', JSON.stringify(newScores))
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isGameRunning, gameScore, highScores])

  useEffect(() => {
    if (!isGameRunning) return
    
    const spawnMouse = () => {
      const newMouse = {
        id: miceIdRef.current++,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 10,
        dirX: (Math.random() - 0.5) * 2,
        dirY: (Math.random() - 0.5) * 2
      }
      setMice(prev => [...prev, newMouse])
    }
    
    spawnMouse()
    const interval = setInterval(spawnMouse, 1500)
    return () => clearInterval(interval)
  }, [isGameRunning])

  useEffect(() => {
    if (!isGameRunning || !arenaRef.current) return
    
    const moveMice = setInterval(() => {
      setMice(prev => prev.map(mouse => {
        let newX = mouse.x + mouse.dirX
        let newY = mouse.y + mouse.dirY
        let newDirX = mouse.dirX
        let newDirY = mouse.dirY
        
        if (newX < 5 || newX > 95) newDirX *= -1
        if (newY < 5 || newY > 85) newDirY *= -1
        
        newX = Math.max(5, Math.min(95, newX))
        newY = Math.max(5, Math.min(85, newY))
        
        // Check collision with cat
        if (Math.abs(newX - catX) < 8 && newY > 70) {
          setGameScore(s => s + 1)
          return null
        }
        
        return { ...mouse, x: newX, y: newY, dirX: newDirX, dirY: newDirY }
      }).filter(Boolean) as typeof prev)
    }, 50)
    
    return () => clearInterval(moveMice)
  }, [isGameRunning, catX])

  const startGame = () => {
    setGameScore(0)
    setGameTimer(30)
    setMice([])
    setGameEnded(false)
    setIsGameRunning(true)
    setCatX(50)
  }

  const handleArenaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isGameRunning || !arenaRef.current) return
    const rect = arenaRef.current.getBoundingClientRect()
    const clickX = ((e.clientX - rect.left) / rect.width) * 100
    setCatX(Math.max(10, Math.min(90, clickX)))
  }

  useEffect(() => {
    if (!isGameRunning) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCatX(prev => Math.max(10, prev - 5))
      } else if (e.key === 'ArrowRight') {
        setCatX(prev => Math.min(90, prev + 5))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isGameRunning])

  const t = locale === 'nl' ? {
    title: 'Vang de Muizen met Luca!',
    description: 'Help Luca om zoveel mogelijk muizen te vangen binnen 30 seconden!',
    time: 'Tijd',
    score: 'Score',
    startGame: 'Start Spel',
    instruction: 'Gebruik de pijltjestoetsen of klik/tik waar Luca naartoe moet gaan!',
    gameOver: 'Spel Afgelopen!',
    caught: 'Je hebt',
    mice: 'muizen gevangen!',
    scoreboard: 'Scorebord',
    playAgain: 'Nog een keer',
    close: 'Sluiten'
  } : {
    title: 'Catch the Mice with Luca!',
    description: 'Help Luca catch as many mice as possible within 30 seconds!',
    time: 'Time',
    score: 'Score',
    startGame: 'Start Game',
    instruction: 'Use arrow keys or click/tap where Luca should go!',
    gameOver: 'Game Over!',
    caught: 'You caught',
    mice: 'mice!',
    scoreboard: 'Scoreboard',
    playAgain: 'Play Again',
    close: 'Close'
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 p-4 font-sans">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-2xl p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-accent mb-2">{t.title}</h2>
        <p className="text-muted-foreground mb-6 text-center leading-relaxed">{t.description}</p>
        
        <div className="flex justify-between w-full mb-4 font-medium">
          <div className="text-muted-foreground">{t.time}: <span className="font-bold text-foreground">{gameTimer}</span>s</div>
          <div className="text-muted-foreground">{t.score}: <span className="font-bold text-foreground">{gameScore}</span></div>
        </div>
        
        <div 
          ref={arenaRef}
          onClick={handleArenaClick}
          className="relative bg-secondary/20 w-full h-80 rounded-lg overflow-hidden mb-6 cursor-pointer"
        >
          {/* Cat */}
          <div 
            className="absolute bottom-0"
            style={{ left: `${catX}%`, transform: 'translateX(-50%)', transition: 'left 0.2s ease-out' }}
          >
            <div className="scale-50">
              <CatDiv color="gray" direction={1} isWalking={false} name="" onClick={() => {}} />
            </div>
          </div>
          
          {/* Mice */}
          {mice.map(mouse => (
            <div
              key={mouse.id}
              className="absolute w-5 h-3 bg-gray-400 rounded-full"
              style={{ left: `${mouse.x}%`, top: `${mouse.y}%`, transform: `scaleX(${mouse.dirX > 0 ? 1 : -1})` }}
            >
              <div className="absolute w-2 h-2 bg-gray-400 rounded-full -top-1 left-0.5" />
              <div className="absolute w-3 h-px bg-gray-400 -right-3 top-1.5" />
            </div>
          ))}
        </div>
        
        {!isGameRunning && !gameEnded && (
          <div className="flex flex-col items-center">
            <Button onClick={startGame} size="lg" className="mb-4 rounded-full px-8 font-medium">
              {t.startGame}
            </Button>
            <p className="text-muted-foreground text-sm text-center leading-relaxed">{t.instruction}</p>
          </div>
        )}
        
        {gameEnded && (
          <div className="flex flex-col items-center w-full">
            <h3 className="text-xl font-bold text-accent mb-2">{t.gameOver}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">{t.caught} <span className="font-bold text-foreground">{gameScore}</span> {t.mice}</p>
            
            <div className="bg-secondary/20 rounded-xl p-4 w-full max-w-md mb-4">
              <h4 className="text-center font-bold mb-2">{t.scoreboard}</h4>
              <div className="space-y-2">
                {highScores.length === 0 ? (
                  <p className="text-muted-foreground text-center text-sm">{locale === 'nl' ? 'Nog geen scores' : 'No scores yet'}</p>
                ) : (
                  highScores.map((score, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{index + 1}. {score.date}</span>
                      <span className="font-bold">{score.score}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button onClick={startGame} className="rounded-full px-6 font-medium">{t.playAgain}</Button>
              <Button onClick={onClose} variant="outline" className="rounded-full px-6 font-medium bg-transparent">{t.close}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
