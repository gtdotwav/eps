import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import PostCard from '@/components/PostCard'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ''
  let posts: any[] = []

  if (query.length > 1) {
    // Search using full-text search
    const tsQuery = query.split(/\s+/).filter(Boolean).join(' & ')
    const { data } = await supabase
      .from('posts')
      .select('*')
      .textSearch('fts', tsQuery, { type: 'websearch' })
      .order('created_at', { ascending: false })
      .limit(50)

    posts = data || []

    // Fallback: search by people names if no FTS results
    if (posts.length === 0) {
      const { data: fallback } = await supabase
        .from('posts')
        .select('*')
        .contains('key_people_names', [query])
        .order('created_at', { ascending: false })
        .limit(50)
      posts = fallback || []
    }

    // Fallback: ilike on title
    if (posts.length === 0) {
      const { data: fallback2 } = await supabase
        .from('posts')
        .select('*')
        .ilike('title', `%${query}%`)
        .order('created_at', { ascending: false })
        .limit(50)
      posts = fallback2 || []
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <header className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-500/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Feed
          </Link>
          <form action="/search" className="flex-1 flex items-center bg-dark-700 border border-dark-500 rounded-lg overflow-hidden">
            <svg className="w-4 h-4 text-zinc-500 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Buscar por pessoa, tópico, documento..."
              className="bg-transparent text-sm text-white px-3 py-2.5 flex-1 focus:outline-none placeholder:text-zinc-600"
              autoFocus
            />
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {query && (
          <div className="mb-6">
            <h1 className="text-lg font-semibold text-white">
              {posts.length > 0 ? (
                <>
                  <span className="text-zinc-400">Resultados para</span>{' '}
                  &ldquo;{query}&rdquo;
                  <span className="text-sm text-zinc-500 ml-2">({posts.length})</span>
                </>
              ) : (
                <span className="text-zinc-400">
                  Nenhum resultado para &ldquo;{query}&rdquo;
                </span>
              )}
            </h1>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {!query && (
          <div className="text-center py-20 space-y-4">
            <svg className="w-16 h-16 text-zinc-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-zinc-500">
              Busque por nomes, tópicos ou tipos de documento
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
              {['Jeffrey Epstein', 'Ghislaine Maxwell', 'Flight logs', 'FBI', 'Deposition'].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="px-3 py-1.5 rounded-full text-xs bg-dark-700 text-zinc-400 border border-dark-500 hover:border-dark-400 hover:text-zinc-300 transition-all"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
