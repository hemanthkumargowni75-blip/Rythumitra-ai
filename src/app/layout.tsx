import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { FarmProvider } from '@/context/FarmContext';
import { AuthGuard } from '@/components/AuthGuard';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'RythuMitra AI (రైతుమిత్ర AI) — Intelligent Farming Support',
  description: 'Production Agricultural Intelligence & Expert Consultation Platform for Indian Farmers | మీ పొలానికి మేము దగ్గరగా',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="te">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Leaflet CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-farm-200 selection:text-farm-900 pb-16 lg:pb-0">
        <LanguageProvider>
          <AuthProvider>
            <FarmProvider>
              <AuthGuard>
                <Navbar />
                <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  {children}
                </main>
                <BottomNav />
              </AuthGuard>
            </FarmProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
