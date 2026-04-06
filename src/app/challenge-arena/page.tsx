"use client"

import { useState, useEffect } from 'react'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Sword, 
  Trophy, 
  Zap, 
  Sparkles, 
  RefreshCw,
  Loader2,
  AlertCircle,
  Brain,
  MessageSquare,
  Clock,
  Layout,
  FileText,
  Send,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react'
import { generateChallengeArenaMission, type ChallengeArenaGenerationOutput } from '@/ai/flows/challenge-arena-generation-flow'
import { evaluateMissionSubmission } from '@/ai/flows/evaluate-mission-flow'
import { useGameState } from '@/hooks/use-game-state'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function ChallengeArenaPage() {
  const { state, addXP } = useGameState()
  const [mission, setMission] = useState<ChallengeArenaGenerationOutput | null>(null)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [submissionText, setSubmissionText] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const fetchMission = async () => {
    setLoading(true)
    setCompleted(false)
    setSubmissionText('')
    setFeedback(null)
    try {
      const result = await generateChallengeArenaMission({
        playerLevel: state.levelTitle,
        unlockedSkills: [],
        completedLessons: state.completedLessons,
        currentStreak: state.streak,
        interests: state.profile?.interests || []
      })
      setMission(result)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMission()
  }, [])

  const handleComplete = async () => {
    if (!mission || completed || !submissionText.trim() || verifying) return
    
    setVerifying(true)
    setFeedback(null)
    
    try {
      const evaluation = await evaluateMissionSubmission({
        missionTitle: mission.title,
        missionGoal: mission.challengeGoal,
        submissionText: submissionText
      })

      if (evaluation.isSuccess) {
        addXP(mission.xpReward)
        setCompleted(true)
      } else {
        setFeedback(evaluation.feedback)
      }
    } catch (err) {
      console.error(err)
      setFeedback("System error during verification. Please try again.")
    } finally {
      setVerifying(false)
    }
  }

  return (
    <GameShell>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-xl font-headline font-bold flex items-center gap-2">
              <Sword className="text-primary w-5 h-5" /> Challenge Arena
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-black">Weekly Strategic Missions</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchMission} disabled={loading || verifying} className="rounded-xl border-primary/20 h-9 text-[10px] font-black uppercase tracking-widest">
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
            <span className="ml-2 hidden sm:inline">Refresh Quest</span>
          </Button>
        </div>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4 glass-card rounded-3xl animate-pulse">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground font-black tracking-widest uppercase text-[10px]">Generating Strategic Quest...</p>
          </div>
        ) : mission ? (
          <div className="space-y-8">
            <Card className="glass-card border-primary/20 overflow-hidden shadow-2xl">
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x" />
              <CardHeader className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                   <Badge className="bg-primary/10 text-primary border-primary/20 uppercase tracking-widest text-[9px] font-black">{mission.theme}</Badge>
                   <Badge variant="outline" className="border-accent/20 text-accent font-black uppercase text-[9px]">{mission.difficulty}</Badge>
                </div>
                <h2 className="text-xl font-headline font-black tracking-tight">{mission.title}</h2>
                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 relative">
                   <AlertCircle className="absolute -top-2 -left-2 w-6 h-6 text-primary opacity-20" />
                   <p className="text-[13px] leading-relaxed text-foreground/90 font-medium whitespace-pre-wrap">{mission.description}</p>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-8 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-card border border-white/5 text-center">
                    <Trophy className="w-4 h-4 mx-auto mb-1.5 text-primary" />
                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Reward</p>
                    <p className="text-xs font-black text-primary">+{mission.xpReward} XP</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-white/5 text-center">
                    <Clock className="w-4 h-4 mx-auto mb-1.5 text-accent" />
                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Est. Time</p>
                    <p className="text-xs font-black text-accent">{mission.estimatedCompletionTimeHours}h</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-white/5 text-center col-span-2">
                    <Brain className="w-4 h-4 mx-auto mb-1.5 text-violet-500" />
                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Skills Tested</p>
                    <p className="text-xs font-black text-violet-500 truncate">{mission.associatedSkills.join(', ')}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-[10px] font-black text-primary uppercase mb-1 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5" /> Target Objective
                  </p>
                  <p className="text-[12px] font-medium italic text-foreground/80 leading-relaxed">"{mission.challengeGoal}"</p>
                </div>

                {!completed && (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5" /> Mission Evidence Report
                      </label>
                      <Textarea 
                        placeholder="Describe how you completed this mission. Gibberish or low-effort responses will be rejected by the Forge Master..."
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        className={cn(
                          "bg-white/5 border-white/10 min-h-[120px] text-[12px] rounded-xl focus:border-primary/50 transition-all",
                          feedback && "border-red-500/50 focus:border-red-500"
                        )}
                        disabled={verifying}
                      />
                      {feedback && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[11px] font-bold text-red-500 flex items-center gap-2"
                        >
                          <ShieldAlert className="w-3.5 h-3.5" /> {feedback}
                        </motion.p>
                      )}
                    </div>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {!completed ? (
                    <Button 
                      onClick={handleComplete} 
                      disabled={!submissionText.trim() || verifying}
                      className="w-full h-11 rounded-xl font-black shadow-xl shadow-primary/20 text-xs uppercase tracking-widest"
                    >
                      {verifying ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> VERIFYING AUTHENTICITY...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" /> SUBMIT ACTION REPORT
                        </>
                      )}
                    </Button>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 rounded-2xl bg-green-500/10 border border-green-500/20 text-center space-y-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      </div>
                      <h4 className="text-lg font-headline font-black text-green-500 tracking-tight">MISSION VERIFIED</h4>
                      <p className="text-[11px] text-muted-foreground font-medium">Your strategy has been logged. You earned {mission.xpReward} XP.</p>
                      <Button variant="outline" onClick={fetchMission} className="mt-4 h-9 border-green-500/30 text-green-500 hover:bg-green-500/10 text-[10px] font-black uppercase tracking-widest px-6">New Mission</Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
               <div className="glass-card p-5 rounded-2xl border-white/5 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0"><Layout className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-[12px] uppercase tracking-tight">Real-World Action</h4>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">Missions are designed for active execution, not just reading.</p>
                  </div>
               </div>
               <div className="glass-card p-5 rounded-2xl border-white/5 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0"><MessageSquare className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-[12px] uppercase tracking-tight">AI Verified</h4>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">The Forge Master analyzes your report for strategic depth and realism.</p>
                  </div>
               </div>
               <div className="glass-card p-5 rounded-2xl border-white/5 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0"><Zap className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-[12px] uppercase tracking-tight">XP Accumulation</h4>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">Level up your profile by consistently completing weekly goals.</p>
                  </div>
               </div>
            </div>
          </div>
        ) : null}
      </div>
    </GameShell>
  )
}
