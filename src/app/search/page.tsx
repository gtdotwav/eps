export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { DocumentCard } from '@/components/DocumentCard'
import { supabase } from '@/lib/supabase'
import { Post } from '@/lib/types'

export const metadata = {
  title: 'Search | Epstein Files Investigation Platform',
  description: 'Search documents, people, and topics in the case archive',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ''
  let posts: Post[] = []

  if (query.length > 1 && supabase) {
    try {
      // Search by title, summary, topics, or people
      const { data } = await supabase
        .from('posts')
        .select('*')
        .or(
          `title.ilike.%${query}%,summary.ilike.%${query}%,key_topics.cs.{"${query}"},key_people_names.cs.{"${query}"}`
        )
        .order('created_at', { ascending: false })
        .limit(100)

      posts = (data as Post[]) || []
    } catch (error) {
      console.error('Search error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black pt-20 md:pt-0">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Search</h1>
          <form action="/search" className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search documents, people, topics..."
              className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
              autoFocus
            />
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
            >
              Search
            </button>
          </form>
        </div>

        {query && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Results for &quot;{query}&quot;
            </h2>
            <p className="text-zinc-400">
              {posts.length} document{posts.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {posts.map((post) => (
              <DocumentCard key={post.id} post={post} />
            ))}
          </div>
        ) : !query ? (
          <div className="text-center py-20 space-y-6">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-white">Start Searching</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Search by document title, person name, topic, or document type. Use filters
              on the feed for more advanced searching.
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto pt-6">
              {[
                'Jeffrey Epstein',
                'Ghislaine Maxwell',
                'Flight logs',
                'Virginia Giuffre',
                'Prince Andrew',
              ].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="px-4 py-2 rounded-full text-sm bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-red-600 hover:text-red-600 transition-all"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 space-y-4">
            <div className="text-4xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-white">No Results</h2>
            <p className="text-zinc-400">
              Try different search terms or browse the feed with filters
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Back to Feed
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
