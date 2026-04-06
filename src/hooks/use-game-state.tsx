
"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserLevel = 'Explorer' | 'Builder' | 'Creator' | 'Innovator' | 'Visionary' | 'Gamechanger'
export type FounderStage = 'Dreamer' | 'Builder' | 'Operator' | 'Strategist' | 'Visionary' | 'Empire Architect'

export interface CognitiveSkills {
  strategicThinking: number
  financialIntelligence: number
  riskAnalysis: number
  negotiation: number
  marketAwareness: number
  leadership: number
}

export interface Employee {
  id: string
  role: 'Developer' | 'Designer' | 'Marketing' | 'Sales' | 'Finance' | 'HR'
  skill: number
  salary: number
  satisfaction: number
  burnout: number
}

export interface VirtualCompany {
  name: string
  mission: string
  type: 'SaaS' | 'E-commerce' | 'Agency' | 'Manufacturing' | 'EdTech' | 'Media' | 'MobileApp'
  legalStructure: 'SoleProp' | 'Partnership' | 'PvtLtd'
  revenue: number
  expenses: number
  employees: Employee[]
  stage: 'Seed' | 'Series A' | 'Series B' | 'Growth' | 'IPO'
  valuation: number
  burnRate: number
  cash: number
  debt: number
  equity: number
  productQuality: number
  complianceScore: number
}

export interface UserProfile {
  goal: string
  experience: 'Beginner' | 'Intermediate' | 'Advanced'
  commitment: string
  interests: string[]
  dna: {
    type: string
    riskTolerance: number
    creativity: number
    financialAcumen: number
    leadership: number
    decisionSpeed: number
  }
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
  founderStage: FounderStage
  reputation: number
  skills: CognitiveSkills
  streak: number
  lastActive: number
  completedLessons: string[]
  unlockedModules: string[]
  seenTutorials: string[]
  badges: Badge[]
  onboarded: boolean
  profile: UserProfile | null
  company: VirtualCompany | null
  founderStats: {
    stress: number
    energy: number
  }
  showLevelUp: boolean
}

const DEFAULT_SKILLS: CognitiveSkills = {
  strategicThinking: 10,
  financialIntelligence: 10,
  riskAnalysis: 10,
  negotiation: 10,
  marketAwareness: 10,
  leadership: 10
}

const DEFAULT_STATE: GameState = {
  name: 'Future Founder',
  xp: 0,
  level: 1,
  levelTitle: 'Explorer',
  founderStage: 'Dreamer',
  reputation: 0,
  skills: DEFAULT_SKILLS,
  streak: 0,
  lastActive: Date.now(),
  completedLessons: [],
  unlockedModules: ['dashboard', 'world-map', 'simulation', 'company', 'pitch-arena', 'challenge-arena', 'idea-lab', 'mentor', 'leaderboard'], 
  seenTutorials: [],
  badges: [],
  onboarded: false,
  profile: null,
  company: null,
  founderStats: {
    stress: 0,
    energy: 100
  },
  showLevelUp: false
}

export const getXPForLevel = (level: number) => Math.floor(100 * Math.pow(level, 1.8))

const STAGES: FounderStage[] = ['Dreamer', 'Builder', 'Operator', 'Strategist', 'Visionary', 'Empire Architect']

