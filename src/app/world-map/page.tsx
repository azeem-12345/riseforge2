
"use client"

import GameShell from '@/components/game/GameShell'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Lock, Star, ChevronRight, MapPin, Play, Trophy, Sparkles, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGameState } from '@/hooks/use-game-state'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const WORLDS = [
  { id: 'foundation', name: 'Foundation', color: 'bg-emerald-500', status: 'Active', weeks: 10 },
  { id: 'idea', name: 'Idea to Company', color: 'bg-blue-500', status: 'Locked', weeks: 10 },
  { id: 'growth', name: 'Launch & Growth', color: 'bg-violet-500', status: 'Locked', weeks: 12 },
  { id: 'scaling', name: 'Scaling & Ops', color: 'bg-orange-500', status: 'Locked', weeks: 12 },
  { id: 'elite', name: 'Elite Founder', color: 'bg-red-500', status: 'Locked', weeks: 8 },
]

const ACADEMY_PATH = [
  { id: 'week-1', title: 'The Essence', description: 'Week 1: How to Start a Startup.', type: 'core' },
  { id: 'week-2', title: 'The Team', description: 'Week 2: Hiring & Execution.', type: 'core' },
  { id: 'week-3', title: 'The Truth', description: 'Week 3: Startups Are Counterintuitive.', type: 'core' },
  { id: 'week-4', title: 'Psychology', description: 'Week 4: The consumer mind.', type: 'core' },
  { id: 'week-5', title: 'Finance', description: 'Week 5: Vanities vs Reality.', type: 'core' },
  { id: 'week-6', title: 'Growth', description: 'Week 6: Sustainable Scaling.', type: 'core' },
  { id: 'week-7', title: 'Culture', description: 'Week 7: Building Strong Teams.', type: 'special' },
  { id: 'week-8', title: 'Principled Command', description: 'Week 8: Multi-Perspective Decisions.', type: 'core' },
  { id: 'week-9', title: 'Hiring & Execution', description: 'Week 9: Building Your Core Team.', type: 'core' },
  { id: 'week-10', title: 'Finance & Legal', description: 'Week 10: L1 Graduation.', type: 'boss' },
  { id: 'week-11', title: 'Early Startup Tactics', description: 'Week 11: Do things that don\'t scale.', type: 'core' },
  { id: 'week-12', title: 'From Zero to Many Users', description: 'Week 12: Finding your first champions.', type: 'core' },
  { id: 'week-13', title: 'Mastering Growth', description: 'Week 13: Retention & Virality.', type: 'core' },
  { id: 'week-14', title: 'Advanced Growth', description: 'Week 14: Growth Hacking & Retention.', type: 'core' },
  { id: 'week-15', title: 'Operating a Company', description: 'Week 15: From Chaos to Machine.', type: 'core' },
  { id: 'week-16', title: 'Winning Enterprise', description: 'Week 16: Building for Business.', type: 'core' },
  { id: 'week-17', title: 'Category-Defining IoT', description: 'Week 17: Building integrated hardware/software systems.', type: 'core' },
  { id: 'week-18', title: 'Scaling to a Machine', description: 'Week 18: From Chaos to Scalable Systems.', type: 'core' },
  { id: 'week-19', title: 'User Interviews', description: 'Week 19: Master User Interviews Like Twitch.', type: 'core' },
]

