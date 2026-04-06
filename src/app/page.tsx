
"use client"

import Link from 'next/link'
import { Rocket, Zap, Target, Users, ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg shadow-lg shadow-primary/20">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tighter">RiseForge</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#why" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Why RiseForge</Link>
          <Link href="#how" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
          <Link href="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
          <Button asChild className="rounded-full px-6">
            <Link href="/auth?signup=true">Start Journey</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3 h-3" /> New Era of Learning
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter">
            You Were Born <br />
            <span className="gradient-text">To Build.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Entrepreneurship isn’t about business. It’s about solving problems that matter. Master the skills, beat the challenges, and Forge the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-xl shadow-primary/20" asChild>
              <Link href="/auth">Start Your Journey <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-primary/20" asChild>
              <Link href="/world-map"><Play className="mr-2 w-5 h-5" /> Explore the World</Link>
            </Button>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/80/80`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Joined by <span className="text-foreground font-bold">12,000+</span> future founders
            </p>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-3xl blur-3xl opacity-30" />
          <div className="relative rounded-3xl border border-white/10 glass-card p-4 rotate-3 animate-float">
             <img 
               src="https://picsum.photos/seed/apppreview/800/600" 
               alt="RiseForge Dashboard" 
               className="rounded-2xl shadow-2xl"
               data-ai-hint="dashboard preview"
             />
          </div>
        </div>
      </section>

      {/* 3-Step Section */}
      <section id="how" className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">The Forge Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From an Explorer to a Visionary. Follow the path designed to unlock your potential.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Level Up Skills', icon: Target, desc: 'Complete interactive lessons across 5 core worlds to earn XP and unlock abilities.' },
              { title: 'Beat Quests', icon: Zap, desc: 'Apply your knowledge in the Challenge Arena with real-world missions that matter.' },
              { title: 'Forge Ideas', icon: Rocket, desc: 'Build and refine your startup concept in the Idea Lab with AI-guided feedback.' }
            ].map((step, idx) => (
              <div key={idx} className="glass-card p-8 rounded-2xl border-white/5 space-y-4 hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Rocket className="text-primary w-5 h-5" />
            <span className="font-headline font-bold">RiseForge</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 RiseForge. Level Up Your Thinking.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground">Twitter</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Discord</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
