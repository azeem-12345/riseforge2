
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Rocket, Mail, Lock, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeFirebase } from '@/firebase';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { auth } = initializeFirebase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/dashboard');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/onboarding');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-primary p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-accent rounded-full blur-[150px]" />
        </div>
        
        <Link href="/" className="flex items-center gap-2 relative z-10 text-white">
          <Rocket className="w-8 h-8" />
          <span className="font-headline text-3xl font-bold tracking-tighter">RiseForge</span>
        </Link>

        <div className="space-y-6 relative z-10">
          <h2 className="text-5xl font-extrabold text-white leading-tight">
            The Journey to <br />
            Greatness Starts <br />
            <span className="text-accent underline">Right Here.</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Join thousands of explorers building the future one skill at a time.
          </p>
        </div>

        <div className="relative z-10 text-white/60 text-sm">
          © 2025 RiseForge Inc.
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-headline font-bold">
              {isLogin ? 'Welcome Back, Explorer' : 'Begin Your Journey'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? 'Enter your credentials to enter the Forge.' : 'Create your account to start leveling up.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="explorer@riseforge.com" 
                    className="pl-10 h-11" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-11" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <Button type="submit" className="w-full h-11 rounded-xl shadow-lg shadow-primary/20" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')} 
              {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>

          <div className="text-center">
            <button 
              onClick={() => {
                setIsLogin(!isLogin)
                setError(null)
              }}
              className="text-sm font-medium text-primary hover:underline transition-all"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
