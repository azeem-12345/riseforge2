'use client';
import { useEffect, useState, useRef } from 'react';
import {
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
  limit,
  startAt,
  endAt,
  collectionGroup,
} from 'firebase/firestore';
import type {
  CollectionReference,
  DocumentData,
  Query,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { useMemo } from 'react';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

type QueryBuilder = (
  ref: CollectionReference,
  helpers: {
    query: typeof query;
    where: typeof where;
    orderBy: typeof orderBy;
    limit: typeof limit;
    startAt: typeof startAt;
    endAt: typeof endAt;
    collectionGroup: typeof collectionGroup;
  }
) => Query;

export const useCollection = <T extends DocumentData>(
  path: string,
  queryBuilder?: QueryBuilder
): { data: T[] | null; isLoading: boolean } => {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const queryRef = useMemo(() => {
    if (!firestore) return null;
    const ref = collection(firestore, path);
    if (queryBuilder) {
      return queryBuilder(ref, {
        query,
        where,
        orderBy,
        limit,
        startAt,
        endAt,
        collectionGroup,
      });
    }
    return ref;
  }, [firestore, path, queryBuilder]);

  useEffect(() => {
    if (!queryRef) return;

    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(docs);
        setIsLoading(false);
      },
      (err) => {
        console.error(err);
        const permissionError = new FirestorePermissionError({
          path: queryRef.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [queryRef]);

  return { data, isLoading };
};
