"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { Home, FileX, Zap, Users, Heart } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { AchievementProvider, useAchievements } from "./not-found/_components/Achievements"
import { Pet, PetVariant } from "./not-found/_components/Pet"
import { PetGame } from "./not-found/_components/PetGame"

// --- TYPES ---
type EntityState = {
  x: number
  y: number
  rotation: number
  scaleX: number
  scaleY: number
  emotion: 'happy' | 'curious' | 'sleepy' | 'shocked' | 'neutral'
  isWalking: boolean
}

type GameMode = 'IDLE' | 'LASER' | 'TAG' | 'SLEEP' | 'LEAVE' | 'YARN' | 'PAGE' | 'FETCH' | 'SASS' | 'LOVE'

const HEADER_HEIGHT = 100 // Approximation
const FLOOR_Y = 0 // Relative to container bottom

export default function NotFound() {
  const { locale } = useLanguage()

  return (
    <AchievementProvider locale={locale}>
      <NotFoundContent locale={locale} />
    </AchievementProvider>
  )
}

function NotFoundContent({ locale }: { locale: string }) {
  const { unlockAchievement } = useAchievements()!
  // --- STATE ---
  const [showGame, setShowGame] = useState(false)
  const [speech, setSpeech] = useState<string | null>(null)
  const [speaker, setSpeaker] = useState<'luca' | 'visitor'>('luca') // V20: Track who is speaking
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [jokeIndex, setJokeIndex] = useState(0)

  // ... (rest of state) ...

  // Helper to speak
  const speak = (text: string, duration = 3000, who: 'luca' | 'visitor' = 'luca') => { // Updated signature
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current)
    setSpeech(text)
    setSpeaker(who)
    speechTimeoutRef.current = setTimeout(() => {
      setSpeech(null)
      setSpeaker('luca') // Reset default
    }, duration)
  }

  // ... (rest of component) ...

  // V20: Buddy Dialogues
  const BUDDY_DIALOGUES_NL = [
    { l: "404.", b: "Net als je plan." },
    { b: "Kijk! Het is Buddy!", l: "Helaas wel." },
    { l: "Pagina niet gevonden.", b: "Dat hadden we door." },
    { b: "Misschien refreshen?", l: "Misschien nadenken." },
    { l: "Verkeerde URL.", b: "Verkeerde keuzes." },
    { b: "404 fout.", l: "Gebruikersfout." },
    { l: "We zijn verdwaald.", b: "Jij bent verdwaald." },
    { b: "Oeps.", l: "Klassiek." },
    { l: "Deze pagina bestaat niet.", b: "Net als je geluk." },
    { b: "Ik kan helpen!", l: "Dat is schattig." },
    { b: "Zijn we er al?", l: "Nee." },
    { l: "Dit is ongemakkelijk.", b: "Een beetje." },
    { b: "Tenminste zijn we samen.", l: "Oké. Dat helpt." },
    { l: "Niet gevonden.", b: "Maar we hebben het geprobeerd!" },
    { b: "Moeten we in paniek raken?", l: "Later." },
    { l: "Hier is niets.", b: "Net als je zoekactie." },
    { b: "Het werkte net nog!", l: "Tuurlijk." },
    { l: "Nog steeds aan het laden.", b: "Nog steeds jij." },
    { b: "We hebben het kapotgemaakt.", l: "Jij hebt het kapotgemaakt." },
    { l: "Weer een 404.", b: "Indrukwekkend." }
  ]

  const BUDDY_DIALOGUES_EN = [
    { l: "404.", b: "Like your plan." },
    { b: "Look! It’s Buddy!", l: "Unfortunately." },
    { l: "Page not found.", b: "We noticed." },
    { b: "Maybe refresh?", l: "Maybe think." },
    { l: "Wrong URL.", b: "Choices." }, // Shortened to fit
    { b: "404 error.", l: "User error." },
    { l: "We are lost.", b: "You are lost." },
    { b: "Oops.", l: "Classic." },
    { l: "This page doesn't exist.", b: "Like your luck." },
    { b: "I can help!", l: "That's cute." },
    { b: "Are we there yet?", l: "No." },
    { l: "This is awkward.", b: "A little." },
    { b: "At least we're together.", l: "Okay. That helps." },
    { l: "Not found.", b: "But we tried!" },
    { b: "Should we panic?", l: "Later." },
    { l: "Nothing here.", b: "Like your search." },
    { b: "It worked just now!", l: "Sure." },
    { l: "Still loading.", b: "Still you." },
    { b: "We broke it.", l: "You broke it." },
    { l: "Another 404.", b: "Impressive." }
  ]

  const [hearts, setHearts] = useState<{ id: number, x: number, y: number, op: number, v: number }[]>([])

  // V18.10: Black Hole Easter Egg
  const [clickCount, setClickCount] = useState(0)
  const [blackHoleActive, setBlackHoleActive] = useState(false)

  // --- GAME STATE ---
  const [mode, setMode] = useState<GameMode>('IDLE')
  const [visitor, setVisitor] = useState<PetVariant | null>(null)

  // We use Refs for physics to avoid React render lag, then sync to State for render
  const lucaRef = useRef<EntityState & { opacity: number }>({ x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, emotion: 'neutral', isWalking: false, opacity: 1 })
  const visitorRef = useRef<EntityState & { opacity: number }>({ x: 100, y: 0, rotation: 0, scaleX: -1, scaleY: 1, emotion: 'neutral', isWalking: false, opacity: 1 })
  const targetRef = useRef({ x: 0, y: 0 })
  const laserRef = useRef({ x: 0, y: 0, active: false })
  const ballRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, active: false })

  // Render State (Synced from Refs)
  const [renderTrigger, setRenderTrigger] = useState(0)

  // --- SPEECH SYSTEM ---


  // --- VISITOR SPAWN ---
  const spawnVisitor = (variant: PetVariant) => {
    setVisitor(variant)
    // Reset visitor pos to visible area
    visitorRef.current = { ...visitorRef.current, x: 200, y: 0, scaleX: -1, isWalking: false, opacity: 1 }
    if (mode === 'IDLE') {
      const text = locale === 'nl' ? `Kijk! ${variant} is er!` : `Look! It's ${variant}!`
      speak(text, 3000)
    }
  }

  // --- GAME LOOP ---
  useEffect(() => {
    const loopInterval = setInterval(() => {
      const luca = lucaRef.current
      const vis = visitorRef.current
      const target = targetRef.current
      const ball = ballRef.current

      // --- BLACK HOLE MODE ---
      if (blackHoleActive) {
        // Suck everything to center (0, -100)
        const cx = 0
        const cy = -100

        // Luca
        luca.x += (cx - luca.x) * 0.1
        luca.y += (cy - luca.y) * 0.1
        luca.scaleX *= 0.9
        luca.scaleY *= 0.9
        luca.rotation += 10
        luca.opacity *= 0.9

        // Visitor
        if (visitor) {
          vis.x += (cx - vis.x) * 0.1
          vis.y += (cy - vis.y) * 0.1
          vis.scaleX *= 0.9
          vis.scaleY *= 0.9
          vis.rotation += 10
          vis.opacity *= 0.9
        }

        setRenderTrigger(prev => prev + 1)
        return // Skip normal logic
      }

      // --- 1. BEHAVIOR LOGIC ---

      // MODE: IDLE
      if (mode === 'IDLE') {
        const ldx = 0 - luca.x
        luca.x += ldx * 0.02
        luca.isWalking = Math.abs(ldx) > 5
        luca.scaleX = ldx > 0 ? 1 : -1
        luca.scaleY = 1 + Math.sin(Date.now() / 300) * 0.05
        luca.rotation = 0
        luca.emotion = 'neutral'
        luca.opacity = 1

        vis.isWalking = false
        vis.scaleY = 1 + Math.sin(Date.now() / 350) * 0.05
        vis.opacity = 1
      }

      // MODE: LOVE (Lilly & Luca Snuggle - V19 REWRITE)
      else if (mode === 'LOVE') {
        const ldx = -30 - luca.x
        luca.x += ldx * 0.05

        // Luca Faces Right (towards Lilly)
        luca.scaleX = 1

        if (Math.abs(ldx) < 5) {
          luca.isWalking = false
          luca.emotion = 'happy'
          // Spawn Hearts
          if (Math.random() < 0.1) {
            setHearts(h => [...h, { id: Date.now(), x: 0, y: -50, op: 1, v: 1 + Math.random() }])
          }
        } else {
          luca.isWalking = true
        }

        if (visitor) {
          const vdx = 30 - vis.x
          vis.x += vdx * 0.05
          // Lilly Faces Left (towards Luca)
          vis.scaleX = -1

          if (Math.abs(vdx) < 5) {
            vis.isWalking = false
            vis.emotion = 'happy'
          } else {
            vis.isWalking = true
          }
        }
      }

      // MODE: LASER (Autonomous V24.5)
      else if (mode === 'LASER') {
        // 1. Move Laser Dot Randomly
        // We reuse targetRef for the "Next Laser Destination" to save memory/refs
        const dest = targetRef.current
        const laser = laserRef.current

        // Check distance to destination
        const distToDest = Math.hypot(dest.x - laser.x, dest.y - laser.y)

        // Pick new destination if close or randomly
        if (distToDest < 20 || Math.random() < 0.02) {
          dest.x = (Math.random() - 0.5) * 600 // -300 to 300
          dest.y = -Math.random() * 200 // 0 to -200 (Floor is 0)
        }

        // Move Laser smoothly
        laser.x += (dest.x - laser.x) * 0.15
        laser.y += (dest.y - laser.y) * 0.15

        // 2. Luca tracks laser
        const dx = laser.x - luca.x
        const dy = laser.y - luca.y

        // Luca Speed
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          luca.x += dx * 0.09
          luca.y += dy * 0.09
          luca.isWalking = true
          luca.scaleX = dx > 0 ? 1 : -1
          luca.emotion = 'happy'
        } else {
          luca.isWalking = false
          luca.emotion = 'neutral'
          // If caught, maybe pause laser? Nah, keep it erratic.
        }

        // 3. Visitor tracks too
        if (visitor) {
          const vdx = laser.x - vis.x
          const vdy = laser.y - vis.y
          if (Math.abs(vdx) > 5 || Math.abs(vdy) > 5) {
            vis.x += vdx * 0.08
            vis.y += vdy * 0.08
            vis.isWalking = true
            vis.scaleX = vdx > 0 ? 1 : -1
            vis.emotion = 'happy'
          } else {
            vis.isWalking = false
            vis.emotion = 'neutral'
          }
        }
      }

      // MODE: FETCH (Misty - V21 GIFT REWRITE)
      else if (mode === 'FETCH') {
        // 3 Phases: 
        // 1. CHASE/APPROACH: ball.active = false. Misty walks to Luca. Bone attached to Misty.
        // 2. DROP: ball.active = true. Bone falls. Misty happy.
        // 3. REACT: Wait a bit, Luca speaks, Misty leaves.

        if (!ball.active && visitor) {
          // Phase 1: Approach
          const targetX = luca.x + 60 // Stop 60px to right of Luca
          const dx = targetX - vis.x

          if (Math.abs(dx) > 5) {
            vis.x += (dx > 0 ? 1 : -1) * 4
            vis.isWalking = true
            vis.scaleX = dx > 0 ? 1 : -1

            // Bone Logic: Attach to Mouth
            // Misty Mouth Offset approx: X: + 10 (facing right) or -10, Y: -20
            const mouthOffsetX = vis.scaleX > 0 ? 15 : -15
            ball.x = vis.x + mouthOffsetX
            ball.y = vis.y - 15
          } else {
            // Arrived! Phase 2: Drop
            vis.isWalking = false
            vis.scaleX = -1 // Face Luca

            ball.active = true // Physics on
            ball.vx = -2 // Toss slightly to Luca
            ball.vy = -3

            // Schedule Phase 3 (Reaction) - One-off via timeout logic or trigger?
            // Use a simple timeout wrapper referenced by a ref? 
            // Or just check if ball is on ground.
          }
        }
        else if (ball.active) {
          // Phase 2: Physics Fall
          ball.x += ball.vx
          ball.y += ball.vy
          ball.vy += 0.5

          if (ball.y >= 0) {
            ball.y = 0
            ball.vy = 0
            ball.vx = 0
            // Landed

            if (visitor && visitorRef.current.emotion !== 'happy') {
              visitorRef.current.emotion = 'happy' // Mark as processed
              // Immediately trigger reaction (overwrite speech if needed)
              setTimeout(() => {
                speak(locale === 'nl' ? 'Bedankt...?' : 'Thanks...?', 2000, 'luca')
                setTimeout(() => setMode('LEAVE'), 3000)
              }, 500)
            }
          }
        }

        // Luca watches
        luca.scaleX = ball.x > luca.x ? 1 : -1
      }

      // MODE: SASS (Buddy - V19 REWRITE)
      else if (mode === 'SASS') {
        if (visitor) {
          const dx = target.x - vis.x
          if (Math.abs(dx) > 5) {
            vis.x += (dx > 0 ? 1 : -1) * 3
            vis.isWalking = true
            vis.scaleX = dx > 0 ? 1 : -1
          } else {
            vis.isWalking = false
            vis.emotion = 'neutral'
            vis.scaleX = -1 // Face screen/Luca
          }
        }
        // Luca looks at Buddy
        if (visitor) luca.scaleX = vis.x > luca.x ? 1 : -1
      }

      // MODE: TAG (Zuko)
      else if (mode === 'TAG') {
        if (Math.random() > 0.95) target.x = (Math.random() - 0.5) * 500
        const zdx = target.x - vis.x
        vis.x += zdx * 0.1
        vis.scaleX = zdx > 0 ? 1 : -1
        vis.isWalking = true

        const ldx = (vis.x - 70 * Math.sign(vis.scaleX)) - luca.x
        luca.x += ldx * 0.07
        luca.scaleX = ldx > 0 ? 1 : -1
        luca.isWalking = true
        luca.emotion = 'happy'
      }

      // MODE: LEAVE
      else if (mode === 'LEAVE' && visitor) {
        luca.emotion = 'neutral'
        luca.scaleY = 1
        luca.isWalking = false
        luca.rotation = 0

        vis.isWalking = true
        vis.emotion = 'happy'
        vis.scaleY = 1
        vis.rotation = 0
        vis.x += 3 // Slower walk
        vis.scaleX = 1

        // Smoother Linear Fade Out starting at x=150
        if (vis.x > 150) {
          vis.opacity = Math.max(0, vis.opacity - 0.008)
        }

        if (vis.x > 600 || vis.opacity <= 0) {
          setVisitor(null)
          setMode('IDLE')
          vis.opacity = 1
        }
      }

      // Physics Separation
      if (visitor && mode !== 'SLEEP' && mode !== 'FETCH') {
        const dist = Math.abs(luca.x - vis.x)
        const minSpacing = 80
        if (dist < minSpacing) {
          const push = (minSpacing - dist) * 0.1
          if (luca.x < vis.x) { luca.x -= push; vis.x += push }
          else { luca.x += push; vis.x -= push }
        }
      }

      // 2. PARTICLE UPDATE
      setHearts(prev => prev.map(h => ({ ...h, y: h.y - h.v, op: h.op - 0.01 })).filter(h => h.op > 0))

      setRenderTrigger(prev => prev + 1)
    }, 30) // 30 FPS

    return () => clearInterval(loopInterval)
  }, [mode, visitor, locale, speech])

  // V24.5: AUTONOMOUS LASER (No Mouse Tracking)
  // Logic is now entirely inside the Game Loop to keep it synced.
  // We use laserRef.current to store position (x, y) and active state.
  // We'll use extra properties on laserRef if needed, or just random walk.

  // --- INTERACTION HANDLERS ---
  const handleLaser = () => {
    if (mode !== 'IDLE' && mode !== 'LASER') return
    setMode('LASER')
    speak(locale === 'nl' ? 'Pak hem!' : 'Get it!', 2000)
    setTimeout(() => {
      setMode('SLEEP')
      speak(locale === 'nl' ? 'Even uitrusten...' : 'Nap time...', 3000)
      if (visitorRef.current) {
        setTimeout(() => {
          speak(locale === 'nl' ? 'Doei!' : 'Bye bye!')
          setMode('LEAVE')
        }, 7000)
      } else {
        setTimeout(() => setMode('IDLE'), 7000)
      }
    }, 8000)
  }

  const handlePage = () => {
    if (mode !== 'IDLE') return
    setMode('PAGE')
    speak(locale === 'nl' ? 'Nom nom 404...' : 'Nom nom 404...', 2000)
    setTimeout(() => {
      setMode('IDLE')
      speak(locale === 'nl' ? 'Smaakt naar pixels.' : 'Tastes like pixels.', 2000)
    }, 5000)
  }

  const handleLucaClick = () => {
    const jokes = locale === 'nl' ? JOKES_NL : JOKES_EN
    // V18.8: Ordered Jokes
    const nextJoke = jokes[jokeIndex % jokes.length]
    setJokeIndex(prev => prev + 1)

    speak(nextJoke, 4000)
    lucaRef.current.scaleY = 0.8
    setTimeout(() => lucaRef.current.scaleY = 1, 200)
  }

  const handleTag = (friend: PetVariant) => {
    if (mode !== 'IDLE' && mode !== 'LEAVE') return
    if (visitor) return

    spawnVisitor(friend) // Also resets position/opacity

    if (friend === 'zuko') {
      setMode('TAG')
      speak('TAG!', 2000)
      setTimeout(() => {
        speak(locale === 'nl' ? 'Poeh, ik ben moe. Doei!' : 'Phew, tired now. Bye!', 3000)
        setMode('LEAVE')
      }, 12000)

    } else if (friend === 'misty') {
      // V21: Misty brings a Gift
      setMode('FETCH')
      // Initial: Bone is held by Misty (inactive physics)
      ballRef.current = { x: 0, y: 0, vx: 0, vy: 0, active: false }

      speak(locale === 'nl' ? 'Kijk wat ik heb!' : 'Look what I found!', 2000, 'visitor')

      // No timeouts needed here, the loop does the sequence.

    } else if (friend === 'buddy') {
      // V20: Buddy Dialogues
      setMode('SASS')
      targetRef.current = { x: 70, y: 0 }

      const dialogues = locale === 'nl' ? BUDDY_DIALOGUES_NL : BUDDY_DIALOGUES_EN
      const dialogue = dialogues[Math.floor(Math.random() * dialogues.length)]

      // Wait for walk in (1.5s)
      setTimeout(() => {
        // Check who speaks first
        if (dialogue.b && !dialogue.l) {
          speak(dialogue.b, 3000, 'visitor')
        } else if (dialogue.l && !dialogue.b) { // Should not happen in data but safety
          speak(dialogue.l, 3000, 'luca')
        } else {
          // Conversation
          // SIMPLER STRATEGY:
          // I will just use the text.
          // Case 1: Luca First
          if (Object.keys(dialogue)[0] === 'l') {
            speak(dialogue.l as string, 2500, 'luca')
            setTimeout(() => speak(dialogue.b as string, 3000, 'visitor'), 3000)
          } else {
            speak(dialogue.b as string, 2500, 'visitor')
            setTimeout(() => speak(dialogue.l as string, 3000, 'luca'), 3000)
          }
        }
      }, 1500)

      setTimeout(() => {
        setMode('LEAVE')
      }, 8500)

    } else if (friend === 'lilly') {
      speak(locale === 'nl' ? 'Hoi Lilly!' : 'Hi Lilly!', 2000, 'luca')
      setTimeout(() => {
        // V18.10: Love Mode
        setMode('LOVE')
        speak(locale === 'nl' ? 'Vriendjes!' : 'Best friends!', 2000)

        setTimeout(() => {
          speak(locale === 'nl' ? 'Doei Lilly!' : 'Bye Lilly!')
          setMode('LEAVE')
        }, 8000)
      }, 1000)

    } else {
      setMode('IDLE')
      speak(locale === 'nl' ? `Hoi ${friend}!` : `Hi ${friend}!`)
      setTimeout(() => setMode('LEAVE'), 5000)
    }
  }

  const t = locale === 'nl' ? {
    subtitle: 'Oeps! Deze pagina is verdwaald in de ruimte.',
    description: 'De pagina die je zoekt is waarschijnlijk opgezogen door een zwart gat of verstopt achter een sterrennevel.',
    homeButton: 'Terug naar Home',
    play: 'Speel een spelletje?',
    menu: { friends: 'Vrienden' },
    interactCue: 'Speel met mij!'
  } : {
    subtitle: 'Oops! This page is lost in space.',
    description: 'The page you are looking for has likely been sucked into a black hole or is hiding behind a nebula.',
    homeButton: 'Back to Home',
    play: 'Play a game?',
    menu: { friends: 'Friends' },
    interactCue: 'Play with me!'
  }

  return (
    <main className="min-h-screen flex flex-col bg-background relative overflow-hidden font-sans selection:bg-emerald-500/30 transition-colors duration-500">
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="flex-grow flex flex-col items-center justify-center relative z-10 px-4">
        <h1
          className={`text-9xl font-black text-black dark:text-white mb-4 select-none cursor-pointer transition-transform duration-700 ${blackHoleActive ? 'scale-0 rotate-[720deg]' : 'hover:scale-105 active:scale-95'}`}
          onClick={() => {
            if (blackHoleActive) return
            handlePage() // Eat animation
            setClickCount(c => c + 1)
            if (clickCount + 1 >= 5) {
              setBlackHoleActive(true)
              speak('OH NO! A BLACK HOLE!', 5000)
              setTimeout(() => {
                setBlackHoleActive(false)
                setClickCount(0)
                // Reset positions
                lucaRef.current = { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, emotion: 'neutral', isWalking: false, opacity: 1 }
                setMode('IDLE')
              }, 6000)
            }
          }}
          title="Nom nom? (Click 5 times for destruction)"
        >
          404
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-center max-w-2xl">{t.subtitle}</h2>
        <p className="text-lg text-muted-foreground max-w-xl text-center mb-6">{t.description}</p>

        <div className="flex gap-4 mb-20">
          <Link href="/" className="px-8 py-3 bg-foreground text-background rounded-full font-bold hover:scale-105 transition-transform">
            {t.homeButton}
          </Link>
          <button onClick={() => setShowGame(true)} className="px-8 py-3 border-2 border-foreground text-foreground rounded-full font-bold hover:bg-foreground hover:text-background transition-colors">
            {t.play}
          </button>
        </div>

        {/* CONTAINER FOR PETS & GAME UI - V18.14: Increased height to h-96 for bubble space */}
        <div className="relative w-full max-w-4xl h-96 mt-8 flex items-end justify-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-4 bg-background/50 p-2 rounded-full backdrop-blur-md z-50 border border-foreground/10 shadow-lg">
            <button onClick={handleLaser} className={`p-3 rounded-full hover:scale-110 transition-transform ${mode === 'LASER' ? 'bg-red-500/20' : 'bg-transparent'}`} title="Laser">
              <Zap className="w-6 h-6 text-red-500" />
            </button>
            {/* V19: Removed Eat Page Button */}
            <div className="w-[1px] h-8 bg-foreground/20 my-auto" />
            <button onClick={() => handleTag('zuko')} className="p-3 bg-blue-500/10 rounded-full hover:scale-110 transition-transform" title="Zuko">
              <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white" />
            </button>
            <button onClick={() => handleTag('lilly')} className="p-3 bg-orange-500/10 rounded-full hover:scale-110 transition-transform" title="Lilly">
              <div className="w-6 h-6 rounded-full bg-orange-300 border-2 border-white" />
            </button>
            <button onClick={() => handleTag('misty')} className="p-3 bg-purple-500/10 rounded-full hover:scale-110 transition-transform" title="Misty">
              <div className="w-6 h-6 rounded-full bg-purple-400 border-2 border-white" />
            </button>
            <button onClick={() => handleTag('buddy')} className="p-3 bg-amber-500/10 rounded-full hover:scale-110 transition-transform" title="Buddy">
              <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-white" />
            </button>
          </div>

          {/* FETCH BALL / BONE */}
          {mode === 'FETCH' && (
            <div
              className={`absolute shadow-md z-10 ${ballRef.current.active ? 'opacity-100' : 'opacity-0'}`}
              style={{
                transform: `translate(${ballRef.current.x}px, ${ballRef.current.y}px) rotate(${ballRef.current.x * 2}deg)`,
                width: '32px', height: '12px', background: 'white', borderRadius: '4px' // Bone Shape Base
              }}
            >
              {/* Bone Ends */}
              <div className="absolute -left-1 -top-1 w-4 h-4 rounded-full bg-white" />
              <div className="absolute -left-1 bottom-1 w-4 h-4 rounded-full bg-white" />
              <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-white" />
              <div className="absolute -right-1 bottom-1 w-4 h-4 rounded-full bg-white" />
            </div>
          )}

          {/* ... LASER ... */}
          {mode === 'LASER' && (
            <div
              className="absolute w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_red] z-0"
              style={{
                transform: `translate(${laserRef.current.x}px, ${laserRef.current.y}px)`,
                transition: 'transform 0.05s linear'
              }}
            />
          )}

          {/* ... EAT PAGE ... */}
          {/* ... LOVE PARTICLES ... */}
          {hearts.map(h => (
            <Heart key={h.id} className="absolute text-red-500 fill-red-500 w-6 h-6 z-40"
              style={{
                left: '50%',
                bottom: '40px',
                transform: `translate(calc(-50% + ${h.x}px), ${h.y}px)`,
                opacity: h.op
              }} />
          ))}

          {mode === 'SLEEP' && visitor && lucaRef.current.emotion === 'sleepy' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-20 flex gap-4 animate-pulse z-50">
              <Heart className="text-pink-400 fill-pink-400 w-8 h-8" />
              <Heart className="text-pink-400 fill-pink-400 w-6 h-6 mt-4" />
            </div>
          )}

          {/* LUCA */}
          <div
            className="absolute bottom-10 transition-transform duration-75 ease-linear will-change-transform"
            style={{
              transform: `translate(${lucaRef.current.x}px, ${lucaRef.current.y}px) rotate(${lucaRef.current.rotation}deg)`,
              opacity: lucaRef.current.opacity
            }}
          >
            <Pet
              variant="luca"
              emotion={lucaRef.current.emotion}
              isWalking={lucaRef.current.isWalking}
              direction={lucaRef.current.scaleX as 1 | -1}
              className="transition-transform"
              onClick={handleLucaClick}
            />
          </div>

          {/* VISITOR */}
          {visitor && (
            <div
              className="absolute bottom-10 transition-transform duration-75 ease-linear will-change-transform"
              style={{
                transform: `translate(${visitorRef.current.x}px, ${visitorRef.current.y}px) rotate(${visitorRef.current.rotation}deg)`,
                opacity: visitorRef.current.opacity
              }}
            >
              <Pet
                variant={visitor}
                emotion={visitorRef.current.emotion}
                isWalking={visitorRef.current.isWalking}
                direction={visitorRef.current.scaleX as 1 | -1}
              />
            </div>
          )}

          {/* V20: TOP-LEVEL SPEECH BUBBLES WITH SPEAKER STATE */}
          {/* Luca Bubble (Left Side) */}
          {speech && speaker === 'luca' && (
            <div
              className="absolute w-40 bg-white dark:bg-zinc-800 text-black dark:text-white p-3 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-center animate-in zoom-in slide-in-from-right-2 transition-transform duration-75"
              style={{
                zIndex: 9999, // Force Top
                bottom: '60px', // Head height
                left: '50%',
                transform: `translateX(calc(-50% + ${lucaRef.current.x}px - 140px))`
              }}
            >
              {speech}
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-zinc-800 rotate-45 border-t border-r border-gray-200 dark:border-gray-700"></div>
            </div>
          )}

          {/* Visitor Bubble (Right Side) */}
          {speech && speaker === 'visitor' && visitor && (
            <div
              className="absolute w-40 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 p-3 rounded-xl shadow-xl border border-amber-200 dark:border-amber-800 text-sm font-medium text-center animate-in zoom-in slide-in-from-left-2 transition-transform duration-75"
              style={{
                zIndex: 9999,
                bottom: '60px',
                left: '50%',
                transform: `translateX(calc(-50% + ${visitorRef.current.x}px + 140px))`
              }}
            >
              {speech}
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-amber-100 dark:bg-amber-900 rotate-45 border-b border-l border-amber-200 dark:border-amber-800"></div>
            </div>
          )}
        </div>
      </div>

      {showGame && <PetGame onClose={() => setShowGame(false)} locale={locale} />}
    </main>
  )
}

const JOKES_NL = [
  '🐱 404: Oeps, geen Luca te bekennen hier! Of een pagina.',
  '🧶 404: Luca raakte afgeleid door een bolletje wol. En nu zijn we de pagina kwijt.',
  '🐈‍⬛ 404: Als ik het niet zie, bestaat het niet. Kattenlogica.',
  '🛏️ 404: Luca doet een dutje. Kom later terug.',
  '🐭 404: We dachten dat het een muis was. Het was een kapotte link.'
]

const JOKES_EN = [
  '🐱 404: Oops, no Luca to be seen here! Or a page.',
  '🧶 404: Luca got distracted by a yarn ball. And now we lost the page.',
  '🐈‍⬛ 404: If I don\'t see it, it doesn\'t exist. Cat logic.',
  '🛏️ 404: Luca is taking a nap. Come back later.',
  '🐭 404: We thought it was a mouse. It was a broken link.'
]
