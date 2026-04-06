'use client';
import { useState, useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import type { FirebaseApp, FirebaseOptions, Auth } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

export function initializeFirebase(options: FirebaseOptions = firebaseConfig) {
  if (getApps().length === 0) {
    firebaseApp = initializeApp(options);
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
  }
  return { app: firebaseApp, auth, firestore };
}

export function FirebaseClientProvider({
  children,
  FirebaseProvider,
}: {
  children: React.ReactNode;
  FirebaseProvider: React.ComponentType<any>;
}) {
  const [firebaseInstances, setFirebaseInstances] = useState<{
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
  } | null>(null);

  useEffect(() => {
    const instances = initializeFirebase();
    setFirebaseInstances(instances);
  }, []);

  if (!firebaseInstances) {
    return null;
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseInstances.app}
      auth={firebaseInstances.auth}
      firestore={firebaseInstances.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
