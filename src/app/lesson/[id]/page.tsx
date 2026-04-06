
"use client"

import { useState, use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import GameShell from '@/components/game/GameShell'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  CheckCircle2, 
  Trophy, 
  Sparkles, 
  Zap,
  BookOpen,
  PlayCircle,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  Lightbulb,
  Info
} from 'lucide-react'
import { useGameState } from '@/hooks/use-game-state'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ACADEMY_CONTENT } from '@/lib/academy-data'
import { PlaceHolderImages } from '@/lib/placeholder-images'

type Step = 'theory' | 'scenario' | 'integration' | 'summary'
const STEPS: Step[] = ['theory', 'scenario', 'integration', 'summary']

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 500 : -500,
    opacity: 0,
    scale: 0.95
  })
}

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const lesson = ACADEMY_CONTENT[id]
  const router = useRouter()
  const { completeLesson, state } = useGameState()

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [simFeedback, setSimFeedback] = useState<string | null>(null)

  if (!lesson) {
    return (
      <GameShell>
        <div className="text-center py-24">
          <h2 className="text-lg font-bold">Strategic Link Broken</h2>
          <p className="text-muted-foreground mt-2">The curriculum module is currently under encryption.</p>
          <Button onClick={() => router.push('/world-map')} className="mt-8 rounded-xl h-11 px-8 font-black uppercase text-[10px] tracking-widest">Return to Academy Path</Button>
        </div>
      </GameShell>
    )
  }

  const currentStep = STEPS[currentStepIndex]
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setDirection(1)
      setCurrentStepIndex(prev => prev + 1)
    } else {
      handleFinish()
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setDirection(-1)
      setCurrentStepIndex(prev => prev - 1)
    }
  }

  const handleFinish = () => {
    completeLesson(id, lesson.xpReward, lesson.simulationIntegration.unlockKey)
    setIsFinished(true)
  }

  return (
    <GameShell>
      <div className="max-w-5xl mx-auto min-h-[85vh] flex flex-col pb-16">
        {/* Top Header */}
        <div className="flex items-center justify-between py-3 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push('/world-map')} className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
            </Button>
            <div className="space-y-0.5">
              <h1 className="text-[9px] font-black tracking-tight uppercase leading-none">Week {lesson.week}: {lesson.title}</h1>
              <p className="text-[7px] text-muted-foreground uppercase tracking-widest font-black">Level {lesson.level}: Foundation Module</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {STEPS.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-5 h-1 rounded-full transition-all duration-500",
                    i <= currentStepIndex ? "bg-primary" : "bg-white/10"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-start relative py-2">
          <AnimatePresence mode="wait" custom={direction}>
            {!isFinished ? (
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3 }
                }}
                className="w-full flex justify-center"
              >
                {/* Step 1: Theory (PDF / Paper Style) */}
                {currentStep === 'theory' && (
                  <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-2 duration-1000">
                    <Card className="bg-white text-slate-900 border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-sm overflow-hidden flex flex-col relative mx-auto">
                      {/* Paper Accent */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
                      
                      <CardContent className="p-4 md:p-10 space-y-4 flex-1 font-serif">
                        <div className="space-y-2 border-b border-slate-100 pb-6">
                          <p className="text-[7px] font-black uppercase tracking-[0.4em] text-primary/60 mb-1">Executive Briefing • Week {lesson.week}</p>
                          <h2 className="text-xl md:text-2xl font-extrabold tracking-tighter text-slate-900 leading-tight">{lesson.title}</h2>
                          <p className="text-[12px] font-medium text-slate-500 leading-relaxed max-w-3xl">{lesson.objective}</p>
                        </div>

                        <div className="space-y-4">
                           <div className="text-[12px] leading-[1.6] text-slate-700 space-y-4">
                             {lesson.theory.split('\n').map((line, i) => {
                               if (line.startsWith('## ')) {
                                 return (
                                   <h3 key={i} className="text-sm font-black text-slate-900 mt-8 mb-3 tracking-tight uppercase font-sans border-l-4 border-primary pl-4">
                                     {line.replace('## ', '')}
                                   </h3>
                                 )
                               }
                               
                               if (line.startsWith('!!IMAGE:')) {
                                 const imageId = line.replace('!!IMAGE:', '').replace('!!', '').trim()
                                 const imageData = PlaceHolderImages.find(img => img.id === imageId)
                                 if (imageData) {
                                   return (
                                     <div key={i} className="my-6 flex flex-col items-center">
                                       <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-100 shadow-sm bg-slate-50 max-w-2xl mx-auto">
                                         <Image 
                                           src={imageData.imageUrl} 
                                           alt={imageData.description}
                                           fill
                                           className="object-contain p-2"
                                           data-ai-hint={imageData.imageHint}
                                         />
                                       </div>
                                       <p className="text-[7px] uppercase font-bold text-slate-400 mt-2 tracking-widest">{imageData.description}</p>
                                     </div>
                                   )
                                 }
                               }

                               if (line.startsWith('|')) {
                                 const cells = line.split('|').filter(c => c.trim() !== '').map(c => c.trim());
                                 if (cells.length === 0 || line.includes('---')) return null;
                                 return (
                                   <div key={i} className="grid grid-cols-2 gap-6 py-3 border-b border-slate-100 last:border-0 font-sans">
                                     <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{cells[0]}</span>
                                     <span className="text-[11px] text-slate-600 font-medium">{cells[1]}</span>
                                   </div>
                                 )
                               }

                               if (line.trim() === '') return null
                               return <p key={i} className="font-normal">{line}</p>
                             })}
                           </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-100 font-sans">
                          <div className="space-y-3">
                             <h3 className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                               <Lightbulb className="w-3 h-3 text-primary" /> Case Examples
                             </h3>
                             <ul className="space-y-3">
                               {lesson.examples.map((ex, i) => (
                                 <li key={i} className="text-[10px] text-slate-600 border-l-2 border-primary/10 pl-4 py-0.5 italic leading-relaxed">
                                   {ex}
                                 </li>
                               ))}
                             </ul>
                          </div>
                          <div className="space-y-3">
                             <h3 className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                               <Zap className="w-3 h-3 text-primary" /> Core Terminology
                             </h3>
                             <div className="space-y-3">
                               {lesson.vocabulary.map((v, i) => (
                                 <div key={i} className="text-[10px]">
                                   <span className="font-bold text-slate-900 mr-2">{v.word}:</span>
                                   <span className="text-slate-500">{v.definition}</span>
                                 </div>
                               ))}
                           </div>
                          </div>
                        </div>
                      </CardContent>
                      
                      {/* Footer Decoration */}
                      <div className="p-4 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center text-[7px] font-bold text-slate-400 uppercase tracking-widest font-sans">
                        <span>RiseForge Academy Internal Document</span>
                        <span>CONFIDENTIAL • FOR EDUCATIONAL USE</span>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Step 2: Scenario */}
                {currentStep === 'scenario' && (
                  <div className="space-y-4 w-full max-w-3xl">
                    <div className="p-6 rounded-[1.5rem] glass-card border-accent/20 bg-accent/[0.02] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-5"><BarChart3 className="w-24 h-24" /></div>
                      <div className="flex items-center gap-3 mb-6">
                         <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent shadow-inner"><PlayCircle className="w-5 h-5" /></div>
                         <div>
                            <p className="text-[9px] font-black text-accent uppercase tracking-[0.2em]">Strategic Simulation</p>
                            <h3 className="text-base font-black tracking-tight">{lesson.scenario.title}</h3>
                         </div>
                      </div>
                      <div className="p-4 bg-black/40 rounded-xl border border-white/5 mb-6">
                         <p className="text-[12px] leading-relaxed font-medium italic text-foreground/90">"{lesson.scenario.description}"</p>
                      </div>
                      <div className="grid gap-2">
                        {lesson.scenario.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setSimFeedback(option.feedback)}
                            className={cn(
                              "w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center group",
                              simFeedback === option.feedback ? "border-accent bg-accent/10" : simFeedback ? "opacity-30 border-white/5" : "hover:border-accent/40 hover:bg-white/5 border-white/5"
                            )}
                          >
                            <span className="font-bold text-[12px]">{option.label}</span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                    {simFeedback && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 rounded-[1.5rem] glass-card border-primary/20 bg-primary/[0.03] space-y-2">
                        <div className="flex items-center gap-2 text-primary"><Sparkles className="w-3 h-3" /> <h4 className="font-black uppercase tracking-[0.3em] text-[9px]">Strategic Feedback</h4></div>
                        <p className="text-[12px] font-medium leading-relaxed text-foreground/90 italic">"{simFeedback}"</p>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Step 3: Integration */}
                {currentStep === 'integration' && (
                  <div className="space-y-4 w-full max-w-3xl">
                    <Card className="glass-card border-violet-500/20 bg-violet-500/[0.02] p-6 space-y-4">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 shadow-xl"><Zap className="w-5 h-5" /></div>
                          <div>
                             <p className="text-[9px] font-black text-violet-500 uppercase tracking-[0.3em]">System Upgrade</p>
                             <h3 className="text-lg font-black tracking-tighter">Founder OS Integration</h3>
                          </div>
                       </div>
                       <div className="grid md:grid-cols-3 gap-3">
                          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                             <h4 className="text-[8px] font-black uppercase text-muted-foreground">Module Unlock</h4>
                             <p className="text-[11px] font-bold text-violet-500">{lesson.simulationIntegration.featureUnlock}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                             <h4 className="text-[8px] font-black uppercase text-muted-foreground">Strategic Action</h4>
                             <p className="text-[11px] font-bold text-foreground">{lesson.simulationIntegration.decision}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                             <h4 className="text-[8px] font-black uppercase text-muted-foreground">Strategic Logic</h4>
                             <p className="text-[10px] text-muted-foreground italic leading-relaxed">{lesson.simulationIntegration.logic}</p>
                          </div>
                       </div>
                       <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20 flex gap-2 items-center">
                          <Info className="w-4 h-4 text-violet-500 shrink-0" />
                          <p className="text-[10px] text-violet-500 font-medium leading-relaxed">Completing this lesson will unlock the {lesson.simulationIntegration.featureUnlock} module in your Founder OS dashboard.</p>
                       </div>
                    </Card>
                  </div>
                )}

                {/* Step 4: Summary */}
                {currentStep === 'summary' && (
                  <div className="space-y-4 text-center py-4 w-full max-w-3xl">
                    <div className="relative inline-block mb-4">
                       <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                       <Trophy className="w-20 h-20 text-primary relative z-10 mx-auto drop-shadow-[0_0_20px_rgba(var(--primary),0.4)]" />
                    </div>
                    <div className="space-y-2 max-w-xl mx-auto">
                      <h2 className="text-2xl font-headline font-black tracking-tight">Module Mastery</h2>
                      <p className="text-[12px] text-muted-foreground leading-relaxed font-medium">{lesson.summary}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 max-w-md mx-auto pt-6">
                      <div className="p-4 rounded-xl glass-card border-white/5 space-y-1 text-center">
                         <p className="text-[8px] font-black uppercase text-primary tracking-widest">XP Awarded</p>
                         <p className="text-xl font-black">+{lesson.xpReward}</p>
                      </div>
                      <div className="p-4 rounded-xl glass-card border-white/5 space-y-1 text-center">
                         <p className="text-[8px] font-black uppercase text-accent tracking-widest">Growth Status</p>
                         <p className="text-xl font-black">STABLE</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
               <div className="h-80 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-500 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                  <h2 className="text-xl font-black uppercase tracking-tighter">Module Complete</h2>
                  <p className="text-[12px] text-muted-foreground max-w-xs">You have successfully mastered this strategic unit and earned your rewards.</p>
                  <Button onClick={() => router.push('/world-map')} className="rounded-xl h-10 px-8 font-black bg-primary text-[9px] uppercase tracking-widest">Return to Path</Button>
               </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation Controls */}
        {!isFinished && (
          <div className="fixed bottom-0 left-0 right-0 p-3 md:p-4 border-t border-white/5 bg-background/80 backdrop-blur-md z-40">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
              <Button 
                variant="outline" 
                onClick={handleBack} 
                disabled={currentStepIndex === 0}
                className="h-9 px-4 rounded-lg border-white/10 text-[8px] font-black uppercase tracking-widest disabled:opacity-30"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1.5" /> Back
              </Button>

              <div className="flex-1 text-center hidden sm:block">
                <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Page {currentStepIndex + 1} of {STEPS.length}</p>
              </div>

              <Button 
                onClick={handleNext} 
                className="h-9 px-6 rounded-lg bg-primary text-white font-black uppercase text-[8px] tracking-widest shadow-xl shadow-primary/20"
              >
                {currentStepIndex === STEPS.length - 1 ? "FINALIZE MODULE" : "NEXT PAGE"} <ChevronRight className="ml-1.5 w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </GameShell>
  )
}
