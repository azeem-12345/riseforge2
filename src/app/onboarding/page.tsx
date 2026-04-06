
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Rocket, 
  ChevronRight, 
  Target, 
  Brain, 
  Zap,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Flame,
  LineChart
} from 'lucide-react'
import { useGameState, UserProfile } from '@/hooks/use-game-state'
import { Progress } from '@/components/ui/progress'

const onboardingQuestions = [
  {
    id: 'goal',
    title: 'Identify your primary trajectory',
    options: [
      { text: 'Launch First Venture', val: 'Start' },
      { text: 'Scale Operations', val: 'Scale' },
      { text: 'Hypothesis Validation', val: 'Explore' },
    ],
    icon: Target
  },
  {
    id: 'experience',
    title: 'Assess tactical experience',
    options: [
      { text: 'Explorer (Beginner)', val: 'Beginner' },
      { text: 'Builder (Intermediate)', val: 'Intermediate' },
      { text: 'Architect (Advanced)', val: 'Advanced' },
    ],
    icon: Brain
  },
  {
    id: 'dna',
    title: 'Define your dominant archetype',
    options: [
      { text: 'Risk Specialist', val: 'Risk' },
      { text: 'Strategic Analyst', val: 'Strategy' },
      { text: 'Growth Engineer', val: 'Growth' },
    ],
    icon: Zap
  }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    dna: { 
      type: 'Unassigned',
      riskTolerance: 50,
      creativity: 50,
      financialAcumen: 50,
      leadership: 50,
      decisionSpeed: 50
    }
  })
  const [isCalculated, setIsCalculated] = useState(false)
  const router = useRouter()
  const { updateState } = useGameState()

  const handleOptionClick = (val: string) => {
    const key = onboardingQuestions[currentStep].id
    setProfile(prev => ({ ...prev, [key]: val }))

    if (currentStep < onboardingQuestions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      finalizeOnboarding()
    }
  }

  const finalizeOnboarding = () => {
    setIsCalculated(true)
    
    // Simulate DNA calculation logic
    const finalProfile = {
      ...profile,
      dna: {
        type: profile.dna === 'Risk' ? 'The Audacious' : 'The Analyst',
        riskTolerance: profile.dna === 'Risk' ? 85 : 40,
        creativity: 70,
        financialAcumen: 60,
        leadership: 65,
        decisionSpeed: 75
      }
    } as UserProfile

    setTimeout(() => {
      updateState(prev => ({
        ...prev,
        onboarded: true,
        profile: finalProfile,
        founderStage: 'Dreamer',
        reputation: 100
      }))
      router.push('/dashboard')
    }, 3000)
  }

  const currentQuestion = onboardingQuestions[currentStep]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="max-w-2xl w-full space-y-12 relative z-10">
        {!isCalculated ? (
          <>
            <div className="flex justify-between items-center px-2">
              {onboardingQuestions.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 mx-1 flex-1 rounded-full transition-all duration-700 ${idx <= currentStep ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-white/5'}`} 
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="text-center space-y-4">
                  {currentQuestion && (
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-6 shadow-2xl">
                      {(() => {
                        const Icon = currentQuestion.icon
                        return <Icon className="w-10 h-10" />
                      })()}
                    </div>
                  )}
                  <h1 className="text-4xl font-headline font-black tracking-tight leading-none">
                    {currentQuestion?.title}
                  </h1>
                  <p className="text-[10px] uppercase font-black tracking-[0.4em] text-muted-foreground">Operating System Calibration Phase {currentStep + 1}</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion?.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(option.val)}
                      className="p-6 text-left rounded-2xl border border-white/5 bg-card/40 backdrop-blur-xl hover:border-primary/50 hover:bg-primary/5 transition-all group flex items-center justify-between shadow-xl"
                    >
                      <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {option.text}
                      </span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center space-y-12 py-10"
          >
            <div className="relative w-40 h-40 mx-auto">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <ShieldCheck className="w-16 h-16 text-primary animate-pulse" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-headline font-black tracking-tighter">Initializing Founder OS</h2>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">Sequencing Cognitive DNA & Market Readiness...</p>
            </div>
            <div className="max-w-xs mx-auto space-y-3">
              <Progress value={85} className="h-1 bg-white/5" />
              <div className="flex justify-between text-[8px] font-black text-primary uppercase tracking-widest">
                 <span>Calibrating</span>
                 <span>85%</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
