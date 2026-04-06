
"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import GameShell from '@/components/game/GameShell'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Rocket, Target, Zap, TrendingUp, ShieldAlert, DollarSign, Users, Globe, Loader2, 
  ChevronRight, Sparkles, Trophy, AlertCircle, Briefcase, BarChart3, Clock, 
  Package, ShoppingCart, Brain, MinusCircle, PlusCircle, ArrowUpRight, Hammer, 
  Building2, Scale, Wallet, Construction, Heart, Activity, Megaphone, Users2
} from 'lucide-react'
import { useGameState, type VirtualCompany, type Employee } from '@/hooks/use-game-state'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getSimulationFeedback } from '@/ai/flows/simulation-feedback-flow'
import PageGuide from '@/components/game/PageGuide'

type SimPhase = 'FOUNDATION' | 'BUILDING' | 'OPERATING' | 'CRISIS' | 'EXIT' | 'AUDIT'

interface ActiveSimState {
  phase: SimPhase
  company: VirtualCompany
  day: number
  month: number
  marketCycle: 'Boom' | 'Recession' | 'Neutral'
  history: { day: number, revenue: number, cash: number }[]
  decisions: { phase: string, choice: string, outcome: string }[]
  isPaused: boolean
  stress: number
  energy: number
  developmentProgress: number
  isLaunchReady: boolean
  lastEvent: string | null
}

const BUSINESS_TYPES = [
  { id: 'SaaS', title: 'Software App', desc: 'Monthly fees. Hard to start but grows big.', risk: 'Medium', cost: 'Medium' },
  { id: 'E-commerce', title: 'Online Shop', desc: 'Selling physical items. Needs inventory.', risk: 'High', cost: 'High' },
  { id: 'Agency', title: 'Service Agency', desc: 'Helping others. Low cost to start.', risk: 'Low', cost: 'Low' },
  { id: 'Manufacturing', title: 'Factory', desc: 'Making goods. Very expensive to start.', risk: 'Very High', cost: 'Extreme' }
]

const FUNDING_SOURCES = [
  { id: 'Savings', title: 'My Savings', amount: 50000, risk: 'Low Pressure' },
  { id: 'Loan', title: 'Bank Loan', amount: 150000, risk: 'Must pay back every month' },
  { id: 'Angel', title: 'Early Investor', amount: 250000, risk: 'Give away 15% of company' }
]

