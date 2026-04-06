"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Sparkles, Rocket, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGameState } from '@/hooks/use-game-state'

export default function LevelUpModal() {
  const { state, dismissLevelUp } = useGameState()

  return (
    <AnimatePresence>
      {state.showLevelUp && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/95 backdrop-blur-2xl"
        >
          {/* Background Particles/Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <motion.div 
               animate={{ 
                 scale: [1, 1.5, 1],
                 opacity: [0.3, 0.6, 0.3]
               }}
               transition={{ duration: 5, repeat: Infinity }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" 
             />
          </div>

          <motion.div
            initial={{ scale: 0.8, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="glass-card max-w-md w-full p-12 text-center space-y-8 border-primary/50 relative overflow-hidden shadow-[0_0_100px_rgba(var(--primary),0.2)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x" />
            
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 m-auto w-32 h-32 bg-primary/30 blur-[60px] rounded-full"
              />
              <motion.div
                initial={{ rotate: -20, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Trophy className="w-24 h-24 text-primary mx-auto relative z-10 drop-shadow-[0_0_30px_rgba(var(--primary),0.5)]" />
              </motion.div>
            </div>

            <div className="space-y-3 relative z-10">
              <p className="text-primary font-black uppercase tracking-[0.5em] text-[10px]">Strategic Ascension Detected</p>
              <h2 className="text-6xl font-headline font-black tracking-tighter">Level {state.level}</h2>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="text-sm font-bold text-primary">{state.levelTitle}</p>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed italic px-4">
              "Your tactical depth is expanding. New realms of knowledge are now within your reach."
            </p>

            <Button 
              onClick={dismissLevelUp} 
              className="w-full h-14 rounded-2xl text-lg font-black shadow-2xl shadow-primary/30 bg-primary hover:scale-[1.02] active:scale-95 transition-all"
            >
              RESUME FORGE <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
