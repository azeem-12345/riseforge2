"use client"

import { useGameState } from '@/hooks/use-game-state'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge as UIBadge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Trophy, 
  Settings, 
  Mail, 
  Linkedin, 
  Globe, 
  Twitter, 
  LogOut, 
  Calendar,
  Flame,
  Zap,
  Target,
  Edit2,
  Share2,
  Award,
  Palette,
  Check,
  Brain
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const THEME_PRESETS = [
  { name: 'Electric Blue', primary: '217 91% 60%', accent: '199 89% 48%' },
  { name: 'Solar Gold', primary: '45 100% 50%', accent: '35 90% 45%' },
  { name: 'Emerald Peak', primary: '142 71% 45%', accent: '160 84% 39%' },
  { name: 'Crimson Fury', primary: '0 84% 60%', accent: '346 84% 45%' },
]

export default function ProfilePage() {
  const { state, xpToNext } = useGameState()
  const [activeTheme, setActiveTheme] = useState(THEME_PRESETS[0].name)

  const applyTheme = (theme: typeof THEME_PRESETS[0]) => {
    setActiveTheme(theme.name)
    document.documentElement.style.setProperty('--primary', theme.primary)
    document.documentElement.style.setProperty('--ring', theme.primary)
    document.documentElement.style.setProperty('--accent', theme.accent)
  }

  const stats = [
    { label: 'Current Streak', value: `${state.streak} Days`, icon: Flame, color: 'text-orange-500' },
    { label: 'Total XP', value: state.xp.toLocaleString(), icon: Zap, color: 'text-primary' },
    { label: 'Lessons Mastered', value: state.completedLessons.length, icon: Target, color: 'text-accent' },
    { label: 'Founder Level', value: state.level, icon: Trophy, color: 'text-violet-500' },
  ]

  return (
    <GameShell>
      <div className="max-w-6xl mx-auto space-y-8 pb-20">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl bg-accent/20 border-2 border-accent/40 flex items-center justify-center text-accent text-4xl font-black shadow-2xl overflow-hidden">
                <img src={`https://picsum.photos/seed/${state.name}/200/200`} alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Edit2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-primary flex items-center justify-center border-2 border-background shadow-lg">
                <Trophy className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-headline font-bold">{state.name}</h1>
              <div className="flex items-center gap-2">
                <UIBadge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase tracking-widest px-2 py-0.5">
                  {state.levelTitle}
                </UIBadge>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Joined Feb 2025
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="rounded-xl border-white/10 hover:bg-white/5 h-9 text-[10px] font-black uppercase tracking-widest">
              <Share2 className="w-4 h-4 mr-2" /> Share Journey
            </Button>
            <Button size="sm" className="rounded-xl shadow-lg shadow-primary/20 h-9 px-6 text-[10px] font-black uppercase tracking-widest">
              Edit Profile
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-card/50 border border-white/5 p-1 h-11 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg px-6 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-lg px-6 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Hall of Fame</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg px-6 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <Card key={i} className="glass-card border-white/5 hover:border-primary/20 transition-all">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className={cn("p-2.5 rounded-xl bg-white/5", stat.color)}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                      <p className="text-sm font-black">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" /> Ascension Path
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-black">Progress to Level {state.level + 1}</p>
                      <h4 className="text-xl font-black tabular-nums">{state.xp} / {xpToNext} XP</h4>
                    </div>
                    <p className="text-[10px] font-black text-primary">{Math.round((state.xp / xpToNext) * 100)}%</p>
                  </div>
                  <Progress value={(state.xp / xpToNext) * 100} className="h-2 bg-white/5" />
                  <p className="text-[10px] text-muted-foreground italic">
                    "Consistent output is the only metric that matters in the long game."
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-accent" /> Digital Presence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-all cursor-pointer">
                    <Linkedin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[11px] font-medium">linkedin.com/in/{state.name.toLowerCase().replace(' ', '')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-all cursor-pointer">
                    <Twitter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[11px] font-medium">@future_founder</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-all cursor-pointer">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[11px] font-medium">portfolio.riseforge.io</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="animate-in fade-in duration-500">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Early Adopter', date: 'Feb 15, 2025', icon: Zap, color: 'text-yellow-500', desc: 'Joined during the Genesis phase.' },
                { name: 'Consistency King', date: 'Feb 20, 2025', icon: Flame, color: 'text-orange-500', desc: 'Maintained a 5-day streak.' },
                { name: 'Mindset Master', date: 'Feb 22, 2025', icon: Brain, color: 'text-accent', desc: 'Completed Mindset Mountain Phase 1.' },
                { name: 'Alpha Founder', date: 'Unlocked', icon: Trophy, color: 'text-primary', desc: 'Achieved Founder Level 5.' },
              ].map((badge, i) => (
                <Card key={i} className="glass-card border-white/5 group hover:border-primary/40 transition-all">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={cn("w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform", badge.color)}>
                      <badge.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm">{badge.name}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase font-black">{badge.date}</p>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{badge.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="animate-in fade-in duration-500 space-y-6">
            <Card className="glass-card border-white/5">
              <CardHeader>
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Palette className="w-4 h-4" />
                   </div>
                   <div>
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest">System Personalization</CardTitle>
                    <CardDescription className="text-[10px]">Select your primary core color for the RiseForge interface.</CardDescription>
                   </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {THEME_PRESETS.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => applyTheme(theme)}
                      className={cn(
                        "p-4 rounded-2xl border transition-all text-left space-y-3 relative overflow-hidden group",
                        activeTheme === theme.name 
                          ? "border-primary bg-primary/5" 
                          : "border-white/5 bg-white/5 hover:border-white/20"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <div className="w-6 h-6 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: `hsl(${theme.primary})` }} />
                        {activeTheme === theme.name && <Check className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest">{theme.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="max-w-2xl space-y-6">
              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest">Account Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-[11px] font-bold">Email Address</p>
                        <p className="text-[10px] text-muted-foreground">founder@riseforge.io</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest">Update</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-[11px] font-bold">Security & Password</p>
                        <p className="text-[10px] text-muted-foreground">Last changed 12 days ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest">Change</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-red-500/10 bg-red-500/[0.02]">
                <CardHeader>
                  <CardTitle className="text-[10px] font-black uppercase tracking-widest text-red-500">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[10px] text-muted-foreground italic">
                    "Deleting your account will purge all XP, streaks, and unlocked certifications. This action is irreversible."
                  </p>
                  <Button variant="destructive" size="sm" className="rounded-xl font-black text-[10px] uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                    <LogOut className="w-4 h-4 mr-2" /> Delete Forge Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </GameShell>
  )
}
