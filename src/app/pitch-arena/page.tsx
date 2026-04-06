
"use client"

import { useState } from 'react'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useGameState } from '@/hooks/use-game-state'
import { Mic, Send, Loader2, Sparkles, Trophy, ShieldCheck, Zap, MessageSquare, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { evaluatePitch, type PitchEvaluationOutput } from '@/ai/flows/evaluate-pitch-flow'
import PageGuide from '@/components/game/PageGuide'

export default function PitchArenaPage() {
  const { addXP, addReputation } = useGameState()
  const [pitch, setPitch] = useState('')
  const [loading, setLoading] = useState(false)
  const [evaluation, setEvaluation] = useState<PitchEvaluationOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handlePitchSubmit = async () => {
    if (!pitch.trim() || loading) return
    setLoading(true)
    setError(null)
    
    try {
      const result = await evaluatePitch({ pitchText: pitch })
      
      if (result.isSuccess) {
        setEvaluation(result)
        addXP(result.score * 5)
        addReputation(Math.floor(result.score / 10))
      } else {
        setError(result.feedback)
        setEvaluation(null)
      }
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try typing your pitch again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <GameShell>
      <PageGuide 
        pageKey="pitch-arena"
        title="Pitch Room"
        description="This is Step 3. Now that you have a plan from the Idea Lab, you must practice explaining it to others. This page tests how clearly you can speak about your business. If you can explain it well, people will trust you more!"
        icon={<Mic className="w-5 h-5" />}
      />

      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.2em] animate-pulse">
            <Mic className="w-4 h-4" /> Step 3: Practice Explaining
          </div>
          <h1 className="text-4xl font-headline font-black tracking-tighter">Pitch Room</h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Practice telling people about your business. Our AI will tell you if your explanation is clear and if people would trust your idea.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <Card className="lg:col-span-3 glass-card border-white/5 overflow-hidden">
            <CardHeader className="p-8 border-b border-white/5">
              <CardTitle className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                <Send className="w-4 h-4 text-primary" /> Your Speech
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <Textarea 
                  placeholder="Describe your solution, who you help, and how you earn money. Try to be very clear and simple..."
                  value={pitch}
                  onChange={e => {
                    setPitch(e.target.value)
                    if (error) setError(null)
                  }}
                  className={cn(
                    "bg-white/5 border-white/10 min-h-[300px] text-sm rounded-2xl focus:border-primary/50 transition-all resize-none p-6",
                    error && "border-red-500/50 focus:border-red-500"
                  )}
                  disabled={loading || !!evaluation}
                />
                
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-bold flex items-center gap-3"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}

                {!evaluation ? (
                  <Button 
                    onClick={handlePitchSubmit} 
                    disabled={!pitch.trim() || loading}
                    className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 mr-3 animate-spin" /> AI is listening...</>
                    ) : (
                      <><Sparkles className="w-4 h-4 mr-3" /> Get My Clarity Score</>
                    )}
                  </Button>
                ) : (
                  <Button onClick={() => { setEvaluation(null); setPitch(''); }} variant="outline" className="w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    Try Another Way
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              {!evaluation ? (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full glass-card p-10 flex flex-col items-center justify-center text-center space-y-4 opacity-40 grayscale"
                >
                  <Trophy className="w-20 h-20 text-muted-foreground mb-4" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Awaiting Speech</h4>
                  <p className="text-[11px] leading-relaxed">Your clarity scores will show up here once you explain your idea.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <Card className="glass-card border-primary/40 bg-primary/5 overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x" />
                    <CardContent className="p-8 text-center space-y-4">
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Clarity Score</p>
                      <h2 className="text-6xl font-black tracking-tighter tabular-nums">{evaluation.score}</h2>
                      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black">
                        <ShieldCheck className="w-3.5 h-3.5" /> RESULTS READY
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4">
                    {[
                      { label: 'Clarity (Is it simple?)', val: evaluation.clarity, color: 'bg-primary' },
                      { label: 'Market (Is it useful?)', val: evaluation.market, color: 'bg-accent' },
                      { label: 'Viability (Can it work?)', val: evaluation.viability, color: 'bg-green-500' },
                    ].map((m, i) => (
                      <Card key={i} className="glass-card border-white/5 p-5 space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                          <span>{m.label}</span>
                          <span className="text-foreground">{m.val}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${m.val}%` }}
                            className={cn("h-full", m.color)}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Card className="glass-card border-accent/20 bg-accent/[0.03]">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-4 h-4 text-accent" />
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-accent">AI Coach Feedback</h5>
                      </div>
                      <p className="text-[11px] leading-relaxed italic text-foreground/90">
                        "{evaluation.feedback}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </GameShell>
  )
}
