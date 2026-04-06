import type { Metadata } from 'next';
import './globals.css';
import { GameStateProvider } from '@/hooks/use-game-state';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseProvider } from '@/firebase/provider';

export const metadata: Metadata = {
  title: 'RiseForge | Level Up Your Thinking',
  description: 'A modern gamified entrepreneurship guidance app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        <FirebaseProvider>
          <GameStateProvider>
            {children}
            <Toaster />
          </GameStateProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
