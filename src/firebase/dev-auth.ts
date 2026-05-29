/**
 * Development Authentication Bypass
 * TEMPORARY: Remove this file when authentication is needed in production
 * 
 * This file provides a mock authentication context for development purposes,
 * allowing users to skip the login system.
 */

export const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true' || true; // Set to false to enable real auth

export const MOCK_USER = {
  uid: 'dev-user-12345',
  email: 'dev@riseforge.local',
  displayName: 'Development User',
  photoURL: 'https://picsum.photos/seed/devuser/80/80',
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: new Date().toISOString(),
    lastSignInTime: new Date().toISOString(),
  }
};

export const isAuthenticationBypassed = () => {
  return DEV_MODE;
};
