
"use client"

import { useState, useEffect } from 'react'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useGameState } from '@/hooks/use-game-state'
import { Building2, Rocket, Users, TrendingUp, DollarSign, Target, Briefcase, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import PageGuide from '@/components/game/PageGuide'

export default function CompanyBuilderPage() {
  const { state, updateCompany } = useGameState()
  const [isEditing, setIsEditing] = useState(!state.company)
  
  // Local state for the form, initializing with global state or defaults
  const [formData, setFormData] = useState({
    name: state.company?.name || '',
    mission: state.company?.mission || '',
    revenue: state.company?.revenue || 0,
    employees: state.company?.employees || [],
    stage: state.company?.stage || 'Seed',
    valuation: state.company?.valuation || 1000000
  })

  // Sync with global state if it changes
  useEffect(() => {
    if (state.company) {
      setFormData({
        name: state.company.name,
        mission: state.company.mission,
        revenue: state.company.revenue,
        employees: state.company.employees,
        stage: state.company.stage,
        valuation: state.company.valuation
      })
    }
  }, [state.company])

  const handleSave = () => {
    updateCompany(formData)
    setIsEditing(false)
  }

  // Calculate team size safely
  const teamSize = Array.isArray(formData.employees) ? formData.employees.length : 0

  return (
    <GameShell>
      <PageGuide 
        pageKey="company"
        title="Company Center"
        description="This is where you manage your business. You can change your name, your mission, and see how many people work for you. As you grow, you will see your company value go up!"
        icon={<Building2 className="w-5 h-5" />}
      />

      <div className="max-w-5xl mx-auto space-y-10 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
              <Building2 className="w-3.5 h-3.5" /> Company Hub
            </div>
            <h1 className="text-3xl font-headline font-black tracking-tighter">Your Business</h1>
            <p className="text-[11px] text-muted-foreground uppercase font-black tracking-[0.3em]">Status: {state.company?.stage || 'Just Starting'}</p>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)} 
            variant={isEditing ? "outline" : "default"}
            className="h-10 rounded-xl px-8 text-[10px] font-black uppercase tracking-widest"
          >
            {isEditing ? 'Stop Editing' : 'Change Strategy'}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {isEditing ? (
              <Card className="glass-card border-primary/20 overflow-hidden">
                <CardHeader className="p-8 border-b border-white/5 bg-primary/5">
                  <CardTitle className="text-sm font-black uppercase tracking-widest">Setup Your Company</CardTitle>
                  <CardDescription className="text-[11px]">Tell us what your company does and what it is called.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Business Name</Label>
                      <Input 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. My Great Business"
                        className="bg-white/5 border-white/10 h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Stage</Label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 h-12 rounded-xl px-4 text-sm font-medium"
                        value={formData.stage}
                        onChange={e => setFormData({...formData, stage: e.target.value as any})}
                      >
                        <option value="Seed">Early Stage (Seed)</option>
                        <option value="Series A">Growth Stage (Series A)</option>
                        <option value="Series B">Big Scale (Series B)</option>
                        <option value="Growth">Expanding (Growth)</option>
                        <option value="IPO">Public (IPO)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">What we do (Mission)</Label>
                    <Textarea 
                      value={formData.mission}
                      onChange={e => setFormData({...formData, mission: e.target.value})}
                      placeholder="Why did you start this business?"
                      className="bg-white/5 border-white/10 min-h-[120px] rounded-xl"
                    />
                  </div>
                  <Button onClick={handleSave} className="w-full h-12 rounded-xl font-black uppercase text-[11px] tracking-widest">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { label: 'Company Value', value: `$${(formData.valuation / 1000000).toFixed(1)}M`, icon: TrendingUp, color: 'text-green-500' },
                    { label: 'Total Sales', value: `$${formData.revenue.toLocaleString()}`, icon: DollarSign, color: 'text-primary' },
                    { label: 'Total Staff', value: teamSize, icon: Users, color: 'text-accent' },
                  ].map((stat, i) => (
                    <Card key={i} className="glass-card border-white/5">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className={cn("p-2.5 rounded-xl bg-white/5", stat.color)}>
                          <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                          <p className="text-base font-black tabular-nums">{stat.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="glass-card border-white/5 p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Globe className="w-40 h-40" />
                  </div>
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                        <Rocket className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black tracking-tight">{formData.name || 'Your Company Name'}</h3>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">{formData.stage} Stage</p>
                      </div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 italic text-sm text-foreground/90 leading-relaxed">
                      "{formData.mission || 'No mission set yet. Click "Change Strategy" to add one!'}"
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <Card className="glass-card border-white/5">
              <CardHeader className="p-6">
                <CardTitle className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" /> Active Teams
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                {[
                  { name: 'Product Team', status: 'Working', color: 'bg-primary' },
                  { name: 'Sales Team', status: 'Selling', color: 'bg-accent' },
                  { name: 'Support Team', status: 'Helping', color: 'bg-green-500' },
                ].map((dept, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold">{dept.name}</p>
                      <p className="text-[9px] text-muted-foreground uppercase font-black">{dept.status}</p>
                    </div>
                    <div className={cn("w-2 h-8 rounded-full", dept.color)} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card border-accent/20 bg-accent/5">
              <CardContent className="p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="font-black text-[11px] uppercase tracking-widest">Founder Tip</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                  "To reach the next level, you should try to hire more staff in the Business Game."
                </p>
                <Button variant="outline" asChild className="w-full border-accent/20 text-accent h-9 text-[10px] font-black uppercase tracking-widest">
                  <a href="/simulation">Start Game</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GameShell>
  )
}
