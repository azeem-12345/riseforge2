'use client';
import { createContext, useContext, ReactNode } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { FirebaseClientProvider } from './client-provider';
import { FirebaseErrorListener } from '../components/FirebaseErrorListener';


interface FirebaseContextValue {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  firebaseApp: null,
  auth: null,
  firestore: null,
});

export const useFirebase = () => useContext(FirebaseContext);
export const useFirebaseApp = () => useContext(FirebaseContext)?.firebaseApp;
export const useAuth = () => useContext(FirebaseContext)?.auth;
export const useFirestore = () => useContext(FirebaseContext)?.firestore;

export function FirebaseProvider({
  children,
  firebaseApp,
  auth,
  firestore,
}: {
  children: ReactNode;
  firebaseApp?: FirebaseApp;
  auth?: Auth;
  firestore?: Firestore;
}) {
  if (firebaseApp && auth && firestore) {
    return (
      <FirebaseContext.Provider value={{ firebaseApp, auth, firestore }}>
        <FirebaseErrorListener />
        {children}
      </FirebaseContext.Provider>
    );
  }

  return (
    <FirebaseClientProvider FirebaseProvider={FirebaseProvider}>
      {children}
    </FirebaseClientProvider>
  );
}
