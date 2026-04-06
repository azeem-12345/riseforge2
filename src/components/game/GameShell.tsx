
"use client"

import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Sword, 
  FlaskConical, 
  Rocket, 
  Brain, 
  Menu,
  Trophy,
  Building2,
  Mic2,
  Zap,
  Eye,
  Lock
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGameState } from '@/hooks/use-game-state'
import LevelUpModal from './LevelUpModal'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { name: 'Home Base', icon: LayoutDashboard, href: '/dashboard', key: 'dashboard' },
  { name: 'Academy Path', icon: MapIcon, href: '/world-map', key: 'world-map' },
  { name: 'Business Game', icon: Zap, href: '/simulation', key: 'simulation' },
  { name: 'Finding Problems', icon: Eye, href: '/opportunity-scanner', key: 'opportunity-scanner' },
  { name: 'My Company', icon: Building2, href: '/company', key: 'company' },
  { name: 'Pitch Room', icon: Mic2, href: '/pitch-arena', key: 'pitch-arena' },
  { name: 'Weekly Missions', icon: Sword, href: '/challenge-arena', key: 'challenge-arena' },
  { name: 'Idea Lab', icon: FlaskConical, href: '/idea-lab', key: 'idea-lab' },
  { name: 'Founder Mentor', icon: Brain, href: '/mentor', key: 'mentor' },
  { name: 'World Rankings', icon: Trophy, href: '/leaderboard', key: 'leaderboard' },
]

export default function GameShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { state } = useGameState()
  const [open, setOpen] = useState(false)

  const handleNavClick = (item: typeof navItems[0]) => {
    if (!isModuleUnlocked(item.key)) return;
    router.push(item.href)
    setOpen(false)
  }

  const isModuleUnlocked = (key: string) => {
    if (key === 'dashboard' || key === 'world-map' || key === 'profile') return true;
    return state.unlockedModules.includes(key);
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden font-body">
      <LevelUpModal />
      
      {/* Desktop Sidebar */}
      <aside className="w-56 border-r border-white/5 bg-card/50 backdrop-blur-3xl hidden md:flex flex-col relative z-50">
        <div className="p-6">
          <div onClick={() => router.push('/dashboard')} className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Rocket className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="font-headline text-lg font-black tracking-tighter">RiseForge</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-[8px] font-black uppercase text-muted-foreground tracking-[0.3em] px-4 mb-4 opacity-50">Your System</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const isUnlocked = isModuleUnlocked(item.key)
            
            return (
              <div
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group relative cursor-pointer",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" 
                    : !isUnlocked 
                      ? "opacity-40 grayscale cursor-not-allowed" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-4 h-4", isActive ? "text-primary-foreground" : "group-hover:text-primary transition-colors")} />
                  <span className="font-bold text-xs tracking-tight">{item.name}</span>
                </div>
                {!isUnlocked && <Lock className="w-3 h-3 text-muted-foreground" />}
              </div>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div 
            onClick={() => router.push('/profile')}
            className={cn(
              "flex items-center gap-3 p-2 rounded-xl transition-all border cursor-pointer group",
              pathname === '/profile' ? "bg-accent/10 border-accent/30" : "bg-white/5 border-white/5 hover:bg-white/10"
            )}
          >
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-accent-foreground font-black text-sm shadow-lg shadow-accent/20 overflow-hidden">
              <img src={`https://picsum.photos/seed/${state.name}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black truncate group-hover:text-primary transition-colors">{state.name}</p>
              <p className="text-[8px] font-bold text-muted-foreground uppercase">{state.founderStage}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-card/50 backdrop-blur-xl shrink-0">
          <div onClick={() => router.push('/dashboard')} className="flex items-center gap-2 cursor-pointer">
            <Rocket className="text-primary w-6 h-6" />
            <span className="font-headline font-black text-lg tracking-tighter">RiseForge</span>
          </div>
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-card border-white/5">
              <SheetHeader className="p-6 pb-2 text-left border-b border-white/5">
                <SheetTitle className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary rounded-lg">
                    <Rocket className="text-primary-foreground w-4 h-4" />
                  </div>
                  <span className="font-headline text-lg font-black tracking-tighter">RiseForge</span>
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col h-full">
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                  <p className="text-[8px] font-black uppercase text-muted-foreground tracking-[0.3em] px-4 mb-4 opacity-50">Your System</p>
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    const isUnlocked = isModuleUnlocked(item.key)
                    return (
                      <div
                        key={item.name}
                        onClick={() => handleNavClick(item)}
                        className={cn(
                          "flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group relative cursor-pointer",
                          isActive 
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" 
                            : !isUnlocked 
                              ? "opacity-40 grayscale cursor-not-allowed" 
                              : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={cn("w-4 h-4", isActive ? "text-primary-foreground" : "group-hover:text-primary transition-colors")} />
                          <span className="font-bold text-xs tracking-tight">{item.name}</span>
                        </div>
                        {!isUnlocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                      </div>
                    )
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <div className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
