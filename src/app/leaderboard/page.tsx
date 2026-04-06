
"use client"

import { useState } from 'react'
import GameShell from '@/components/game/GameShell'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Trophy, Medal, Star, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const PLAYERS = [
  { rank: 1, name: 'Alex Forge', level: 'Visionary', xp: 12500, country: 'US', avatar: '1' },
  { rank: 2, name: 'Sarah Spark', level: 'Innovator', xp: 11200, country: 'GB', avatar: '2' },
  { rank: 3, name: 'Leon Build', level: 'Innovator', xp: 10800, country: 'DE', avatar: '3' },
  { rank: 4, name: 'Maria Mind', level: 'Creator', xp: 9500, country: 'BR', avatar: '4' },
  { rank: 5, name: 'Kenji Tech', level: 'Creator', xp: 8200, country: 'JP', avatar: '5' },
  { rank: 14, name: 'Future Founder', level: 'Explorer', xp: 450, country: 'US', avatar: 'u', current: true },
]

export default function LeaderboardPage() {
  return (
    <GameShell>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Hall of Fame</h1>
          <p className="text-muted-foreground">The best founders are built through consistency. Where do you stand?</p>
        </div>

        <Tabs defaultValue="global" className="w-full">
          <TabsList className="bg-muted/50 p-1 mb-8 w-full sm:w-auto h-12 rounded-xl">
            <TabsTrigger value="global" className="rounded-lg px-8 py-2 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Global</TabsTrigger>
            <TabsTrigger value="national" className="rounded-lg px-8 py-2 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">National</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
             {/* Top 3 Podiums */}
             <div className="grid grid-cols-3 gap-4 items-end mb-12">
                {/* 2nd Place */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-slate-400 p-1">
                       <img src="https://picsum.photos/seed/p2/150/150" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-slate-400 text-white p-1 rounded-full"><Medal className="w-5 h-5" /></div>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Sarah Spark</p>
                    <p className="text-xs text-muted-foreground">11.2k XP</p>
                  </div>
                  <div className="w-full h-24 bg-slate-400/20 rounded-t-2xl flex items-center justify-center text-slate-400 font-bold text-2xl">2</div>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center space-y-4">
                   <div className="relative">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full border-4 border-yellow-500 p-1">
                       <img src="https://picsum.photos/seed/p1/150/150" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white p-1 rounded-full"><Trophy className="w-6 h-6" /></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-float"><Star className="w-8 h-8 text-yellow-500 fill-yellow-500" /></div>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">Alex Forge</p>
                    <p className="text-xs text-muted-foreground">12.5k XP</p>
                  </div>
                  <div className="w-full h-32 bg-yellow-500/20 rounded-t-2xl flex items-center justify-center text-yellow-500 font-bold text-4xl">1</div>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-orange-600 p-1">
                       <img src="https://picsum.photos/seed/p3/150/150" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-1 rounded-full"><Medal className="w-5 h-5" /></div>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Leon Build</p>
                    <p className="text-xs text-muted-foreground">10.8k XP</p>
                  </div>
                  <div className="w-full h-20 bg-orange-600/20 rounded-t-2xl flex items-center justify-center text-orange-600 font-bold text-2xl">3</div>
                </div>
             </div>

             {/* Table */}
             <div className="space-y-3">
               {PLAYERS.map((player, idx) => (
                 <div 
                   key={idx} 
                   className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl transition-all border",
                    player.current ? "bg-primary/10 border-primary/30" : "bg-card hover:bg-muted border-white/5"
                   )}
                 >
                   <div className="w-8 font-bold text-muted-foreground flex justify-center">{player.rank}</div>
                   <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent shrink-0">
                     {player.name[0]}
                   </div>
                   <div className="flex-1">
                     <p className="font-bold flex items-center gap-2">
                       {player.name} {player.current && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-white">YOU</span>}
                     </p>
                     <p className="text-xs text-muted-foreground">{player.level}</p>
                   </div>
                   <div className="text-right">
                     <p className="font-bold text-primary">{player.xp} XP</p>
                     <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{player.country}</p>
                   </div>
                 </div>
               ))}
             </div>
          </TabsContent>
          <TabsContent value="national" className="h-64 flex items-center justify-center glass-card rounded-3xl opacity-50 italic">
            Filter by your region to find local rivals.
          </TabsContent>
        </Tabs>
      </div>
    </GameShell>
  )
}
