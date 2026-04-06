'use client';
import { useEffect, useState }from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';

export const useUser = () => {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(auth ? auth.currentUser : null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      return;
    }
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setIsLoading(false);
      },
      (error) => {
        console.error('onAuthStateChanged error', error);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, [auth]);
  return { user, isLoading };
};
