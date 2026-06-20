"use client"

import GameShell from '@/components/game/GameShell'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Lock, Star, ChevronRight, Play, Trophy, Sparkles, BookOpen, Clock, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGameState } from '@/hooks/use-game-state'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const WORLDS = [
  { id: 'foundation', name: 'Foundation', status: 'Active', weeks: 10 },
  { id: 'idea', name: 'Idea to Company', status: 'Locked', weeks: 10 },
  { id: 'growth', name: 'Launch & Growth', status: 'Locked', weeks: 12 },
  { id: 'scaling', name: 'Scaling & Ops', status: 'Locked', weeks: 12 },
  { id: 'elite', name: 'Elite Founder', status: 'Locked', weeks: 8 },
]

const ACADEMY_PATH = [
  { 
    id: 'week-1', 
    title: 'The Essence', 
    description: 'Week 1: How to Start a Startup.', 
    type: 'core',
    topic: 'Strategy',
    duration: '10 mins',
    xp: '+80 XP',
    overview: 'The fundamental mindsets of elite founders, starting lean, and validating problems.',
    skills: 'Strategy, Risk'
  },
  { 
    id: 'week-2', 
    title: 'The Team', 
    description: 'Week 2: Hiring & Execution.', 
    type: 'core',
    topic: 'Leadership',
    duration: '12 mins',
    xp: '+80 XP',
    overview: 'How to choose co-founders, divide equity, and establish initial velocity.',
    skills: 'Leadership, Negotiation'
  },
  { 
    id: 'week-3', 
    title: 'The Truth', 
    description: 'Week 3: Startups Are Counterintuitive.', 
    type: 'core',
    topic: 'Strategy',
    duration: '15 mins',
    xp: '+80 XP',
    overview: 'Why conventional business advice fails in high-growth startups.',
    skills: 'Strategy, Risk'
  },
  { 
    id: 'week-4', 
    title: 'Psychology', 
    description: 'Week 4: The consumer mind.', 
    type: 'core',
    topic: 'Market',
    duration: '14 mins',
    xp: '+80 XP',
    overview: 'Understanding user pain points and developing a customer-centric feedback loop.',
    skills: 'Market, Negotiation'
  },
  { 
    id: 'week-5', 
    title: 'Finance', 
    description: 'Week 5: Vanities vs Reality.', 
    type: 'core',
    topic: 'Finance',
    duration: '18 mins',
    xp: '+100 XP',
    overview: 'Demystifying runway, burn rate, and unit economics calculations.',
    skills: 'Finance, Strategy'
  },
  { 
    id: 'week-6', 
    title: 'Growth', 
    description: 'Week 6: Sustainable Scaling.', 
    type: 'core',
    topic: 'Market',
    duration: '15 mins',
    xp: '+80 XP',
    overview: 'Channel discovery, acquisition loops, and optimizing user retention.',
    skills: 'Market, Finance'
  },
  { 
    id: 'week-7', 
    title: 'Culture', 
    description: 'Week 7: Building Strong Teams.', 
    type: 'special',
    topic: 'Leadership',
    duration: '11 mins',
    xp: '+80 XP',
    overview: 'Establishing company values, early employee motivation, and trust frameworks.',
    skills: 'Leadership'
  },
  { 
    id: 'week-8', 
    title: 'Principled Command', 
    description: 'Week 8: Multi-Perspective Decisions.', 
    type: 'core',
    topic: 'Strategy',
    duration: '16 mins',
    xp: '+80 XP',
    overview: 'Making high-stakes decisions under extreme uncertainty.',
    skills: 'Strategy, Risk'
  },
  { 
    id: 'week-9', 
    title: 'Hiring & Execution', 
    description: 'Week 9: Building Your Core Team.', 
    type: 'core',
    topic: 'Leadership',
    duration: '12 mins',
    xp: '+80 XP',
    overview: 'Structuring interview loops and managing performance metrics.',
    skills: 'Leadership'
  },
  { 
    id: 'week-10', 
    title: 'Finance & Legal', 
    description: 'Week 10: L1 Graduation.', 
    type: 'boss',
    topic: 'Finance',
    duration: '25 mins',
    xp: '+200 XP',
    overview: 'The final L1 exam: term sheets, dilution math, and board management.',
    skills: 'Finance, Negotiation'
  },
  { 
    id: 'week-11', 
    title: 'Early Startup Tactics', 
    description: 'Week 11: Do things that don\'t scale.', 
    type: 'core',
    topic: 'Strategy',
    duration: '12 mins',
    xp: '+80 XP',
    overview: 'Manual customer acquisition and hands-on onboarding strategies.',
    skills: 'Strategy, Market'
  },
  { 
    id: 'week-12', 
    title: 'From Zero to Many Users', 
    description: 'Week 12: Finding your first champions.', 
    type: 'core',
    topic: 'Market',
    duration: '15 mins',
    xp: '+80 XP',
    overview: 'How to find early adopters and turn them into passionate advocates.',
    skills: 'Market'
  },
  { 
    id: 'week-13', 
    title: 'Mastering Growth', 
    description: 'Week 13: Retention & Virality.', 
    type: 'core',
    topic: 'Market',
    duration: '14 mins',
    xp: '+80 XP',
    overview: 'Building virality engines and keeping retention curves flat.',
    skills: 'Market, Finance'
  },
  { 
    id: 'week-14', 
    title: 'Advanced Growth', 
    description: 'Week 14: Growth Hacking & Retention.', 
    type: 'core',
    topic: 'Market',
    duration: '18 mins',
    xp: '+100 XP',
    overview: 'Advanced frameworks for growth loops, channel scaling, and metrics.',
    skills: 'Market, Finance'
  },
  { 
    id: 'week-15', 
    title: 'Operating a Company', 
    description: 'Week 15: From Chaos to Machine.', 
    type: 'core',
    topic: 'Strategy',
    duration: '16 mins',
    xp: '+80 XP',
    overview: 'Structuring standard operations, setting OKRs, and reporting metrics.',
    skills: 'Strategy, Leadership'
  },
  { 
    id: 'week-16', 
    title: 'Winning Enterprise', 
    description: 'Week 16: Building for B2B.', 
    type: 'core',
    topic: 'Market',
    duration: '15 mins',
    xp: '+80 XP',
    overview: 'Enterprise sales cycles, contract negotiations, and security compliance.',
    skills: 'Market, Negotiation'
  },
  { 
    id: 'week-17', 
    title: 'Category-Defining IoT', 
    description: 'Week 17: Integrated Hardware Systems.', 
    type: 'core',
    topic: 'Strategy',
    duration: '20 mins',
    xp: '+100 XP',
    overview: 'The complexities of launching hardware, supply chains, and manufacturing.',
    skills: 'Strategy, Risk'
  },
  { 
    id: 'week-18', 
    title: 'Scaling to a Machine', 
    description: 'Week 18: From Chaos to Scalable Systems.', 
    type: 'core',
    topic: 'Leadership',
    duration: '18 mins',
    xp: '+80 XP',
    overview: 'Delegation frameworks, hiring senior leadership, and corporate governance.',
    skills: 'Leadership, Strategy'
  },
  { 
    id: 'week-19', 
    title: 'User Interviews', 
    description: 'Week 19: Master User Interviews Like Twitch.', 
    type: 'core',
    topic: 'Market',
    duration: '14 mins',
    xp: '+80 XP',
    overview: 'Extracting clean, unbiased insights from active customer feedback loops.',
    skills: 'Market, Negotiation'
  },
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
      <div className="space-y-10 pb-32 max-w-4xl mx-auto">
        {/* Header section */}
        <div className="space-y-4 border-b border-white/5 pb-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">Academy Curriculum</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">The Academy Path</h1>
              <p className="text-xs md:text-sm text-muted-foreground font-normal">
                Master 52 weeks of elite founder theory and mental models.
              </p>
            </div>
            <div className="hidden sm:flex gap-4">
              <div className="bg-white/5 border border-white/5 px-4 py-2 rounded-xl flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
                  {state.completedLessons.length} / 52 Modules
                </span>
              </div>
            </div>
          </div>

          {/* Level selector tabs */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
            {WORLDS.map((world) => {
              const isActive = world.id === 'foundation'
              return (
                <motion.div 
                  key={world.id} 
                  whileHover={isActive ? { scale: 1.01, y: -1 } : {}}
                  className={cn(
                    "glass-card p-4 rounded-xl cursor-pointer transition-all border relative overflow-hidden",
                    isActive ? "bg-white/[0.02] border-white/10" : "opacity-30 border-white/5 grayscale pointer-events-none"
                  )}
                >
                  {isActive && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 blur-xl rounded-full" />
                  )}
                  <h3 className="font-semibold text-xs text-foreground tracking-tight">{world.name}</h3>
                  <div className="flex justify-between items-center mt-3 text-[10px] text-muted-foreground uppercase font-mono">
                    <span>{isActive ? `${world.weeks} Modules` : 'Locked'}</span>
                    {isActive ? (
                      <span className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded text-[9px] font-medium border border-emerald-500/20">Active</span>
                    ) : (
                      <Lock className="w-3 h-3 text-muted-foreground/50" />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Phase Header */}
        <div className="text-center py-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            Strategic Phase: Building the Mental Framework
          </h2>
          <p className="text-xs text-muted-foreground mt-1 font-normal">Level 1: Foundation Modules</p>
        </div>

        {/* Timeline path container */}
        <div className="relative mt-8 max-w-3xl mx-auto px-4">
          {/* Vertical central tracking line */}
          <div className="absolute left-10 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/80 via-primary/30 to-white/5 pointer-events-none" />
          
          <div className="space-y-12 md:space-y-16">
            {ACADEMY_PATH.map((node, i) => {
              const status = getStatus(node.id, i)
              
              return (
                <div 
                  key={node.id} 
                  className="relative flex flex-row items-center w-full"
                >
                  {/* Bubble Node (Aligned center on desktop, left on mobile) */}
                  <div className="absolute left-10 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <Link href={status === 'locked' ? '#' : `/lesson/${node.id}`} className={status === 'locked' ? 'pointer-events-none' : ''}>
                      <motion.div
                        whileHover={status !== 'locked' ? { scale: 1.08 } : {}}
                        whileTap={status !== 'locked' ? { scale: 0.96 } : {}}
                        className={cn(
                          "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative shadow-lg",
                          status === 'complete' 
                            ? "bg-emerald-950/80 border-emerald-500 text-emerald-400" 
                            : status === 'current' 
                              ? "bg-primary border-primary text-primary-foreground shadow-[0_0_20px_rgba(255,255,255,0.25)] animate-pulse" 
                              : "bg-neutral-900 border-white/5 text-muted-foreground/30"
                        )}
                      >
                        {status === 'complete' ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : status === 'current' ? (
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}

                        {node.type === 'boss' && (
                          <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white p-1 rounded-md border border-background shadow">
                            <Trophy className="w-2.5 h-2.5" />
                          </div>
                        )}
                        {node.type === 'special' && (
                          <div className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white p-1 rounded-md border border-background shadow">
                            <Sparkles className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </motion.div>
                    </Link>
                  </div>

                  {/* Card Container (Alternates on desktop, always right on mobile) */}
                  <div className={cn(
                    "w-full md:w-[45%] flex text-left pl-20 md:pl-0",
                    i % 2 === 0 
                      ? "md:ml-auto md:justify-start md:pl-10" 
                      : "md:mr-auto md:justify-end md:pr-10"
                  )}>
                    <Card className={cn(
                      "w-full max-w-sm transition-all duration-300 p-4 border rounded-xl bg-card/25 backdrop-blur-sm relative overflow-hidden",
                      status === 'complete' 
                        ? "border-emerald-500/10 opacity-70 hover:opacity-100 hover:border-emerald-500/20" 
                        : status === 'current' 
                          ? "border-primary/20 bg-white/[0.02] shadow-[0_0_30px_rgba(255,255,255,0.02)] hover:border-primary/40 ring-1 ring-primary/10" 
                          : "border-white/5 opacity-40 select-none"
                    )}>
                      {/* Active Indicator Spotlight */}
                      {status === 'current' && (
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 blur-2xl rounded-full" />
                      )}

                      {/* Card Content */}
                      <div className="space-y-2">
                        {/* Topic Tag and Status Indicator */}
                        <div className="flex justify-between items-center text-[9px] font-mono tracking-wider">
                          <span className={cn(
                            "px-1.5 py-0.5 rounded uppercase font-semibold",
                            status === 'complete' ? "bg-emerald-500/5 text-emerald-400 border border-emerald-500/10" :
                            status === 'current' ? "bg-primary/10 text-primary border border-primary/20" :
                            "bg-neutral-800 text-muted-foreground/60"
                          )}>
                            {node.topic}
                          </span>
                          {status === 'current' && (
                            <span className="text-primary font-semibold uppercase animate-pulse flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-primary" /> Active Module
                            </span>
                          )}
                          {status === 'complete' && (
                            <span className="text-emerald-400 font-semibold uppercase flex items-center gap-1">
                              Completed
                            </span>
                          )}
                        </div>

                        {/* Title and Short Description */}
                        <div>
                          <h4 className={cn(
                            "font-semibold text-sm tracking-tight text-foreground transition-colors",
                            status === 'complete' && "text-foreground/80 line-through decoration-muted-foreground/30",
                            status === 'current' && "text-foreground group-hover:text-primary",
                            status === 'locked' && "text-muted-foreground/50"
                          )}>
                            {node.title}
                          </h4>
                          <p className="text-[11px] text-muted-foreground leading-normal mt-0.5">
                            {status === 'locked' ? 'Locked Module' : node.description}
                          </p>
                        </div>

                        {/* Show Details for Completed or Current */}
                        {status !== 'locked' && (
                          <div className="pt-2 border-t border-white/5 space-y-2">
                            <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
                              {node.overview}
                            </p>
                            
                            <div className="flex justify-between items-center pt-1 text-[9px] text-muted-foreground/50 font-mono">
                              <span className="flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" /> {node.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Activity className="w-2.5 h-2.5" /> {node.skills}
                              </span>
                              <span className="text-emerald-500 font-medium">
                                {node.xp}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Launch Module Call to Action */}
                        {status === 'current' && (
                          <Button asChild size="sm" className="w-full mt-3 h-8 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] font-medium rounded-lg">
                            <Link href={`/lesson/${node.id}`}>
                              <span>Launch Lesson</span>
                              <ChevronRight className="w-3.5 h-3.5 ml-1" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </GameShell>
  )
}
