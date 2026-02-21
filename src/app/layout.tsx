import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Epstein Files Feed | Documentos Desclassificados',
  description: 'Plataforma visual para explorar os documentos desclassificados do caso Jeffrey Epstein. Feed didático com milhares de documentos do DOJ.',
  openGraph: {
    title: 'Epstein Files Feed',
    description: 'Explore os documentos desclassificados do caso Epstein de forma visual e didática.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-dark-900 text-gray-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
