"use client"

import { useGameState } from '@/hooks/use-game-state'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Zap, Trophy, Flame, Brain, Sparkles, ChevronRight, TrendingUp, 
  ShieldCheck, Globe, Target, ArrowUpRight, MessageSquare, Clock, 
  Rocket, DollarSign, Building2, AlertCircle
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
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading your command center...</p>
        </div>
      </GameShell>
    )
  }

  const progressValue = (state.xp / xpToNext) * 100 || 0

  const skillData = [
    { skill: "Strategy", value: state.skills?.strategicThinking || 10 },
    { skill: "Finance", value: state.skills?.financialIntelligence || 10 },
    { skill: "Risk", value: state.skills?.riskAnalysis || 10 },
    { skill: "Negotiation", value: state.skills?.negotiation || 10 },
    { skill: "Market", value: state.skills?.marketAwareness || 10 },
    { skill: "Leadership", value: state.skills?.leadership || 10 },
  ]

  const ventures = [
    {
      name: state.company?.name || "Aether SaaS",
      type: state.company?.type || "SaaS",
      stage: state.company?.stage || "Seed",
      valuation: state.company?.valuation ? `$${state.company.valuation.toLocaleString()}` : "$1,250,000",
      revenue: state.company?.revenue ? `$${state.company.revenue.toLocaleString()}/mo` : "$12,400/mo",
      status: "Active",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      name: "Solaria Media",
      type: "Media",
      stage: "Pre-Seed",
      valuation: "$320,000",
      revenue: "$1,800/mo",
      status: "Incubating",
      statusColor: "text-blue-500 bg-blue-500/10 border-blue-500/20"
    }
  ]

  const okrs = [
    {
      title: "Raise Seed Capital",
      description: "Amass cash reserves in company treasury",
      target: `$${(100000).toLocaleString()}`,
      current: `$${(state.company?.cash || 50000).toLocaleString()}`,
      progress: Math.min(100, Math.floor(((state.company?.cash || 50000) / 100000) * 100))
    },
    {
      title: "Product-Market Fit Validation",
      description: "Increase market awareness score",
      target: "Level 45",
      current: `Level ${state.skills?.marketAwareness || 10}`,
      progress: Math.min(100, Math.floor(((state.skills?.marketAwareness || 10) / 45) * 100))
    },
    {
      title: "Acquire Operational Mastery",
      description: "Unlock strategic competencies",
      target: "Level 30 Strategy",
      current: `Level ${state.skills?.strategicThinking || 10}`,
      progress: Math.min(100, Math.floor(((state.skills?.strategicThinking || 10) / 30) * 100))
    }
  ]

  const timelineEvents = [
    {
      title: "Completed Lesson: Pitching & Term Sheets",
      subtitle: "Mastered VC equity mechanics and valuation structures",
      time: "2 hours ago",
      icon: <Trophy className="w-3.5 h-3.5 text-amber-500" />,
      xp: "+80 XP"
    },
    {
      title: "Venture Valuation Update",
      subtitle: "Aether SaaS seed valuation revised upward by external simulation engine",
      time: "Yesterday",
      icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />,
      xp: "+120 XP"
    },
    {
      title: "Opportunity Scanning Complete",
      subtitle: "Discovered market gap in enterprise SaaS logistics scheduling",
      time: "3 days ago",
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-500" />,
      xp: "+50 XP"
    }
  ]

  const marketAlerts = [
    {
      type: "Macroeconomic",
      message: "Federal Reserve cuts interest rates by 25bps. Venture capital dry powder is expected to deploy rapidly.",
      severity: "info"
    },
    {
      type: "Talent Index",
      message: "Junior developer salary index rises 8% due to localized tech bubble. Operational expenses increased.",
      severity: "warning"
    }
  ]

  return (
    <GameShell>
      <div className="space-y-6 md:space-y-8 pb-20 px-3 md:px-4 max-w-7xl mx-auto">
        {/* Header - Sleek Professional Typography */}
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">System Workspace</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Command Base — Level {state.level}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground font-normal">
              Portfolio oversight and strategic cognitive profile.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs md:text-sm bg-white/5 border border-white/5 px-4 py-2.5 rounded-xl">
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Experience Points</p>
              <p className="font-mono text-sm md:text-base font-semibold text-foreground mt-0.5">
                {state.xp} <span className="text-muted-foreground font-normal">/ {xpToNext} XP</span>
              </p>
            </div>
            <div className="w-20 md:w-32">
              <Progress value={progressValue} className="h-1.5 bg-white/10" />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - Cleaner, Less Chunky */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "Cash Balance", value: `$${state.cash?.toLocaleString() || '0'}`, icon: <DollarSign className="w-4 h-4" />, color: "text-emerald-500" },
            { label: "Reputation Score", value: state.reputation || 0, icon: <Trophy className="w-4 h-4" />, color: "text-amber-500" },
            { label: "Streak Record", value: `${state.streak || 7} Days`, icon: <Flame className="w-4 h-4" />, color: "text-orange-500" },
            { label: "Active Ventures", value: "2 Companies", icon: <Building2 className="w-4 h-4" />, color: "text-blue-500" },
          ].map((stat, i) => (
            <Card key={i} className="bg-card/30 border border-white/5 hover:border-white/10 transition-colors">
              <CardContent className="p-4 md:p-5">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{stat.label}</p>
                    <p className="text-lg md:text-2xl font-semibold tracking-tight text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={cn("p-1.5 rounded-lg bg-white/5 border border-white/5", stat.color)}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Main Section (Col Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active Ventures Portfolio Table */}
            <Card className="bg-card/20 border border-white/5">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-sm font-semibold tracking-tight text-foreground">Venture Portfolio</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Real-time status of your virtual business entities</p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="h-8 text-xs border-white/5 hover:bg-white/5">
                    <Link href="/company">Manage Ventures</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-muted-foreground pb-2">
                        <th className="font-medium pb-2 text-[10px] uppercase tracking-wider">Company</th>
                        <th className="font-medium pb-2 text-[10px] uppercase tracking-wider">Type</th>
                        <th className="font-medium pb-2 text-[10px] uppercase tracking-wider">Valuation</th>
                        <th className="font-medium pb-2 text-[10px] uppercase tracking-wider">Monthly Rev</th>
                        <th className="font-medium pb-2 text-[10px] uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {ventures.map((venture, index) => (
                        <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                          <td className="py-3 font-medium text-foreground flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                            {venture.name}
                          </td>
                          <td className="py-3 text-muted-foreground">{venture.type}</td>
                          <td className="py-3 font-mono text-foreground">{venture.valuation}</td>
                          <td className="py-3 font-mono text-muted-foreground">{venture.revenue}</td>
                          <td className="py-3">
                            <span className={cn("inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border", venture.statusColor)}>
                              {venture.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Founder Skill Profile */}
            <Card className="bg-card/20 border border-white/5">
              <CardHeader className="pb-4">
                <h2 className="text-sm font-semibold tracking-tight text-foreground">Cognitive Skill Index</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Evaluated founder competence across six core strategic dimensions</p>
              </CardHeader>
              <CardContent className="flex justify-center items-center py-4">
                <div className="h-64 md:h-80 w-full max-w-md">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={skillData} outerRadius="75%">
                      <PolarGrid stroke="rgba(255, 255, 255, 0.05)" />
                      <PolarAngleAxis 
                        dataKey="skill" 
                        tick={{ fontSize: 9, fill: "#9ca3af", fontWeight: 500 }} 
                      />
                      <Radar
                        name="Competence"
                        dataKey="value"
                        stroke="#e2e8f0"
                        fill="#ffffff"
                        fillOpacity={0.06}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Milestones & Activity */}
            <Card className="bg-card/20 border border-white/5">
              <CardHeader className="pb-2">
                <h2 className="text-sm font-semibold tracking-tight text-foreground">Recent Activity Logs</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Audit log of actions, level increases, and business occurrences</p>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-3.5 before:w-px before:bg-white/5">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="flex gap-4 relative items-start text-xs">
                      <div className="w-7 h-7 rounded-full bg-card border border-white/5 flex items-center justify-center flex-shrink-0 z-10">
                        {event.icon}
                      </div>
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-2">
                          <p className="font-medium text-foreground truncate">{event.title}</p>
                          <span className="font-mono text-[10px] text-emerald-500 bg-emerald-500/10 px-1 rounded flex-shrink-0">
                            {event.xp}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-normal">{event.subtitle}</p>
                        <p className="text-[10px] text-muted-foreground/50 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Section (Col Span 1) */}
          <div className="space-y-6">

            {/* Quick Actions */}
            <Card className="bg-card/20 border border-white/5">
              <CardHeader className="pb-4">
                <h2 className="text-sm font-semibold tracking-tight text-foreground">Strategic Gateways</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Launch modules to level up skills and grow reserves</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full justify-between h-11 text-xs font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors px-4">
                  <Link href="/simulation" className="flex items-center justify-between w-full">
                    <span>Enter CEO Simulator</span>
                    <Rocket className="w-3.5 h-3.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between h-11 text-xs font-medium border-white/5 hover:bg-white/5 text-foreground rounded-lg transition-colors px-4">
                  <Link href="/pitch-arena" className="flex items-center justify-between w-full">
                    <span>Practice Board Pitch</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between h-11 text-xs font-medium border-white/5 hover:bg-white/5 text-foreground rounded-lg transition-colors px-4">
                  <Link href="/opportunity-scanner" className="flex items-center justify-between w-full">
                    <span>Opportunity Scanner</span>
                    <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Strategic Objectives (OKRs) */}
            <Card className="bg-card/20 border border-white/5">
              <CardHeader className="pb-4">
                <h2 className="text-sm font-semibold tracking-tight text-foreground">OKR Milestones</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Active objectives for your current level</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {okrs.map((okr, index) => (
                  <div key={index} className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-medium text-foreground">{okr.title}</p>
                        <p className="text-[10px] text-muted-foreground">{okr.description}</p>
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {okr.progress}%
                      </span>
                    </div>
                    <Progress value={okr.progress} className="h-1 bg-white/5" />
                    <div className="flex justify-between text-[9px] text-muted-foreground/60 font-mono">
                      <span>Val: {okr.current}</span>
                      <span>Target: {okr.target}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Live Market Insights Feed */}
            <Card className="bg-card/20 border border-white/5">
              <CardHeader className="pb-4">
                <h2 className="text-sm font-semibold tracking-tight text-foreground">Market Ticker</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Macro trends impacting valuations and margins</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {marketAlerts.map((alert, index) => (
                  <div key={index} className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex items-start gap-2.5 text-xs">
                    {alert.severity === "warning" ? (
                      <AlertCircle className="w-4 h-4 text-amber-500/80 shrink-0 mt-0.5" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-blue-500/80 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{alert.type}</p>
                      <p className="text-muted-foreground leading-normal text-[11px]">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </GameShell>
  )
}