export default function WorldMapPage() {
  const { state } = useGameState()

  const getStatus = (lessonId: string, index: number) => {
    if (state.completedLessons.includes(lessonId)) return 'complete'
    if (index === 0) return 'current'
    const prevId = ACADEMY_PATH[index - 1].id
    if (state.completedLessons.includes(prevId)) return 'current'
    return 'locked'
  }

  return (
    <GameShell>
      <div className="space-y-16 pb-32 max-w-4xl mx-auto">
        {/* Level Selector */}
        <div className="space-y-6">
          <div className="flex justify-between items-end px-2">
             <div className="space-y-1">
                <h1 className="text-xl font-black uppercase tracking-tight">The Academy Path</h1>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Master 52 weeks of elite founder theory.</p>
             </div>
             <div className="hidden sm:flex gap-4">
                <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 border-primary/20">
                   <BookOpen className="w-3.5 h-3.5 text-primary" />
                   <span className="text-[10px] font-black uppercase tracking-widest tabular-nums">{state.completedLessons.length} / 52 WEEKS</span>
                </div>
             </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {WORLDS.map((world) => {
              const isActive = world.id === 'foundation'
              return (
                <motion.div 
                  key={world.id} 
                  whileHover={isActive ? { scale: 1.02, y: -2 } : {}}
                  className={cn(
                  "min-w-[200px] glass-card overflow-hidden group cursor-pointer transition-all border border-white/5",
                  !isActive && "opacity-40 grayscale pointer-events-none"
                )}>
                  <div className="h-24 relative overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/world-${world.id}/400/200`} 
                      alt={world.name} 
                      className="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 transition-all duration-1000" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[11px] uppercase tracking-tight truncate">{world.name}</h3>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 font-black">
                      {isActive ? `${world.weeks} Modules` : 'Locked Level'}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* The Zigzag Path */}
        <div className="relative mt-24 px-4">
          <div className="text-center mb-28">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-4xl font-headline font-black italic primary-gradient tracking-tighter">
                Level 1: Foundation
              </h2>
              <p className="text-[11px] text-muted-foreground mt-2 font-black uppercase tracking-[0.4em]">Strategic Phase: Building the Mental Framework</p>
            </motion.div>
          </div>

          <div className="relative space-y-28">
            {/* Connection Line */}
            <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[150%] pointer-events-none opacity-[0.05]" viewBox="0 0 400 1500" preserveAspectRatio="none">
              <path 
                d="M 200 0 Q 350 150 200 300 Q 50 450 200 600 Q 350 750 200 900 Q 50 1050 200 1200 Q 350 1350 200 1500" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeDasharray="8 8"
              />
            </svg>

            {ACADEMY_PATH.map((node, i) => {
              const status = getStatus(node.id, i)
              const horizontalOffset = i % 2 === 0 ? "md:translate-x-32" : "md:-translate-x-32"
              
              return (
                <motion.div 
                  key={node.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={cn(
                    "relative flex flex-col items-center gap-6",
                    horizontalOffset
                  )}
                >
                  <div className="relative z-20">
                    <Link href={status === 'locked' ? '#' : `/lesson/${node.id}`}>
                      <motion.div
                        whileHover={status !== 'locked' ? { 
                          scale: 1.1, 
                          boxShadow: "0 0 40px rgba(var(--primary), 0.3)" 
                        } : {}}
                        whileTap={status !== 'locked' ? { scale: 0.94 } : {}}
                        className={cn(
                          "w-20 h-20 rounded-full border-[6px] flex items-center justify-center transition-all duration-500 relative cursor-pointer shadow-2xl",
                          status === 'complete' ? "bg-primary border-primary/20 text-primary-foreground" :
                          status === 'current' ? "bg-card border-accent text-accent animate-pulse shadow-[0_0_30px_rgba(0,255,255,0.2)]" :
                          "bg-muted/30 border-white/5 text-muted-foreground/20"
                        )}
                      >
                        {status === 'current' && (
                          <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-30" />
                        )}
                        
                        {status === 'complete' ? (
                          <CheckCircle2 className="w-8 h-8" />
                        ) : status === 'current' ? (
                          <Play className="w-8 h-8 fill-current ml-1" />
                        ) : (
                          <Lock className="w-6 h-6" />
                        )}

                        {node.type === 'boss' && (
                          <div className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-xl border-4 border-background shadow-lg">
                            <Trophy className="w-4 h-4" />
                          </div>
                        )}
                        {node.type === 'special' && (
                          <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground p-2 rounded-xl border-4 border-background shadow-lg">
                            <Sparkles className="w-4 h-4" />
                          </div>
                        )}
                      </motion.div>
                    </Link>
                  </div>

                  <div className="w-full max-w-[140px] text-center space-y-1.5">
                    <h4 className={cn(
                      "font-headline font-black text-[11px] uppercase tracking-tight leading-none",
                      status === 'locked' ? "text-muted-foreground/30" : "text-foreground"
                    )}>{node.title}</h4>
                    {status !== 'locked' && (
                       <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest italic line-clamp-1 px-1">
                        {node.description}
                       </p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </GameShell>
  )
}
