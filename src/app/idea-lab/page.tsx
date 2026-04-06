
"use client"

import { useState } from 'react'
import GameShell from '@/components/game/GameShell'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Sparkles, Send, CheckCircle2, Lightbulb, Rocket, Target, Brain } from 'lucide-react'
import { ideaLabFeedback, type IdeaLabFeedbackOutput } from '@/ai/flows/ideaLabFeedbackFlow'
import PageGuide from '@/components/game/PageGuide'

export default function IdeaLabPage() {
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<IdeaLabFeedbackOutput | null>(null)
  
  const [formData, setFormData] = useState({
    problem: '',
    targetAudience: '',
    solution: '',
    revenueModel: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await ideaLabFeedback(formData)
      setFeedback(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GameShell>
      <PageGuide 
        pageKey="idea-lab"
        title="Idea Lab"
        description="This is Step 2. Once you find a problem, you come here to design your fix. This is your workshop where you build the plan for your business, figure out who you are helping, and how you will make money."
        icon={<Sparkles className="w-5 h-5" />}
      />

      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" /> Step 2: Designing Your Fix
          </div>
          <h1 className="text-xl font-headline font-bold">Idea Lab</h1>
          <p className="text-[11px] text-muted-foreground uppercase font-black tracking-widest">Build. Refine. Improve.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-3 glass-card border-white/5">
            <CardHeader className="p-5">
              <CardTitle className="text-[11px] font-black uppercase tracking-widest">Workshop Desk</CardTitle>
              <CardDescription className="text-[10px]">Write down the plan for your business idea.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="problem" className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Target className="w-3.5 h-3.5" /> What struggle are you fixing?
                    </Label>
                    <Textarea 
                      id="problem" 
                      placeholder="Explain the problem people have..."
                      value={formData.problem}
                      onChange={e => setFormData({...formData, problem: e.target.value})}
                      className="bg-background/50 h-20 text-[12px] rounded-xl focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="target" className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Brain className="w-3.5 h-3.5" /> Who are you helping?
                    </Label>
                    <Input 
                      id="target" 
                      placeholder="e.g. Students or Shop owners"
                      value={formData.targetAudience}
                      onChange={e => setFormData({...formData, targetAudience: e.target.value})}
                      className="bg-background/50 h-10 text-[12px] rounded-xl focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="solution" className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" /> Your Product Plan
                    </Label>
                    <Textarea 
                      id="solution" 
                      placeholder="How does your product solve the struggle?"
                      value={formData.solution}
                      onChange={e => setFormData({...formData, solution: e.target.value})}
                      className="bg-background/50 h-20 text-[12px] rounded-xl focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="revenue" className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Rocket className="w-3.5 h-3.5" /> How will you earn money?
                    </Label>
                    <Input 
                      id="revenue" 
                      placeholder="e.g. Monthly fee or selling a tool"
                      value={formData.revenueModel}
                      onChange={e => setFormData({...formData, revenueModel: e.target.value})}
                      className="bg-background/50 h-10 text-[12px] rounded-xl focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 mt-4">
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> AI is checking your plan...</>
                  ) : (
                    <><Send className="mr-2 h-4 w-4" /> Get AI Tips</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            {!feedback ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 glass-card rounded-2xl border-dashed border-white/10 opacity-50">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Lightbulb className="w-8 h-8 text-muted-foreground/30" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest">Ready to help</h3>
                <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">Fill out your product plan to get feedback from our AI Mentor.</p>
              </div>
            ) : (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
                <Card className="glass-card border-primary/20 bg-primary/5">
                  <CardHeader className="p-4">
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" /> AI Mentor Says:
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-[12px] leading-relaxed text-foreground/90 italic font-medium">"{feedback.feedback}"</p>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 px-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Ways to Improve
                  </h4>
                  {feedback.suggestions.map((suggestion, i) => (
                    <div key={i} className="p-4 glass-card rounded-xl border-white/5 hover:border-accent/30 transition-all">
                      <p className="text-[11px] leading-relaxed font-semibold text-foreground/90">{suggestion}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 px-2">
                    <Rocket className="w-3.5 h-3.5 text-primary" /> Your Next Steps
                  </h4>
                  <div className="space-y-2">
                    {feedback.nextStepsPrompts.map((prompt, i) => (
                      <div key={i} className="p-4 bg-card/50 rounded-xl border border-white/5 text-[11px] italic text-muted-foreground leading-relaxed flex items-start gap-3">
                        <span className="text-primary font-bold">{i+1}.</span>
                        "{prompt}"
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </GameShell>
  )
}
