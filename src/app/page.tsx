export const dynamic = 'force-dynamic'

import { DocumentFeed } from '@/components/DocumentFeed'
import { HomeHero } from '@/components/HomeHero'
import { supabase } from '@/lib/supabase'
import { Post } from '@/lib/types'

export default async function HomePage() {
  let posts: Post[] = []
  let totalCount = 0

  if (supabase) {
    try {
      const { data, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })

      posts = (data as Post[]) || []
      totalCount = count || 0
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <HomeHero totalCount={totalCount} />

      {/* Document Feed */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Document Archive</h2>
          <p className="text-zinc-400">
            Search and explore all available case documents
          </p>
        </div>
        <DocumentFeed posts={posts} />
      </section>
    </div>
  )
}
