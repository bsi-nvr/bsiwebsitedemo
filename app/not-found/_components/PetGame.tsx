"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Pet } from './Pet'
import { Button } from "@/components/ui/button"
import { Trophy, X, Zap, Skull, Shield } from "lucide-react"

// --- TYPES ---
type GameState = 'MENU' | 'PLAYING' | 'GAME_OVER' | 'VICTORY'
type EntityType = 'bug' | 'glitch' | 'vacuum'

interface Enemy {
    id: number
    x: number // %
    y: number // %
    type: EntityType
    row: number
}

interface Bullet {
    id: number
    x: number
    y: number
    vy: number
}

// --- CONSTANTS ---
const PLAYER_Y = 90 // % from top
const PLAYER_WIDTH = 6
const PLAYER_SPEED = 1.5
const BULLET_SPEED = 2
const ENEMY_WIDTH = 5
const ENEMY_HEIGHT = 6

export function PetGame({ onClose, locale }: { onClose: () => void; locale: string }) {
    // UI STATE
    const [gameState, setGameState] = useState<GameState>('MENU')
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [wave, setWave] = useState(1)

    // GAME STATE REFS
    const playerX = useRef(50) // %
    const keys = useRef<{ [key: string]: boolean }>({})
    const enemies = useRef<Enemy[]>([])
    const bullets = useRef<Bullet[]>([]) // Player bullets
    const bombs = useRef<Bullet[]>([]) // Enemy bullets

    // Enemy Movement State
    const enemyDir = useRef(1) // 1 = Right, -1 = Left
    const enemySpeed = useRef(0.15)

    const frameRef = useRef<number>(0)
    const lastShotTime = useRef(0)

    // FORCE RENDER
    const [tick, setTick] = useState(0)

    const t = locale === 'nl' ? {
        title: 'Void Invaders',
        desc: 'Bescherm de code tegen de bugs!',
        start: 'Start Missie',
        score: 'Score',
        gameOver: 'Systeem Gecrasht',
        victory: 'Bugs Verwijderd!',
        controls: 'Pijltjes: Bewegen • Spatie: Schieten',
        close: 'Afsluiten'
    } : {
        title: 'Void Invaders',
        desc: 'Protect the code from bugs!',
        start: 'Start Mission',
        score: 'Score',
        gameOver: 'System Crashed',
        victory: 'Bugs Cleared!',
        controls: 'Arrows: Move • Space: Shoot',
        close: 'Shutdown'
    }

    // --- SETUP ---
    useEffect(() => {
        const saved = localStorage.getItem('void_invaders_highscore')
        if (saved) setHighScore(parseInt(saved))
    }, [])

    const initLevel = (level: number) => {
        const rows = 2 + Math.min(3, Math.floor(level / 2)) // V22.1: Start with 2 rows
        const cols = 5 + Math.min(5, Math.floor(level / 3)) // V22.1: Fewer cols
        const newEnemies: Enemy[] = []

        const startY = 10
        const spacingX = 10 // V22.1: More spacing
        const spacingY = 8

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let type: EntityType = 'bug'
                if (r === 0) type = 'vacuum' // Bosses top row
                else if (r % 2 === 0) type = 'glitch'

                newEnemies.push({
                    id: Date.now() + r * 100 + c,
                    x: 10 + c * spacingX,
                    y: startY + r * spacingY,
                    type,
                    row: r
                })
            }
        }
        enemies.current = newEnemies
        // V22.1: Slower start speed (0.05 vs 0.15)
        enemySpeed.current = 0.05 + (level * 0.02)
        enemyDir.current = 1
        bullets.current = []
        bombs.current = []
        playerX.current = 50
    }

    const startGame = () => {
        setScore(0)
        setWave(1)
        initLevel(1)
        setGameState('PLAYING')
    }

    // --- CONTROLS ---
    useEffect(() => {
        const handleDown = (e: KeyboardEvent) => {
            keys.current[e.code] = true
            if (e.code === 'Space' || e.code === 'KeyW') { // V22.1: W to shoot
                e.preventDefault()
            }
            if (['ArrowUp', 'ArrowDown', 'KeyW', 'KeyS'].includes(e.code)) e.preventDefault()
            if (e.code === 'Escape') onClose()
        }
        const handleUp = (e: KeyboardEvent) => keys.current[e.code] = false

        window.addEventListener('keydown', handleDown)
        window.addEventListener('keyup', handleUp)
        return () => {
            window.removeEventListener('keydown', handleDown)
            window.removeEventListener('keyup', handleUp)
        }
    }, [onClose])

    // --- GAME LOOP ---
    const loop = useCallback(() => {
        if (gameState !== 'PLAYING') return

        // 1. PLAYER MOVEMENT (WASD support)
        if (keys.current['ArrowLeft'] || keys.current['KeyA']) playerX.current = Math.max(2, playerX.current - PLAYER_SPEED)
        if (keys.current['ArrowRight'] || keys.current['KeyD']) playerX.current = Math.min(98 - PLAYER_WIDTH, playerX.current + PLAYER_SPEED)

        // 2. SHOOTING
        if (keys.current['Space'] || keys.current['KeyW']) {
            const now = Date.now()
            if (now - lastShotTime.current > 400) { // 400ms cooldown
                bullets.current.push({ id: now, x: playerX.current + PLAYER_WIDTH / 2 - 0.5, y: PLAYER_Y, vy: -BULLET_SPEED })
                lastShotTime.current = now
            }
        }

        // 3. BULLETS UPDATE
        bullets.current.forEach(b => b.y += b.vy)
        bullets.current = bullets.current.filter(b => b.y > -5)

        // 4. BOMBS UPDATE (Enemy bullets)
        bombs.current.forEach(b => b.y += b.vy)
        bombs.current = bombs.current.filter(b => b.y < 105)

        // 5. ENEMY MOVEMENT
        let hitEdge = false
        enemies.current.forEach(e => {
            e.x += enemySpeed.current * enemyDir.current
            if (e.x <= 2 || e.x >= 98 - ENEMY_WIDTH) hitEdge = true
        })

        if (hitEdge) {
            enemyDir.current *= -1
            enemies.current.forEach(e => e.y += 4) // Drop down
        }

        // 6. COLLISIONS
        // Bullet vs Enemy
        bullets.current.forEach(b => {
            // Check collision with any enemy
            const hitIdx = enemies.current.findIndex(e =>
                b.x > e.x && b.x < e.x + ENEMY_WIDTH &&
                b.y > e.y && b.y < e.y + ENEMY_HEIGHT
            )
            if (hitIdx !== -1) {
                const enemy = enemies.current[hitIdx]
                // Remove bullet & enemy
                b.y = -999
                enemies.current.splice(hitIdx, 1)

                // Score
                setScore(s => s + (enemy.type === 'vacuum' ? 50 : 10))
            }
        })
        bullets.current = bullets.current.filter(b => b.y !== -999)

        // Player vs Bomb/Enemy
        const playerHitbox = { x: playerX.current + 1, y: PLAYER_Y, w: PLAYER_WIDTH - 2, h: 5 }

        let dead = false
        // Check Bombs
        if (bombs.current.some(b =>
            b.x > playerHitbox.x && b.x < playerHitbox.x + playerHitbox.w &&
            b.y > playerHitbox.y && b.y < playerHitbox.y + playerHitbox.h
        )) dead = true

        // Check Enemy Touch (Invasion)
        if (enemies.current.some(e => e.y + ENEMY_HEIGHT > PLAYER_Y)) dead = true

        if (dead) {
            setGameState('GAME_OVER')
            if (score > highScore) {
                setHighScore(score)
                localStorage.setItem('void_invaders_highscore', score.toString())
            }
        }

        // 7. ENEMY SHOOTING
        // V22.2: Ultra slow start (0.001 base = approx 1 shot every 16s at 60fps)
        if (Math.random() < 0.001 * (wave)) { // Scales linearly with wave
            if (enemies.current.length > 0) {
                // Shoot from a random active column bottom
                const shooter = enemies.current[Math.floor(Math.random() * enemies.current.length)]
                bombs.current.push({ id: Date.now(), x: shooter.x + ENEMY_WIDTH / 2, y: shooter.y + ENEMY_HEIGHT, vy: 1 })
            }
        }

        // 8. WAVE CLEAR check
        if (enemies.current.length === 0) {
            // Next Level!
            setWave(w => w + 1)
            initLevel(wave + 1)
        }

        setTick(t => t + 1)
        frameRef.current = requestAnimationFrame(loop)
    }, [gameState, score, highScore, wave])

    // START/STOP
    useEffect(() => {
        if (gameState === 'PLAYING') {
            frameRef.current = requestAnimationFrame(loop)
        }
        return () => cancelAnimationFrame(frameRef.current)
    }, [gameState, loop])


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in"
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className="relative w-full max-w-4xl aspect-[4/3] bg-gray-900 border-4 border-green-500/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,255,0,0.2)] select-none">

                {/* HUD */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between font-mono text-green-400 z-20 bg-gradient-to-b from-black/80 to-transparent">
                    <div>SCORE: {score.toString().padStart(6, '0')}</div>
                    <div>HI: {highScore.toString().padStart(6, '0')}</div>
                    <div>WAVE: {wave}</div>
                    <button onClick={onClose}><X className="text-white hover:text-red-500" /></button>
                </div>

                {/* GAME WORLD */}
                {gameState === 'PLAYING' && (
                    <div className="absolute inset-0">
                        {/* Player */}
                        <div
                            className="absolute transition-transform duration-75"
                            style={{
                                left: `${playerX.current}%`,
                                top: `${PLAYER_Y}%`,
                                width: `${PLAYER_WIDTH}%`,
                                height: '8%'
                            }}
                        >
                            <Pet variant="luca" direction={1} isWalking={false} emotion="shocked" className="w-full h-full" />
                        </div>

                        {/* Enemies */}
                        {enemies.current.map(e => (
                            <div key={e.id}
                                className="absolute animate-pulse"
                                style={{
                                    left: `${e.x}%`,
                                    top: `${e.y}%`,
                                    width: `${ENEMY_WIDTH}%`,
                                    height: `${ENEMY_HEIGHT}%`
                                }}
                            >
                                {e.type === 'bug' && <span className="text-2xl">👾</span>}
                                {e.type === 'glitch' && <span className="text-2xl">🐛</span>}
                                {e.type === 'vacuum' && <span className="text-2xl">🛸</span>}
                            </div>
                        ))}

                        {/* Bullets */}
                        {bullets.current.map(b => (
                            <div key={b.id}
                                className="absolute bg-green-400 shadow-[0_0_10px_lime]"
                                style={{
                                    left: `${b.x}%`,
                                    top: `${b.y}%`,
                                    width: '0.5%',
                                    height: '2%'
                                }}
                            />
                        ))}

                        {/* Bombs */}
                        {bombs.current.map(b => (
                            <div key={b.id}
                                className="absolute bg-red-500 shadow-[0_0_10px_red]"
                                style={{
                                    left: `${b.x}%`,
                                    top: `${b.y}%`,
                                    width: '1%',
                                    height: '2%',
                                    borderRadius: '50%'
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* MENU */}
                {gameState === 'MENU' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-emerald-800 mb-8 tracking-widest font-mono">
                            VOID INVADERS
                        </h1>
                        <p className="text-green-500/80 mb-12 font-mono text-xl">{t.desc}</p>
                        <Button
                            onClick={startGame}
                            className="bg-green-600 hover:bg-green-500 text-black font-bold text-xl px-12 py-6 rounded-none border-2 border-green-400 shadow-[0_0_20px_rgba(0,255,0,0.4)]"
                        >
                            {t.start}
                        </Button>
                        <p className="mt-8 text-green-500/50 font-mono text-sm border border-green-500/20 px-4 py-2 rounded">
                            {t.controls}
                        </p>
                    </div>
                )}

                {/* GAME OVER (BSOD STYLE) */}
                {(gameState === 'GAME_OVER' || gameState === 'VICTORY') && (
                    <div className="absolute inset-0 z-40 bg-[#0078D7] p-12 flex flex-col items-start justify-center text-white font-mono select-none animate-in fade-in duration-75">
                        {/* Sad Face */}
                        <div className="text-9xl mb-8">:(</div>

                        <h2 className="text-2xl mb-8 leading-snug">
                            {gameState === 'GAME_OVER' ?
                                (locale === 'nl' ? 'Er is een probleem opgetreden en de game moet opnieuw opstarten.' : 'Your game ran into a problem and needs to restart.')
                                : (locale === 'nl' ? 'Systeem hersteld. Bugs verwijderd.' : 'System restored. Bugs cleared.')
                            }
                        </h2>

                        <div className="text-sm mt-4 mb-8">
                            <p>For more information about this issue and possible fixes, visit https://www.brainsoft.nl/404</p>
                            <p className="mt-4">
                                {locale === 'nl' ? 'Stopcode' : 'Stop code'}: <span className="font-bold">{gameState === 'GAME_OVER' ? 'CRITICAL_BUG_INVASION' : 'SUCCESSFUL_DEBUG'}</span>
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <Button onClick={startGame} className="bg-white text-[#0078D7] hover:bg-gray-100 font-bold px-6 py-4 rounded-none">
                                {locale === 'nl' ? 'Opnieuw Opstarten' : 'Reboot System'}
                            </Button>
                            <Button onClick={onClose} variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-4 rounded-none">
                                {t.close}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
