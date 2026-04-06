
"use client"

import { useGameState } from '@/hooks/use-game-state'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Zap, 
  Trophy, 
  Flame, 
  Brain, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Globe,
  Target,
  ArrowUpRight,
  MessageSquare,
  Clock,
  Rocket
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import PageGuide from '@/components/game/PageGuide'

export default function DashboardPage() {
  const { state, isLoaded, xpToNext } = useGameState()

  if (!isLoaded) return null

  const progressValue = (state.xp / xpToNext) * 100

  const skillData = [
    { skill: "Strategy", value: state.skills.strategicThinking },
    { skill: "Finance", value: state.skills.financialIntelligence },
    { skill: "Risk", value: state.skills.riskAnalysis },
    { skill: "Negotiation", value: state.skills.negotiation },
    { skill: "Market", value: state.skills.marketAwareness },
    { skill: "Leadership", value: state.skills.leadership },
  ]

  const chartConfig = {
    value: {
      label: "Mastery",
      color: "hsl(var(--primary))",
    },
  }

  return (
    <GameShell>
      <PageGuide 
        pageKey="dashboard"
        title="Command Center"
        description="Welcome to your home base! Here you can see your level, your growth, and how much you have learned. Use this page to track your progress as a founder."
        icon={<Target className="w-5 h-5" />}
      />
      
      <div className="space-y-10 pb-20">
        {/* Status Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-2xl">
               <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-1">Your Stage</p>
              <h1 className="text-3xl font-headline font-black tracking-tight flex items-center gap-3">
                {state.founderStage} <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-black uppercase text-muted-foreground">{state.levelTitle}</span>
              </h1>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4 items-center"
          >
             <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-5 border-accent/10">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl font-black leading-none tabular-nums">{state.reputation}</p>
                <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mt-1.5">Reputation</p>
              </div>
            </div>
            <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-5 border-primary/10">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-xl font-black leading-none tabular-nums">{state.xp}</p>
                <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mt-1.5">Total XP</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Growth Timeline Card */}
          <Card className="lg:col-span-2 glass-card border-white/5 overflow-hidden group relative">
            <CardContent className="p-10 space-y-8">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em]">
                    <TrendingUp className="w-3.5 h-3.5" /> Your Progress
                  </div>
                  <h3 className="text-3xl font-black font-headline tracking-tighter">Growth Status</h3>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black tabular-nums">{Math.floor(progressValue)}%</p>
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Level {state.level} Done</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressValue}%` }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-primary to-accent relative shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                  />
                </div>
                <div className="flex justify-between text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> Current: {state.xp} XP</span>
                  <span className="text-accent flex items-center gap-2">Goal: {xpToNext} XP <ChevronRight className="w-3 h-3" /></span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-white/5">
                 <div className="space-y-1.5">
                    <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Daily Streak</p>
                    <p className="text-lg font-black text-orange-500 flex items-center gap-2">
                      <Flame className="w-4 h-4" /> {state.streak} Days
                    </p>
                 </div>
                 <div className="space-y-1.5">
                    <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Your Business</p>
                    <p className="text-lg font-black text-primary truncate">
                      {state.company?.name || 'Just Starting'}
                    </p>
                 </div>
                 <div className="space-y-1.5">
                    <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Reputation</p>
                    <p className="text-lg font-black text-accent">{state.reputation}</p>
                 </div>
                 <div className="space-y-1.5">
                    <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Personality</p>
                    <p className="text-lg font-black text-violet-500 truncate">
                      {state.profile?.dna?.type || 'Thinking...'}
                    </p>
                 </div>
              </div>
            </CardContent>
          </Card>

          {/* Cognitive Radar Chart */}
          <Card className="glass-card border-white/5 p-8 flex flex-col">
             <div className="space-y-6 flex-1">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                     <Brain className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-[11px] uppercase tracking-widest">Your Skills</h4>
                    <p className="text-[9px] text-muted-foreground font-bold">See what you are good at</p>
                  </div>
               </div>
               <div className="h-[240px] w-full">
                  <ChartContainer config={chartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={skillData} className="[&_.recharts-polar-grid-concentric]:stroke-white/10 [&_.recharts-polar-angle-axis-line]:stroke-white/10">
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 800 }} />
                        <Radar
                          name="Skill Level"
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.3}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
               </div>
             </div>
             <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/80 italic">Tip: Practice Finance next</p>
             </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
           {/* Global Founder Map Entry */}
           <Card className="lg:col-span-3 glass-card border-white/5 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between py-6 px-10 border-b border-white/5">
                 <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
                      <Globe className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-[11px] font-black uppercase tracking-widest">Global Rankings</CardTitle>
                 </div>
                 <Button variant="ghost" asChild size="sm" className="h-9 text-[10px] font-black text-accent hover:bg-accent/10 uppercase tracking-widest">
                    <Link href="/leaderboard">Open Leaderboard <ArrowUpRight className="ml-2 w-4 h-4" /></Link>
                 </Button>
              </CardHeader>
              <CardContent className="p-10">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { label: 'Busy City', value: 'Silicon Valley', detail: '4,200 Founders', color: 'text-primary' },
                      { label: 'New Quests', value: '124 Waiting', detail: 'Update every week', color: 'text-accent' },
                      { label: 'Market Status', value: 'Normal', detail: 'Prices are stable', color: 'text-violet-500' },
                    ].map((m, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4 hover:border-white/20 transition-all">
                        <h5 className={cn("text-[9px] font-black uppercase tracking-widest", m.color)}>{m.label}</h5>
                        <div>
                          <p className="text-xl font-black tracking-tight">{m.value}</p>
                          <p className="text-[11px] text-muted-foreground mt-1">{m.detail}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </CardContent>
           </Card>

           {/* Startup Simulation Module Entry */}
           <Card className="glass-card border-primary/20 bg-primary/5 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Rocket className="w-32 h-32" />
              </div>
              <CardContent className="p-8 space-y-6 relative z-10">
                 <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-xl">
                    <Zap className="w-7 h-7 fill-current" />
                 </div>
                 <div className="space-y-3">
                    <h4 className="font-black text-[12px] uppercase tracking-widest">Business Game</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed italic font-medium">
                       Run your own virtual company. Make choices and grow your money.
                    </p>
                 </div>
                 <Button asChild className="w-full h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 bg-primary hover:scale-[1.02] active:scale-95 transition-all">
                    <Link href="/simulation">Start the Game</Link>
                 </Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </GameShell>
  )
}
