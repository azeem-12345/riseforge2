
"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X, Lightbulb, Target, Rocket, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGameState } from '@/hooks/use-game-state'

interface PageGuideProps {
  pageKey: string
  title: string
  description: string
  icon?: React.ReactNode
}

export default function PageGuide({ pageKey, title, description, icon }: PageGuideProps) {
  const { state, markTutorialSeen } = useGameState()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!state.seenTutorials.includes(pageKey)) {
      setIsOpen(true)
    }
  }, [state.seenTutorials, pageKey])

  const handleDismiss = () => {
    setIsOpen(false)
    markTutorialSeen(pageKey)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-8 right-8 z-[100] max-w-sm w-full"
        >
          <div className="glass-card border-primary/30 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden bg-background/90">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            
            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                {icon || <Lightbulb className="w-5 h-5" />}
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">{title}</h3>
                <p className="text-[13px] text-foreground font-medium leading-relaxed">
                  {description}
                </p>
                <Button 
                  size="sm" 
                  onClick={handleDismiss}
                  className="rounded-lg h-8 text-[10px] font-black uppercase tracking-widest"
                >
                  I understand
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
