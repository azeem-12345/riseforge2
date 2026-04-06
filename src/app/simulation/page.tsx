
"use client"

import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Rocket, Target, Zap, TrendingUp, History, PlayCircle, BarChart3, ShieldAlert, Cpu } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useGameState } from '@/hooks/use-game-state'

export default function SimulationHubPage() {
  const { state } = useGameState()

  return (
    <GameShell>
      <div className="max-w-6xl mx-auto space-y-10 pb-20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" /> Simulation Core V3
          </div>
          <h1 className="text-4xl font-headline font-black tracking-tighter">Business Game Hub</h1>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            Grow from a single founder to a big boss with a whole team. This game helps you learn how to make smart choices for your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 glass-card border-primary/20 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <Rocket className="w-64 h-64" />
            </div>
            <CardHeader className="p-8">
              <CardTitle className="text-2xl font-black tracking-tight">Full Game Session</CardTitle>
              <CardDescription className="text-xs uppercase font-black tracking-widest text-primary/60">Finding Problems • Building • Growing</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-accent" /> What's Inside
                  </h4>
                  <ul className="text-[11px] space-y-1.5 text-muted-foreground">
                    <li>• Real-time Days and Months</li>
                    <li>• Getting and Selling Orders</li>
                    <li>• Hiring and Growing Teams</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-green-500" /> Rewards
                  </h4>
                  <ul className="text-[11px] space-y-1.5 text-muted-foreground">
                    <li>• Big XP for Success</li>
                    <li>• Improve Your Real Skills</li>
                    <li>• Unlock Elite Reputation</li>
                  </ul>
                </div>
              </div>

              <Button asChild size="lg" className="w-full h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20">
                <Link href="/simulation/run">Start the Game <PlayCircle className="ml-2 w-5 h-5" /></Link>
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="glass-card border-white/5">
              <CardHeader className="p-6">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <History className="w-4 h-4 text-accent" /> Your Past Games
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-center py-10 opacity-50">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-muted-foreground/30" />
                </div>
                <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                  You haven't finished a game yet. Your results will show here!
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-accent/20 bg-accent/5">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-accent">
                  <ShieldAlert className="w-4 h-4" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Game Rules</h4>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                  "If you run out of money, the game ends. Try to spend wisely while you grow."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GameShell>
  )
}
