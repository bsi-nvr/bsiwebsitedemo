"use client"

import React, { memo } from 'react'

export type PetVariant = 'luca' | 'zuko' | 'lilly' | 'misty' | 'buddy' | 'buddy'
export type PetEmotion = 'happy' | 'curious' | 'sleepy' | 'shocked' | 'neutral'

interface PetProps {
    variant: PetVariant
    emotion?: PetEmotion
    isWalking?: boolean
    direction?: 1 | -1
    className?: string
    onClick?: () => void
}

export const Pet = memo(function Pet({
    variant,
    emotion = 'neutral',
    isWalking = false,
    direction = 1,
    className = '',
    onClick
}: PetProps) {
    const [isBlinking, setIsBlinking] = React.useState(false)
    const [lookOffset, setLookOffset] = React.useState({ x: 0, y: 0 })

    // IDLE ANIMATIONS
    React.useEffect(() => {
        // Blinking Loop
        const blinkInterval = setInterval(() => {
            setIsBlinking(true)
            setTimeout(() => setIsBlinking(false), 200)
        }, 3000 + Math.random() * 2000)

        // Looking Around Loop
        const lookInterval = setInterval(() => {
            const x = (Math.random() - 0.5) * 4
            const y = (Math.random() - 0.5) * 2
            setLookOffset({ x, y })
            setTimeout(() => setLookOffset({ x: 0, y: 0 }), 1500)
        }, 4000 + Math.random() * 3000)

        return () => {
            clearInterval(blinkInterval)
            clearInterval(lookInterval)
        }
    }, [])

    // Base scales for "Soft-Pop" aesthetic
    // Everything is rounded, bouncy, and distinct

    // CONFIGURATION
    const config = {
        luca: {
            bodyColor: 'bg-gray-900',
            blobShape: 'rounded-[2.5rem]',
            hasMask: true,
            hasSocks: true,
        },
        zuko: {
            bodyColor: 'bg-gray-400',
            blobShape: 'rounded-[2.5rem]',
            hasMask: true,
            maskColor: 'bg-white',
            secondaryColor: 'bg-gray-500' // Darker grey patches
        },
        lilly: {
            bodyColor: 'bg-white', // Base white
            blobShape: 'rounded-[2.5rem]',
            isCalico: true,
        },
        misty: {
            bodyColor: 'bg-white',
            blobShape: 'rounded-[2.2rem]', // Slightly boxier for spaniel feel? No, keep round.
            isSpaniel: true,
        },
        buddy: {
            bodyColor: 'bg-orange-400', // Ginger
            blobShape: 'rounded-[2.5rem]',
            isGinger: true
        }
    }[variant]

    const isDog = variant === 'misty'

    return (
        <div
            className={`relative w-28 h-24 cursor-pointer transition-transform hover:scale-105 active:scale-95 ${className} ${!isWalking ? 'animate-[float_6s_ease-in-out_infinite]' : ''}`}
            onClick={onClick}
            style={{ transform: `scaleX(${direction})` }}
        >
            {/* --- SHADOW BLOB (Grounding) --- */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/10 rounded-full blur-[2px]" />

            {/* --- BODY --- */}
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-16 ${config.bodyColor} ${config.blobShape} shadow-sm z-10 overflow-hidden`}>
                {/* Luca's Classic Tuxedo: White Belly Oval */}
                {variant === 'luca' && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-10 bg-white rounded-t-3xl" />
                )}
                {/* Zuko's White Belly */}
                {variant === 'zuko' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-12 h-10 bg-white/90 rounded-t-xl translate-y-4" />
                )}
                {/* Lilly's Calico Patches (Detailed) */}
                {variant === 'lilly' && (
                    <>
                        {/* Big orange patch on back */}
                        <div className="absolute top-2 left-2 w-8 h-8 bg-orange-300 rounded-full blur-[2px] opacity-90" />
                        {/* Black patch on side */}
                        <div className="absolute bottom-2 right-1 w-6 h-6 bg-gray-800 rounded-full blur-[2px] opacity-90" />
                        {/* Small orange spot near tail */}
                        <div className="absolute bottom-6 right-6 w-3 h-3 bg-orange-300 rounded-full" />
                    </>
                )}
                {/* Misty's Spots */}
                {variant === 'misty' && (
                    <div className="absolute top-2 right-4 w-8 h-8 bg-amber-800/10 rounded-full blur-sm" />
                )}
                {/* Buddy's Stripes (Ginger Tabby) */}
                {variant === 'buddy' && (
                    <>
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-8 bg-orange-300 rounded-full blur-[1px]" />
                        <div className="absolute bottom-4 right-4 w-6 h-2 bg-orange-300 rounded-full blur-[1px]" />
                        <div className="absolute bottom-4 left-4 w-6 h-2 bg-orange-300 rounded-full blur-[1px]" />
                    </>
                )}
                {/* Buddy's Stripes (Ginger Tabby) */}
                {variant === 'buddy' && (
                    <>
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-8 bg-orange-300 rounded-full blur-[1px]" />
                        <div className="absolute bottom-4 right-4 w-6 h-2 bg-orange-300 rounded-full blur-[1px]" />
                        <div className="absolute bottom-4 left-4 w-6 h-2 bg-orange-300 rounded-full blur-[1px]" />
                    </>
                )}
            </div>

            {/* --- HEAD --- */}
            <div
                className={`absolute left-1/2 -translate-x-1/2 -top-2 w-16 h-14 ${config.bodyColor} ${config.blobShape} z-20 shadow-md`}
                style={{
                    transform: emotion === 'curious' ? 'translateX(-50%) rotate(5deg)' : 'translateX(-50%)',
                    transition: 'transform 0.3s ease'
                }}
            >
                {/* EARS */}
                {!isDog ? (
                    // Cat Ears
                    <>
                        <div className={`absolute -top-3 left-0 w-6 h-6 ${config.bodyColor} rounded-tl-2xl rounded-br-2xl transform -rotate-12`} />
                        <div className={`absolute -top-3 right-0 w-6 h-6 ${config.bodyColor} rounded-tr-2xl rounded-bl-2xl transform rotate-12`} />
                        {/* Inner Ear Pink */}
                        <div className="absolute -top-1 left-1 w-3 h-3 bg-pink-300/50 rounded-full" />
                        <div className="absolute -top-1 right-1 w-3 h-3 bg-pink-300/50 rounded-full" />
                    </>
                ) : (
                    // Dog Ears (Protruding & Floppy)
                    <>
                        <div className="absolute top-2 -left-3 w-5 h-10 bg-amber-800 rounded-b-2xl rounded-t-md origin-top animate-[sway_3s_infinite_ease-in-out]" />
                        <div className="absolute top-2 -right-3 w-5 h-10 bg-amber-800 rounded-b-2xl rounded-t-md origin-top animate-[sway_3s_infinite_ease-in-out_reverse]" />
                    </>
                )}

                {/* LUCA'S MASK (Classic Tuxedo V4) */}
                {variant === 'luca' && (
                    <>
                        {/* Simple White Muzzle Area */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-6 bg-white rounded-t-2xl" />
                        {/* Tiny nose bridge notch? No, keep it clean. */}
                    </>
                )}
                {/* ZUKO'S MASK */}
                {variant === 'zuko' && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-6 bg-white rounded-t-2xl" />
                )}

                {/* FACE FEATURES */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 z-30">
                    {/* Eyes */}
                    <div
                        className="flex gap-3 transition-transform duration-500 ease-out"
                        style={{ transform: `translate(${lookOffset.x}px, ${lookOffset.y}px)` }}
                    >
                        <div className={`w-3 h-3 rounded-full ${variant === 'luca' ? 'bg-emerald-400' : variant === 'zuko' ? 'bg-yellow-400' : 'bg-black'} relative overflow-hidden`}>
                            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-80" />
                            {emotion === 'sleepy' && <div className="absolute inset-0 bg-gray-900/50" />}
                            {isBlinking && <div className="absolute inset-0 bg-gray-900 scale-y-100 z-10" />}
                        </div>
                        <div className={`w-3 h-3 rounded-full ${variant === 'luca' ? 'bg-emerald-400' : variant === 'zuko' ? 'bg-yellow-400' : 'bg-black'} relative overflow-hidden`}>
                            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-80" />
                            {emotion === 'sleepy' && <div className="absolute inset-0 bg-gray-900/50" />}
                            {isBlinking && <div className="absolute inset-0 bg-gray-900 scale-y-100 z-10" />}
                        </div>
                    </div>

                    {/* Nose/Mouth */}
                    <div className="mt-1 flex flex-col items-center">
                        <div className={`w-2 h-1.5 rounded-full ${variant === 'luca' ? 'bg-black' : 'bg-pink-400'}`} />
                        <div className="w-px h-1 bg-gray-400/50" />
                        <div className="flex -mt-1 opacity-50">
                            <div className={`w-1.5 h-1 border-b border-r ${variant === 'luca' ? 'border-black' : 'border-gray-600'} rounded-br-full rotate-45`} />
                            <div className={`w-1.5 h-1 border-b border-l ${variant === 'luca' ? 'border-black' : 'border-gray-600'} rounded-bl-full -rotate-45 -ml-px`} />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- TAIL --- */}
            <div className="absolute top-6 -right-2 z-0">
                <div className={`w-4 h-12 ${config.bodyColor} rounded-full origin-bottom animate-[tailWag_3s_ease-in-out_infinite]`} >
                    {variant === 'luca' && <div className="absolute top-0 left-0 w-full h-4 bg-white rounded-full" />}
                </div>
            </div>

            {/* --- LEGS (Walking Animation) --- */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-4 z-20 flex justify-between">
                {/* Front Left */}
                <div className={`w-3 h-5 ${config.bodyColor} rounded-full absolute left-0 bottom-0 ${isWalking ? 'animate-[legMove_0.6s_ease-in-out_infinite]' : ''}`}>
                    {variant === 'luca' && <div className="absolute bottom-0 w-full h-2 bg-white rounded-b-full" />}
                </div>
                {/* Front Right */}
                <div className={`w-3 h-5 ${config.bodyColor} rounded-full absolute right-0 bottom-0 ${isWalking ? 'animate-[legMove_0.6s_ease-in-out_infinite_0.3s]' : ''}`}>
                    {variant === 'luca' && <div className="absolute bottom-0 w-full h-2 bg-white rounded-b-full" />}
                </div>
            </div>

        </div>
    )
})
