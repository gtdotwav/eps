'use client'

import Link from 'next/link'
import { Post, CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/types'

function getSlug(type: string | null): string {
  if (!type) return 'default'
  return type.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

function formatDate(date: string | null): string {
  if (!date) return 'Data desconhecida'
  try {
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return date
  }
}

export default function PostCard({ post, index }: { post: Post; index: number }) {
  const slug = getSlug(post.document_type)
  const color = CATEGORY_COLORS[slug] || CATEGORY_COLORS.default
  const icon = CATEGORY_ICONS[slug] || CATEGORY_ICONS.default

  return (
    <Link href={`/post/${post.id}`}>
      <article
        className="card-hover bg-dark-700 border border-dark-500/50 rounded-2xl overflow-hidden cursor-pointer fade-in group"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Visual Header */}
        <div
          className="relative h-32 flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}08)`,
          }}
        >
          <span className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity group-hover:scale-110 transform transition-transform duration-300">
            {icon}
          </span>
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {post.document_type || 'Document'}
          </div>
          {post.page_count > 1 && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-mono text-zinc-400 bg-dark-900/60 backdrop-blur-sm">
              {post.page_count} pgs
            </div>
          )}
          {post.efta_number && (
            <div className="absolute bottom-2 right-3 text-[9px] font-mono text-zinc-600">
              {post.efta_number}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(post.document_date)}</span>
            {post.source_dataset && (
              <>
                <span className="text-dark-400">·</span>
                <span className="font-mono">{post.source_dataset}</span>
              </>
            )}
          </div>

          <h3 className="font-semibold text-sm text-white leading-snug line-clamp-2 group-hover:text-red-300 transition-colors">
            {post.title}
          </h3>

          {post.summary && (
            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
              {post.summary}
            </p>
          )}

          {/* People Tags */}
          {post.key_people_names && post.key_people_names.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.key_people_names.slice(0, 4).map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-dark-600 text-zinc-300 border border-dark-400/50"
                >
                  <svg className="w-2.5 h-2.5 text-zinc-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  {name}
                </span>
              ))}
              {post.key_people_names.length > 4 && (
                <span className="text-[10px] text-zinc-600 px-1.5 py-0.5">
                  +{post.key_people_names.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Topics */}
          {post.key_topics && post.key_topics.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {post.key_topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-dark-600/60 text-zinc-500 border border-dark-500/30"
                >
                  #{topic.toLowerCase().replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
