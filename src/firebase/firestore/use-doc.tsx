'use client';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { useMemo } from 'react';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export const useDoc = <T extends DocumentData>(
  path: string
): { data: T | null; isLoading: boolean } => {
  const firestore = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const docRef = useMemo(() => {
    if (!firestore || !path) return null;
    return doc(firestore, path);
  }, [firestore, path]);

  useEffect(() => {
    if (!docRef) return;

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() } as T);
        } else {
          setData(null);
        }
        setIsLoading(false);
      },
      (err) => {
        console.error(err);
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [docRef]);

  return { data, isLoading };
};
