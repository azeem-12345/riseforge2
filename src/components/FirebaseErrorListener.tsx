'use client';
import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

declare global {
  interface Window {
    __RICH_ERROR_HANDLER__?: (error: any) => void;
  }
}

export function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = (error: any) => {
      if (typeof window !== 'undefined' && window.__RICH_ERROR_HANDLER__) {
        window.__RICH_ERROR_HANDLER__(error);
      } else {
        // Fallback for environments where the rich error handler isn't available
        console.error(
          'A Firestore permission error occurred, but the rich error handler is not available. Raw error:',
          error
        );
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  return null;
}
