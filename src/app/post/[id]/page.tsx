import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function getSlug(type: string | null): string {
  if (!type) return 'default'
  return type.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!post) return notFound()

  const slug = getSlug(post.document_type)
  const color = CATEGORY_COLORS[slug] || CATEGORY_COLORS.default
  const icon = CATEGORY_ICONS[slug] || CATEGORY_ICONS.default

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-500/50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Feed
          </Link>
          <div className="flex-1" />
          {post.source_url && (
            <a
              href={post.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 bg-dark-700 px-3 py-1.5 rounded-lg border border-dark-500 hover:border-dark-400 transition-all"
            >
              Ver original (DOJ)
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8 fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ backgroundColor: `${color}15`, color }}
          >
            <span className="text-base">{icon}</span>
            {post.document_type || 'Document'}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
            {post.document_date && (
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.document_date).toLocaleDateString('pt-BR', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </span>
            )}
            {post.efta_number && (
              <span className="font-mono text-zinc-600">{post.efta_number}</span>
            )}
            {post.source_dataset && (
              <span className="font-mono">{post.source_dataset}</span>
            )}
            {post.page_count > 1 && (
              <span>{post.page_count} páginas</span>
            )}
          </div>
        </div>

        {/* Summary */}
        {post.summary && (
          <div className="bg-dark-700 border border-dark-500/50 rounded-2xl p-6 space-y-3">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Resumo</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">{post.summary}</p>
          </div>
        )}

        {/* Significance */}
        {post.significance && (
          <div className="bg-dark-700 border-l-2 border-red-600/50 rounded-r-xl p-5 space-y-2">
            <h2 className="text-xs font-semibold text-red-400/80 uppercase tracking-wider">Significância</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">{post.significance}</p>
          </div>
        )}

        {/* People */}
        {post.key_people_names && post.key_people_names.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Pessoas Mencionadas</h2>
            <div className="flex flex-wrap gap-2">
              {post.key_people_names.map((name: string) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-dark-700 text-zinc-300 border border-dark-500/50"
                >
                  <svg className="w-3.5 h-3.5 text-zinc-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Topics */}
        {post.key_topics && post.key_topics.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tópicos</h2>
            <div className="flex flex-wrap gap-2">
              {post.key_topics.map((topic: string) => (
                <span
                  key={topic}
                  className="px-3 py-1.5 rounded-full text-xs bg-dark-600/60 text-zinc-400 border border-dark-500/30"
                >
                  #{topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Full Text */}
        {post.full_text && (
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Transcrição Completa</h2>
            <div className="bg-dark-800 border border-dark-500/30 rounded-2xl p-6 max-h-[600px] overflow-y-auto">
              <pre className="text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap font-mono">
                {post.full_text}
              </pre>
            </div>
          </div>
        )}

        {/* Source Attribution */}
        <div className="border-t border-dark-500/30 pt-6 pb-12">
          <div className="bg-dark-700/50 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-xs text-zinc-500 space-y-1">
              <p>
                Documento obtido do{' '}
                <a href="https://www.justice.gov/epstein" target="_blank" className="text-red-500/70 hover:text-red-400">
                  Departamento de Justiça dos EUA (DOJ)
                </a>{' '}
                sob o Epstein Files Transparency Act (EFTA).
              </p>
              <p className="text-zinc-600">
                Todo o conteúdo é de domínio público. Esta plataforma é um esforço independente
                de transparência e educação.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
