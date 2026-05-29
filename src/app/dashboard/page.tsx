"use client"

import { useGameState } from '@/hooks/use-game-state'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Zap, Trophy, Flame, Brain, Sparkles, ChevronRight, TrendingUp, 
  ShieldCheck, Globe, Target, ArrowUpRight, MessageSquare, Clock, 
  Rocket, DollarSign 
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts"
import PageGuide from '@/components/game/PageGuide'

export default function DashboardPage() {
  const { state, isLoaded, xpToNext } = useGameState()

  if (!isLoaded) {
    return (
      <GameShell>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg font-semibold">Loading your command center...</p>
        </div>
      </GameShell>
    )
  }

  const progressValue = (state.xp / xpToNext) * 100 || 0

  const skillData = [
    { skill: "Strategy", value: state.skills?.strategicThinking || 50 },
    { skill: "Finance", value: state.skills?.financialIntelligence || 50 },
    { skill: "Risk", value: state.skills?.riskAnalysis || 50 },
    { skill: "Negotiation", value: state.skills?.negotiation || 50 },
    { skill: "Market", value: state.skills?.marketAwareness || 50 },
    { skill: "Leadership", value: state.skills?.leadership || 50 },
  ]

  return (
    <GameShell>
      <div className="space-y-10 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header - Enhanced Typography */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="space-y-2">
            <h1 className="text-6xl font-bold tracking-tight leading-tight">Level {state.level}</h1>
            <p className="text-2xl text-muted-foreground font-semibold">Founder Command Center</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-base text-muted-foreground font-medium">XP Progress</p>
              <p className="font-mono text-3xl font-bold mt-1">{state.xp} / {xpToNext}</p>
            </div>
            <div className="w-40">
              <Progress value={progressValue} className="h-4" />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - Improved Spacing & Typography */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Cash", value: `$${state.cash?.toLocaleString() || '0'}`, icon: <DollarSign className="w-8 h-8" />, color: "text-emerald-500" },
            { label: "Reputation", value: state.reputation || 0, icon: <Trophy className="w-8 h-8" />, color: "text-amber-500" },
            { label: "Streak", value: `${state.streak || 7} days`, icon: <Flame className="w-8 h-8" />, color: "text-orange-500" },
            { label: "Active Companies", value: "2", icon: <Globe className="w-8 h-8" />, color: "text-blue-500" },
          ].map((stat, i) => (
            <Card key={i} className="hover:shadow-xl transition-all border border-border/50 hover:border-primary/50">
              <CardContent className="p-8">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <p className="text-base text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</p>
                    <p className="text-4xl font-bold mt-3">{stat.value}</p>
                  </div>
                  <div className={cn("opacity-80", stat.color)}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Radar - Enhanced Header & Spacing */}
        <Card className="border border-border/50">
          <CardHeader className="pb-8">
            <CardTitle className="text-3xl font-bold">Founder Skill Profile</CardTitle>
            <p className="text-lg text-muted-foreground mt-2 font-medium">Track your mastery across key competencies</p>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 14, fontWeight: 600 }} />
                  <Radar
                    name="Mastery"
                    dataKey="value"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.25}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions - Improved Component Layout & Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-border/50">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold">Continue Building</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild size="lg" className="w-full justify-between h-14 text-base font-semibold rounded-lg">
                <Link href="/simulation">Enter CEO Simulator <Rocket className="w-6 h-6" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full justify-between h-14 text-base font-semibold rounded-lg">
                <Link href="/pitch-arena">Practice Pitch <ArrowUpRight className="w-6 h-6" /></Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-border/50">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-base font-semibold">Session Time</span>
                  <span className="text-lg font-bold text-primary">2.5 hrs</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-base font-semibold">Lessons Completed</span>
                  <span className="text-lg font-bold text-accent">12</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </GameShell>
  )
}