export default function CEOSimulatorPage() {
  const router = useRouter()
  const { addXP, addReputation, updateSkills, updateCompany, state: globalState } = useGameState()
  
  const [sim, setSim] = useState<ActiveSimState>({
    phase: 'FOUNDATION',
    company: {
      name: '',
      mission: '',
      type: 'SaaS',
      legalStructure: 'SoleProp',
      revenue: 0,
      expenses: 0,
      employees: [],
      stage: 'Seed',
      valuation: 1000000,
      burnRate: 0,
      cash: 0,
      debt: 0,
      equity: 100,
      productQuality: 100,
      complianceScore: 100
    },
    day: 1,
    month: 1,
    marketCycle: 'Neutral',
    history: [],
    decisions: [],
    isPaused: false,
    stress: 0,
    energy: 100,
    developmentProgress: 0,
    isLaunchReady: false,
    lastEvent: null
  })

  const [loading, setLoading] = useState(false)
  const [audit, setAudit] = useState<any>(null)

  // Simulation Logic Loop
  useEffect(() => {
    if (sim.phase !== 'OPERATING' || sim.isPaused || sim.company.cash <= 0 || sim.day > 90) return

    const timer = setInterval(() => {
      setSim(prev => {
        const nextDay = prev.day + 1
        const nextMonth = Math.floor(nextDay / 30) + 1
        
        // Calculate dynamic revenue and expenses
        const employeeCosts = prev.company.employees.reduce((acc, emp) => acc + (emp.salary / 30), 0)
        const fixedCosts = 100 // Rent, tools, etc.
        const dailyBurn = employeeCosts + fixedCosts
        
        const marketModifier = prev.marketCycle === 'Boom' ? 1.2 : prev.marketCycle === 'Recession' ? 0.6 : 1
        const qualityModifier = prev.company.productQuality / 100
        const dailyRevenue = (prev.company.employees.filter(e => e.role === 'Sales').length * 200 + 50) * marketModifier * qualityModifier
        
        const newCash = prev.company.cash + dailyRevenue - dailyBurn
        const newStress = Math.min(100, prev.stress + (newCash < 10000 ? 0.5 : 0.1))
        const newEnergy = Math.max(0, prev.energy - 0.2)

        // Random Event Chance (5%)
        let event = prev.lastEvent
        if (Math.random() < 0.05) {
          const events = [
            "Prices are dropping",
            "Staff are feeling tired",
            "Customers love the product",
            "Servers are down",
            "Competition is growing"
          ]
          event = events[Math.floor(Math.random() * events.length)]
        }

        return {
          ...prev,
          day: nextDay,
          month: nextMonth,
          company: {
            ...prev.company,
            cash: newCash,
            revenue: prev.company.revenue + dailyRevenue,
            burnRate: dailyBurn * 30
          },
          stress: newStress,
          energy: newEnergy,
          lastEvent: event,
          history: [...prev.history, { day: nextDay, revenue: dailyRevenue, cash: newCash }].slice(-30)
        }
      })
    }, 2000)

    return () => clearInterval(timer)
  }, [sim.phase, sim.isPaused, sim.company.cash, sim.day, sim.marketCycle])

  // Phase Transitions
  const handleFoundation = (data: Partial<VirtualCompany>) => {
    setSim(prev => ({
      ...prev,
      company: { ...prev.company, ...data },
      phase: 'BUILDING'
    }))
  }

  const handleStartBuilding = () => {
    setLoading(true)
    const interval = setInterval(() => {
      setSim(prev => {
        const nextProgress = prev.developmentProgress + 5
        if (nextProgress >= 100) {
          clearInterval(interval)
          setLoading(false)
          return { ...prev, developmentProgress: 100, isLaunchReady: true }
        }
        return { ...prev, developmentProgress: nextProgress }
      })
    }, 500)
  }

  const handleLaunch = () => {
    setSim(prev => ({ ...prev, phase: 'OPERATING' }))
  }

  const hireEmployee = (role: Employee['role']) => {
    const salary = role === 'Sales' ? 4000 : role === 'Developer' ? 6000 : 5000
    const newEmp: Employee = {
      id: Math.random().toString(36).substr(2, 9),
      role,
      skill: 50 + Math.random() * 30,
      salary,
      satisfaction: 80,
      burnout: 0
    }
    setSim(prev => ({
      ...prev,
      company: {
        ...prev.company,
        employees: [...prev.company.employees, newEmp]
      }
    }))
  }

  const handleEndSim = async () => {
    setLoading(true)
    try {
      const result = await getSimulationFeedback({
        industry: sim.company.type,
        finalValuation: sim.company.revenue * 3 + sim.company.cash,
        decisions: sim.decisions,
        finalStatus: sim.company.cash > 0 ? 'Successful Exit' : 'Bankruptcy'
      })
      setAudit(result)
      setSim(prev => ({ ...prev, phase: 'AUDIT' }))
      
      // Persist to global state
      addXP(1500)
      addReputation(50)
      updateCompany(sim.company)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GameShell>
      <PageGuide 
        pageKey="simulation"
        title="Business Game"
        description="Run your own business! Start by picking a name and how you get money. Then, build your product and hire staff to sell it. Watch your money and try not to run out!"
        icon={<Rocket className="w-5 h-5" />}
      />

      <div className="max-w-6xl mx-auto pb-20">
        <AnimatePresence mode="wait">
          {sim.phase === 'FOUNDATION' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4 border border-primary/20">
                  <Building2 className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-headline font-black tracking-tighter">Start Your Business</h1>
                <p className="text-muted-foreground text-sm max-w-lg mx-auto">Pick your industry and how you want to fund your dream.</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="glass-card border-white/5 p-8 space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <Construction className="w-4 h-4" /> Company Details
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground">Company Name</Label>
                      <Input 
                        placeholder="e.g. My Great Business" 
                        value={sim.company.name}
                        onChange={(e) => setSim(prev => ({ ...prev, company: { ...prev.company, name: e.target.value } }))}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground">What kind of business?</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {BUSINESS_TYPES.map(type => (
                          <button
                            key={type.id}
                            onClick={() => setSim(prev => ({ ...prev, company: { ...prev.company, type: type.id as any } }))}
                            className={cn(
                              "p-4 text-left rounded-xl border transition-all space-y-1",
                              sim.company.type === type.id ? "bg-primary/10 border-primary/50" : "bg-white/5 border-white/5 hover:border-white/20"
                            )}
                          >
                            <p className="text-[11px] font-bold">{type.title}</p>
                            <p className="text-[9px] text-muted-foreground line-clamp-1">{type.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="glass-card border-white/5 p-8 space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2">
                    <Wallet className="w-4 h-4" /> Where does money come from?
                  </h3>
                  <div className="space-y-4">
                    {FUNDING_SOURCES.map(source => (
                      <button
                        key={source.id}
                        onClick={() => handleFoundation({ cash: source.amount, stage: 'Seed' })}
                        className="w-full p-5 rounded-xl bg-white/5 border border-white/5 hover:border-accent/40 text-left flex justify-between items-center group transition-all"
                      >
                        <div>
                          <p className="text-sm font-black">{source.title}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">
                            ${source.amount.toLocaleString()} • {source.risk}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {sim.phase === 'BUILDING' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto space-y-10">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-[2.5rem] bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4 border border-accent/20">
                  <Hammer className="w-10 h-10" />
                </div>
                <h1 className="text-4xl font-headline font-black tracking-tighter">Building Product</h1>
                <p className="text-muted-foreground text-sm">We are making your product ready for the world. Please wait.</p>
              </div>

              <Card className="glass-card border-white/5 p-10 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Making Progress</p>
                    <p className="text-xl font-black tabular-nums">{sim.developmentProgress}%</p>
                  </div>
                  <Progress value={sim.developmentProgress} className="h-2 bg-white/5" />
                </div>

                {!sim.isLaunchReady ? (
                  <Button 
                    onClick={handleStartBuilding} 
                    disabled={loading}
                    className="w-full h-16 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-accent/20"
                  >
                    {loading ? <><Loader2 className="w-4 h-4 mr-3 animate-spin" /> Working...</> : "Start Building"}
                  </Button>
                ) : (
                  <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                    <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center gap-4">
                      <Sparkles className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="font-bold text-sm">Product Finished!</p>
                        <p className="text-[11px] text-muted-foreground">Everything looks good. Ready to sell!</p>
                      </div>
                    </div>
                    <Button onClick={handleLaunch} className="w-full h-16 rounded-2xl bg-green-500 text-white font-black uppercase tracking-widest">
                      Start Selling
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {sim.phase === 'OPERATING' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              {/* HUD / Vitals */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="glass-card border-white/5 p-5">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><DollarSign className="w-5 h-5" /></div>
                     <div>
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Money Left</p>
                        <p className={cn("text-sm font-black", sim.company.cash < 10000 ? "text-red-500 animate-pulse" : "text-green-500")}>
                          ${Math.floor(sim.company.cash).toLocaleString()}
                        </p>
                     </div>
                   </div>
                </Card>
                <Card className="glass-card border-white/5 p-5">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500"><Activity className="w-5 h-5" /></div>
                     <div>
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Your Stress</p>
                        <p className="text-sm font-black text-orange-500">{Math.floor(sim.stress)}%</p>
                     </div>
                   </div>
                </Card>
                <Card className="glass-card border-white/5 p-5">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent"><Users2 className="w-5 h-5" /></div>
                     <div>
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Total Staff</p>
                        <p className="text-sm font-black">{sim.company.employees.length}</p>
                     </div>
                   </div>
                </Card>
                <Card className="glass-card border-white/5 p-5">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500"><TrendingUp className="w-5 h-5" /></div>
                     <div>
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Market Status</p>
                        <p className="text-sm font-black">{sim.marketCycle}</p>
                     </div>
                   </div>
                </Card>
                <Card className="glass-card border-white/5 p-5">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Clock className="w-5 h-5" /></div>
                     <div>
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Day Number</p>
                        <p className="text-sm font-black">{sim.day} / 90</p>
                     </div>
                   </div>
                </Card>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 glass-card border-white/5 h-[500px] relative overflow-hidden bg-black/40">
                  <div className="absolute top-6 left-6 z-10">
                     <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black uppercase tracking-widest text-[9px]">
                       Company Hub
                     </Badge>
                     <h2 className="text-xl font-black mt-2 tracking-tight">{sim.company.name}</h2>
                  </div>

                  {/* Event Alert Toast */}
                  <AnimatePresence>
                    {sim.lastEvent && (
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute top-20 left-1/2 -translate-x-1/2 z-50 p-4 rounded-xl bg-accent border border-accent-foreground/20 text-accent-foreground shadow-2xl flex items-center gap-3"
                      >
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-[11px] font-black uppercase tracking-widest">{sim.lastEvent}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                       <motion.div 
                         animate={{ scale: [1, 1.02, 1] }}
                         transition={{ duration: 3, repeat: Infinity }}
                         className="w-40 h-40 rounded-[3rem] bg-card border-4 border-primary/30 flex items-center justify-center text-primary shadow-[0_0_80px_rgba(var(--primary),0.1)]"
                       >
                         <Rocket className="w-16 h-16" />
                       </motion.div>
                       
                       {/* Team Orbit */}
                       {sim.company.employees.map((emp, i) => (
                         <motion.div
                           key={emp.id}
                           animate={{ 
                             rotate: 360,
                             x: Math.cos((i * 360 / sim.company.employees.length) * Math.PI / 180) * 120,
                             y: Math.sin((i * 360 / sim.company.employees.length) * Math.PI / 180) * 120
                           }}
                           transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
                           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white border-2 border-background shadow-lg"
                         >
                            {emp.role === 'Sales' ? <Megaphone className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
                         </motion.div>
                       ))}
                    </div>
                  </div>
                </Card>

                <div className="space-y-6">
                   <Card className="glass-card border-white/5">
                      <CardHeader className="p-6">
                         <CardTitle className="text-[11px] font-black uppercase tracking-widest">Management Board</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                           <Button onClick={() => hireEmployee('Developer')} className="h-12 rounded-xl text-[10px] font-black uppercase border-white/5 bg-white/5 text-foreground hover:bg-white/10">Hire Developer</Button>
                           <Button onClick={() => hireEmployee('Sales')} className="h-12 rounded-xl text-[10px] font-black uppercase border-white/5 bg-white/5 text-foreground hover:bg-white/10">Hire Sales</Button>
                        </div>
                        <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
                           <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Monthly Spending</p>
                           <p className="text-xl font-black tabular-nums">-${Math.floor(sim.company.burnRate).toLocaleString()}</p>
                        </div>
                        <Button onClick={handleEndSim} className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-2xl shadow-primary/20">
                           Final Results
                        </Button>
                      </CardContent>
                   </Card>

                   <Card className="glass-card border-accent/20 bg-accent/5">
                      <CardContent className="p-6 space-y-3">
                         <div className="flex items-center gap-2 text-accent">
                            <Heart className="w-4 h-4" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-accent">Your Health</h4>
                         </div>
                         <Progress value={sim.energy} className="h-1.5 bg-accent/20" />
                         <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                           "If your energy is low, you might make mistakes. Take it slow."
                         </p>
                      </CardContent>
                   </Card>
                </div>
              </div>
            </motion.div>
          )}

          {sim.phase === 'AUDIT' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto space-y-12">
               <div className="text-center space-y-4">
                  <div className="w-24 h-24 rounded-[3rem] bg-primary/10 flex items-center justify-center text-primary mx-auto shadow-2xl border border-primary/20">
                     <Trophy className="w-12 h-12" />
                  </div>
                  <h1 className="text-5xl font-headline font-black tracking-tighter">Final Report</h1>
                  <p className="text-muted-foreground text-sm">We checked how you did as the boss of {sim.company.name}.</p>
               </div>

               {audit && (
                 <div className="grid md:grid-cols-2 gap-8">
                    <Card className="glass-card border-primary/20 bg-primary/5 p-10 space-y-6">
                       <div className="flex items-center gap-3 text-primary">
                          <Sparkles className="w-5 h-5" />
                          <h4 className="text-[10px] font-black uppercase tracking-widest">What you did well</h4>
                       </div>
                       <p className="text-lg font-bold leading-relaxed italic">"{audit.biggestStrength}"</p>
                    </Card>
                    <Card className="glass-card border-red-500/20 bg-red-500/5 p-10 space-y-6">
                       <div className="flex items-center gap-3 text-red-500">
                          <ShieldAlert className="w-5 h-5" />
                          <h4 className="text-[10px] font-black uppercase tracking-widest">A Mistake You Made</h4>
                       </div>
                       <p className="text-lg font-bold leading-relaxed italic">"{audit.biggestMistake}"</p>
                    </Card>
                    <Card className="glass-card border-accent/20 bg-accent/5 p-10 space-y-6 md:col-span-2">
                       <div className="flex items-center gap-3 text-accent">
                          <Brain className="w-5 h-5" />
                          <h4 className="text-[10px] font-black uppercase tracking-widest">Advice for Next Time</h4>
                       </div>
                       <p className="text-sm font-medium leading-relaxed">{audit.strategicAdvice}</p>
                    </Card>
                 </div>
               )}

               <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => router.push('/dashboard')} size="lg" className="flex-1 h-16 rounded-2xl font-black uppercase text-[11px] tracking-widest bg-primary shadow-2xl shadow-primary/20">Go to Dashboard</Button>
                  <Button onClick={() => window.location.reload()} variant="outline" size="lg" className="flex-1 h-16 rounded-2xl font-black uppercase text-[11px] tracking-widest border-white/10">Play Again</Button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GameShell>
  )
}
