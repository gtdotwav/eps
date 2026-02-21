import { createClient } from '@supabase/supabase-js'
import Header from '@/components/Header'
import Feed from '@/components/Feed'
import AgeGate from '@/components/AgeGate'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const revalidate = 3600

export default async function HomePage() {
  // Fetch initial posts
  const { data: posts, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(0, 19)

  // Aggregate categories from posts
  const { data: allPosts } = await supabase
    .from('posts')
    .select('document_type')

  const catMap = new Map<string, number>()
  allPosts?.forEach((p) => {
    if (p.document_type) {
      catMap.set(p.document_type, (catMap.get(p.document_type) || 0) + 1)
    }
  })

  const categories = Array.from(catMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12)

  const totalCount = count || 0

  return (
    <AgeGate>
      <div className="min-h-screen bg-dark-900">
        <Header totalPosts={totalCount} />

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-dark-500/30">
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 relative">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 pulse-dot"></span>
                <span className="text-xs font-mono text-red-400/80 uppercase tracking-widest">
                  Documentos Desclassificados
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Os arquivos que o mundo
                <span className="gradient-text block">precisa ver.</span>
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">
                3.5 milhões de páginas liberadas pelo Departamento de Justiça dos EUA.
                Aqui, cada documento vira uma história acessível. Navegue, explore, entenda.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{totalCount.toLocaleString()} documentos</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>2005 - 2026</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Fonte: DOJ / EFTA</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feed */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Feed
            initialPosts={posts || []}
            totalCount={totalCount}
            categories={categories}
          />
        </main>
      </div>
    </AgeGate>
  )
}
