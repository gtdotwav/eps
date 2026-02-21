export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import { Post } from '@/lib/types'
import { IconArrowLeft, IconExternalLink, IconBookmark } from '@tabler/icons-react'

export const metadata = {
  title: 'Document | Epstein Files Investigation Platform',
}

function getSlug(type: string | null): string {
  if (!type) return 'default'
  return type.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

export default async function PostPage({ params }: { params: { id: string } }) {
  let post: Post | null = null

  if (supabase) {
    try {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single()

      post = data as Post
    } catch (error) {
      console.error('Error fetching post:', error)
    }
  }

  if (!post) return notFound()

  const slug = getSlug(post.document_type)
  const color = CATEGORY_COLORS[slug] || CATEGORY_COLORS.default
  const icon = CATEGORY_ICONS[slug] || CATEGORY_ICONS.default

  return (
    <div className="min-h-screen bg-black pt-20 md:pt-0">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 md:relative bg-black/95 backdrop-blur border-b border-zinc-800 md:border-0 md:mb-8">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <IconArrowLeft size={18} />
            Back to Feed
          </Link>
          <div className="flex-1" />
          {post.source_url && (
            <a
              href={post.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white bg-zinc-800/50 px-3 py-2 rounded-lg border border-zinc-700 hover:border-red-600 transition-all"
            >
              Source
              <IconExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
            style={{ backgroundColor: color + '30' }}
          >
            <span className="text-base">{icon}</span>
            {post.document_type || 'Document'}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            {post.document_date && (
              <span>
                {new Date(post.document_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            {post.page_count && (
              <span>{post.page_count} pages</span>
            )}
            {post.source_dataset && (
              <span className="font-mono text-zinc-500">{post.source_dataset}</span>
            )}
          </div>
        </div>

        {/* Summary */}
        {post.summary && (
          <div className="bg-zinc-800/30 border border-zinc-700 rounded-lg p-6 space-y-3">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Summary</h2>
            <p className="text-base text-zinc-300 leading-relaxed">{post.summary}</p>
          </div>
        )}

        {/* Significance */}
        {post.significance && (
          <div className="bg-red-600/10 border-l-4 border-red-600 rounded-r-lg p-6 space-y-3">
            <h2 className="text-xs font-semibold text-red-400 uppercase tracking-wider">Significance</h2>
            <p className="text-base text-zinc-300 leading-relaxed">{post.significance}</p>
          </div>
        )}

        {/* People */}
        {post.key_people_names && post.key_people_names.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Key People</h2>
            <div className="flex flex-wrap gap-2">
              {post.key_people_names.map((name: string) => (
                <Link
                  key={name}
                  href={`/search?q=${encodeURIComponent(name)}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-red-600 hover:text-red-400 transition-all"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Topics */}
        {post.key_topics && post.key_topics.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Topics</h2>
            <div className="flex flex-wrap gap-2">
              {post.key_topics.map((topic: string) => (
                <Link
                  key={topic}
                  href={`/search?q=${encodeURIComponent(topic)}`}
                  className="px-3 py-1.5 rounded-full text-sm bg-zinc-800/50 text-zinc-300 border border-zinc-700 hover:border-red-600 hover:text-red-400 transition-all"
                >
                  #{topic}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Full Text */}
        {post.full_text && (
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Full Text</h2>
            <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 max-h-[800px] overflow-y-auto">
              <pre className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap font-mono">
                {post.full_text}
              </pre>
            </div>
          </div>
        )}

        {/* Source Attribution */}
        <div className="border-t border-zinc-700 pt-6 pb-12">
          <div className="bg-zinc-800/30 border border-zinc-700 rounded-lg p-4">
            <p className="text-xs text-zinc-400 leading-relaxed">
              <strong className="text-white">Source:</strong> This document is from public
              records related to the Epstein case. All content is available for research and
              educational purposes. This is an independent investigation platform created for
              transparency and awareness.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