interface GameStateContextType {
  state: GameState
  updateState: (updater: (prev: GameState) => GameState) => void
  addXP: (amount: number, source?: string) => void
  updateSkills: (updates: Partial<CognitiveSkills>) => void
  addReputation: (amount: number) => void
  completeLesson: (lessonId: string, xpReward: number, unlockKey?: string) => void
  dismissLevelUp: () => void
  markTutorialSeen: (pageKey: string) => void
  unlockBadge: (badge: Omit<Badge, 'unlockedAt'>) => void
  updateCompany: (company: Partial<VirtualCompany>) => void
  updateFounderStats: (stats: Partial<GameState['founderStats']>) => void
  isLoaded: boolean
  xpToNext: number
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined)

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(DEFAULT_STATE)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('riseforge_ceo_v1')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setState({
          ...DEFAULT_STATE,
          ...parsed,
          skills: { ...DEFAULT_SKILLS, ...parsed.skills },
          founderStats: { ...DEFAULT_STATE.founderStats, ...parsed.founderStats },
          unlockedModules: Array.from(new Set([...(parsed.unlockedModules || []), ...DEFAULT_STATE.unlockedModules])),
          seenTutorials: parsed.seenTutorials || []
        })
      } catch (e) {
        console.error("Failed to parse game state", e)
      }
    }
    setIsLoaded(true)
  }, [])

  const updateState = (updater: (prev: GameState) => GameState) => {
    setState(prev => {
      const newState = updater(prev)
      localStorage.setItem('riseforge_ceo_v1', JSON.stringify(newState))
      return newState
    })
  }

  const addXP = (amount: number) => {
    updateState(prev => {
      let currentTotalXP = prev.xp + amount
      let currentLevel = prev.level
      let leveledUp = false
      
      let nextLevelThreshold = getXPForLevel(currentLevel)
      
      while (currentTotalXP >= nextLevelThreshold) {
        currentTotalXP -= nextLevelThreshold
        currentLevel++
        leveledUp = true
        nextLevelThreshold = getXPForLevel(currentLevel)
      }

      const titles: UserLevel[] = ['Explorer', 'Builder', 'Creator', 'Innovator', 'Visionary', 'Gamechanger']
      const titleIndex = Math.min(Math.floor(currentLevel / 5), titles.length - 1)
      
      const stageIndex = Math.min(Math.floor(currentLevel / 10), STAGES.length - 1)
      const newStage = STAGES[stageIndex]

      return { 
        ...prev, 
        xp: currentTotalXP, 
        level: currentLevel, 
        levelTitle: titles[titleIndex],
        founderStage: newStage,
        showLevelUp: leveledUp
      }
    })
  }

  const updateSkills = (updates: Partial<CognitiveSkills>) => {
    updateState(prev => ({
      ...prev,
      skills: { ...prev.skills, ...updates }
    }))
  }

  const addReputation = (amount: number) => {
    updateState(prev => ({
      ...prev,
      reputation: prev.reputation + amount
    }))
  }

  const updateCompany = (updates: Partial<VirtualCompany>) => {
    updateState(prev => ({
      ...prev,
      company: prev.company ? { ...prev.company, ...updates } : {
        name: 'New Venture',
        mission: 'Forge the future.',
        type: 'SaaS',
        legalStructure: 'SoleProp',
        revenue: 0,
        expenses: 0,
        employees: [],
        stage: 'Seed',
        valuation: 1000000,
        burnRate: 0,
        cash: 50000,
        debt: 0,
        equity: 100,
        productQuality: 100,
        complianceScore: 100,
        ...updates
      } as VirtualCompany
    }))
  }

  const updateFounderStats = (updates: Partial<GameState['founderStats']>) => {
    updateState(prev => ({
      ...prev,
      founderStats: { ...prev.founderStats, ...updates }
    }))
  }

  const completeLesson = (lessonId: string, xpReward: number, unlockKey?: string) => {
    updateState(prev => {
      const newUnlocked = unlockKey && !prev.unlockedModules.includes(unlockKey) 
        ? [...prev.unlockedModules, unlockKey] 
        : prev.unlockedModules;
      
      if (prev.completedLessons.includes(lessonId)) {
        return {
          ...prev,
          unlockedModules: newUnlocked
        }
      }
      
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        unlockedModules: newUnlocked
      }
    })
    addXP(xpReward)
    updateSkills({ strategicThinking: state.skills.strategicThinking + 2 })
    addReputation(5)
  }

  const dismissLevelUp = () => {
    updateState(prev => ({ ...prev, showLevelUp: false }))
  }

  const markTutorialSeen = (pageKey: string) => {
    updateState(prev => {
      if (prev.seenTutorials.includes(pageKey)) return prev
      return { ...prev, seenTutorials: [...prev.seenTutorials, pageKey] }
    })
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

  const value = {
    state,
    updateState,
    addXP,
    updateSkills,
    addReputation,
    completeLesson,
    dismissLevelUp,
    markTutorialSeen,
    unlockBadge,
    updateCompany,
    updateFounderStats,
    isLoaded,
    xpToNext: getXPForLevel(state.level)
  }

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  )
}

export function useGameState() {
  const context = useContext(GameStateContext)
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider')
  }
  return context
}
