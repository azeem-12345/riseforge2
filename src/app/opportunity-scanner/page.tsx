"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GameShell from '@/components/game/GameShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Eye, 
  Zap, 
  Search, 
  ArrowUpRight, 
  Clock, 
  Sparkles, 
  RefreshCw, 
  Loader2, 
  MessageSquare
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import PageGuide from '@/components/game/PageGuide'
import { generateMarketProblems } from '@/ai/flows/generate-problems-flow'
import { founderMentor } from '@/ai/flows/founder-mentor-flow'
import { useGameState } from '@/hooks/use-game-state'

export default function OpportunityScannerPage() {
  const { state } = useGameState()
  const router = useRouter()
  
  const [problems, setProblems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [logs, setLogs] = useState<any[]>([])
  const [selectedTrend, setSelectedTrend] = useState<any | null>(null)
  
  // Mentor Discussion trigger states
  const [discussing, setDiscussing] = useState(false)

  // Load saved notebook logs from localStorage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('riseforge_notebook_logs')
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs))
      } catch (e) {
        console.error("Failed to load notebook logs", e)
      }
    }
  }, [])

  const fetchProblems = async () => {
    setLoading(true)
    setError(null)
    setSelectedTrend(null)
    try {
      const result = await generateMarketProblems({ count: 3 })
      setProblems(result.problems)
    } catch (err) {
      console.error(err)
      setError("Unable to generate struggles. Please check that GEMINI_API_KEY or GOOGLE_GENAI_API_KEY is configured in your server environment.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProblems()
  }, [])

  const logPattern = (trend: any) => {
    if (logs.find(l => l.id === trend.id)) return;
    const newLogs = [...logs, { ...trend, timestamp: Date.now() }]
    setLogs(newLogs)
    localStorage.setItem('riseforge_notebook_logs', JSON.stringify(newLogs))
    setSelectedTrend(null)
  }

  const startMentorDiscussion = async (trend: any) => {
    if (discussing) return
    setDiscussing(true)
    try {
      const userMsgText = `I want to discuss the market opportunity: "${trend.title}" affecting "${trend.segment}". The problem description is: "${trend.description}". The suggested potential solution is: "${trend.potential}". How should I get started validating this?`
      
      // Call the server action to get strategic advice
      const result = await founderMentor({
        userQuestion: userMsgText,
        level: state.level,
        levelTitle: state.levelTitle
      })
      
      // Save to localStorage as a structured chat thread
      const saved = localStorage.getItem('riseforge_mentor_threads')
      const threads = saved ? JSON.parse(saved) : []
      
      const threadId = `thread-${Date.now()}`
      const userMsg = { role: 'user', text: userMsgText, timestamp: Date.now() }
      const mentorMsg = { role: 'mentor', data: result, timestamp: Date.now() }
      
      const newThread = {
        id: threadId,
        title: trend.title, // Short title for the chatbot thread sidebar
        messages: [userMsg, mentorMsg],
        timestamp: Date.now()
      }
      
      threads.unshift(newThread)
      localStorage.setItem('riseforge_mentor_threads', JSON.stringify(threads))
      localStorage.setItem('riseforge_mentor_active_thread_id', threadId)
      
      // Redirect to the mentor page
      router.push('/mentor')
    } catch (err) {
      console.error("Failed to start mentor discussion:", err)
    } finally {
      setDiscussing(false)
    }
  }

  return (
    <GameShell>
      <PageGuide 
        pageKey="opportunity-scanner"
        title="Finding Problems"
        description="This is the first step of being a founder. Before you have an idea, you must look for things that are broken or hard for people in the real world. If you find a big problem, you can build a big business to fix it!"
        icon={<Eye className="w-5 h-5" />}
      />

      <div className="max-w-6xl mx-auto space-y-10 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
              <Eye className="w-3.5 h-3.5" /> Problem Spotter
            </div>
            <h1 className="text-3xl font-headline font-black tracking-tighter">Finding Problems</h1>
            <p className="text-[11px] text-muted-foreground uppercase font-black tracking-[0.3em]">Step 1: Look at the world</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchProblems} 
              disabled={loading}
              className="rounded-xl border-white/10 h-10 text-[10px] font-black uppercase tracking-widest animate-fade-in"
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Refresh Struggles
            </Button>
            <div className="glass-card px-6 py-2.5 rounded-xl border-white/5">
              <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Struggles Found</p>
              <p className="text-lg font-black tabular-nums">{logs.length} / 10</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 px-2">
              <Search className="w-4 h-4" /> Real-World Struggles
            </h3>
            
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="glass-card border-white/5 animate-pulse">
                    <CardContent className="p-10" />
                  </Card>
                ))
              ) : error ? (
                <Card className="glass-card border-red-500/10 bg-red-500/[0.02] p-8 text-center space-y-4">
                  <p className="text-xs text-red-400 font-medium max-w-md mx-auto">{error}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={fetchProblems}
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10 h-8 text-[10px] font-semibold uppercase tracking-wider rounded-lg"
                  >
                    Try Again
                  </Button>
                </Card>
              ) : (
                problems.map((trend) => (
                  <Card 
                    key={trend.id} 
                    onClick={() => setSelectedTrend(trend)}
                    className={cn(
                      "glass-card border-white/5 hover:border-accent/40 transition-all cursor-pointer group relative overflow-hidden",
                      selectedTrend?.id === trend.id && "border-accent/60 bg-accent/5"
                    )}
                  >
                    <CardContent className="p-6 flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[8px] font-black uppercase border-accent/20 text-accent">{trend.segment}</Badge>
                          <Badge className={cn(
                            "text-[8px] font-black uppercase",
                            trend.intensity === 'High' ? "bg-red-500/20 text-red-500" : "bg-orange-500/20 text-orange-500"
                          )}>Pain Level: {trend.intensity}</Badge>
                        </div>
                        <h4 className="text-lg font-black tracking-tight group-hover:text-accent transition-colors">{trend.title}</h4>
                        <p className="text-[11px] text-muted-foreground line-clamp-1 italic">"{trend.description}"</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {selectedTrend ? (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="glass-card border-accent/40 bg-accent/5 p-8 space-y-6">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-accent uppercase tracking-widest">Studying the Problem</p>
                      <h3 className="text-xl font-black">{selectedTrend.title}</h3>
                    </div>
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                      <p className="text-[12px] leading-relaxed text-foreground/80 italic">
                        {selectedTrend.description}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-primary">
                        <Sparkles className="w-4 h-4" />
                        <h5 className="text-[10px] font-black uppercase tracking-widest">Possible Fix</h5>
                      </div>
                      <p className="text-[11px] font-bold text-foreground/90">{selectedTrend.potential}</p>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <Button 
                        onClick={() => logPattern(selectedTrend)}
                        className="w-full h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest"
                      >
                        Save to My Notebook
                      </Button>

                      {/* Mentor Discussion Trigger */}
                      <Button 
                        onClick={() => startMentorDiscussion(selectedTrend)}
                        disabled={discussing}
                        className="w-full h-11 rounded-xl bg-accent hover:bg-accent/90 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-accent/20 flex items-center justify-center gap-2"
                      >
                        {discussing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Prepping Advisor...
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-4 h-4" />
                            Discuss with Mentor
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full glass-card p-10 flex flex-col items-center justify-center text-center space-y-4 opacity-50 grayscale"
                >
                  <Search className="w-12 h-12 text-muted-foreground mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Pick a Struggle</p>
                  <p className="text-[11px] leading-relaxed">Select a problem from the list to see how it could be fixed.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <Card className="glass-card border-white/5 overflow-hidden">
              <CardHeader className="p-6 border-b border-white/5">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> My Notebook
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {logs.length === 0 ? (
                  <p className="text-[10px] text-muted-foreground italic text-center py-4">No struggles saved yet.</p>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <p className="text-[11px] font-bold truncate pr-4">{log.title}</p>
                      <Badge variant="ghost" className="text-[8px] opacity-50">SAVED</Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GameShell>
  )
}
