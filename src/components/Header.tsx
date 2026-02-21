'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header({ totalPosts }: { totalPosts: number }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <header className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-500/50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-red-600/20">
              E
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white group-hover:text-red-400 transition-colors">
                Epstein Files
              </h1>
              <p className="text-[11px] text-zinc-500 -mt-0.5 font-mono">
                {totalPosts.toLocaleString()} documentos desclassificados
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form
                action="/search"
                className="flex items-center bg-dark-700 border border-dark-400 rounded-lg overflow-hidden fade-in"
              >
                <input
                  type="text"
                  name="q"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar pessoa, tópico..."
                  className="bg-transparent text-sm text-white px-3 py-2 w-48 md:w-64 focus:outline-none placeholder:text-zinc-600"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setQuery('') }}
                  className="px-3 py-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-dark-600 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}

            <a
              href="https://www.justice.gov/epstein"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 bg-dark-700 px-3 py-1.5 rounded-lg border border-dark-500 hover:border-dark-400 transition-all"
            >
              <span>DOJ Source</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
