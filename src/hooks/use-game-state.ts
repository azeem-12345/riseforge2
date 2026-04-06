"use client"

import { useState, useEffect } from 'react'

export type UserLevel = 'Explorer' | 'Builder' | 'Creator' | 'Innovator' | 'Visionary' | 'Gamechanger'

export interface UserProfile {
  goal: string
  experience: 'Beginner' | 'Intermediate' | 'Advanced'
  commitment: string
  interests: string[]
}

export interface Badge {
  id: string
  name: string
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Elite'
  unlockedAt: number
  description: string
}

export interface GameState {
  name: string
  xp: number
  level: number
  levelTitle: UserLevel
  streak: number
  lastActive: number
  completedLessons: string[]
  badges: Badge[]
  onboarded: boolean
  profile: UserProfile | null
  showLevelUp: boolean
}

const DEFAULT_STATE: GameState = {
  name: 'Future Founder',
  xp: 0,
  level: 1,
  levelTitle: 'Explorer',
  streak: 0,
  lastActive: Date.now(),
  completedLessons: [],
  badges: [],
  onboarded: false,
  profile: null,
  showLevelUp: false
}

export const getXPForLevel = (level: number) => Math.floor(100 * Math.pow(level, 1.5))

export function useGameState() {
  const [state, setState] = useState<GameState>(DEFAULT_STATE)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('riseforge_v4_state')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setState(prev => ({
          ...DEFAULT_STATE,
          ...parsed,
          profile: parsed.profile || null,
          completedLessons: parsed.completedLessons || []
        }))
      } catch (e) {
        console.error("Failed to parse game state", e)
      }
    }
    setIsLoaded(true)
  }, [])

  const updateState = (updater: (prev: GameState) => GameState) => {
    setState(prev => {
      const newState = updater(prev)
      localStorage.setItem('riseforge_v4_state', JSON.stringify(newState))
      return newState
    })
  }

  const addXP = (amount: number) => {
    updateState(prev => {
      let currentXP = prev.xp + amount
      let currentLevel = prev.level
      let leveledUp = false
      
      while (currentXP >= getXPForLevel(currentLevel)) {
        currentXP -= getXPForLevel(currentLevel)
        currentLevel++
        leveledUp = true
      }

      const titles: UserLevel[] = ['Explorer', 'Builder', 'Creator', 'Innovator', 'Visionary', 'Gamechanger']
      const titleIndex = Math.min(Math.floor(currentLevel / 5), titles.length - 1)

      return { 
        ...prev, 
        xp: currentXP, 
        level: currentLevel, 
        levelTitle: titles[titleIndex],
        showLevelUp: leveledUp
      }
    })
  }

  const completeLesson = (lessonId: string, xpReward: number) => {
    updateState(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId]
      }
    })
    addXP(xpReward)
  }

  const dismissLevelUp = () => {
    updateState(prev => ({ ...prev, showLevelUp: false }))
  }

  const unlockBadge = (badge: Omit<Badge, 'unlockedAt'>) => {
    updateState(prev => {
      if (prev.badges.some(b => b.id === badge.id)) return prev
      return {
        ...prev,
        badges: [...prev.badges, { ...badge, unlockedAt: Date.now() }]
      }
    })
  }

  return { 
    state, 
    updateState, 
    addXP, 
    completeLesson,
    dismissLevelUp,
    unlockBadge,
    isLoaded,
    xpToNext: getXPForLevel(state.level)
  }
}
