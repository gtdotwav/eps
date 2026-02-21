import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'Epstein Files | Social Investigation Platform',
  description: 'Professional investigation platform for exploring documents related to the Epstein case. Includes evidence board, timeline, profiles, and research tools.',
  openGraph: {
    title: 'Epstein Files Investigation Platform',
    description: 'Explore case documents, create investigations, and track evidence in an organized platform.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white min-h-screen antialiased">
        <Navigation />
        <main className="md:ml-64 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
