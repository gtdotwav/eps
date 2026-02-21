'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Post } from '@/lib/types'
import PostCard from './PostCard'
import CategoryFilter from './CategoryFilter'

const PAGE_SIZE = 20

interface FeedProps {
  initialPosts: Post[]
  totalCount: number
  categories: { name: string; slug: string; count: number }[]
}

export default function Feed({ initialPosts, totalCount, categories }: FeedProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialPosts.length < totalCount)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const observerRef = useRef<HTMLDivElement>(null)

  const fetchPosts = useCallback(async (pageNum: number, category: string | null, reset = false) => {
    setLoading(true)
    try {
      let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .range((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE - 1)

      if (category) {
        query = query.eq('document_type', category)
      }

      const { data, error } = await query
      if (error) throw error

      if (reset) {
        setPosts(data || [])
      } else {
        setPosts((prev) => [...prev, ...(data || [])])
      }
      setHasMore((data || []).length === PAGE_SIZE)
    } catch (err) {
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1
          setPage(nextPage)
          fetchPosts(nextPage, selectedCategory)
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading, page, selectedCategory, fetchPosts])

  // Reset when category changes
  const handleCategoryChange = (slug: string | null) => {
    setSelectedCategory(slug)
    setPage(1)
    setHasMore(true)
    fetchPosts(1, slug, true)
  }

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategoryChange}
      />

      {/* Stats Bar */}
      <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
        <span>
          Exibindo <span className="text-zinc-300 font-medium">{posts.length}</span> de{' '}
          <span className="text-zinc-300 font-medium">{totalCount.toLocaleString()}</span> documentos
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-dot"></span>
          Fonte: DOJ / EFTA
        </span>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i % PAGE_SIZE} />
        ))}
      </div>

      {/* Loading / Infinite Scroll Trigger */}
      <div ref={observerRef} className="py-8 flex justify-center">
        {loading && (
          <div className="flex items-center gap-3 text-zinc-500 text-sm">
            <div className="w-5 h-5 border-2 border-zinc-600 border-t-red-500 rounded-full animate-spin"></div>
            Carregando mais documentos...
          </div>
        )}
        {!hasMore && posts.length > 0 && (
          <div className="text-center text-zinc-600 text-xs">
            <p>Todos os documentos foram carregados.</p>
            <p className="mt-1 text-zinc-700">
              Fonte oficial:{' '}
              <a href="https://www.justice.gov/epstein" target="_blank" className="text-red-600/60 hover:text-red-500">
                justice.gov/epstein
              </a>
            </p>
          </div>
        )}
        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-500 text-lg">Nenhum documento encontrado.</p>
            <p className="text-zinc-600 text-sm mt-2">Tente outra categoria ou termo de busca.</p>
          </div>
        )}
      </div>
    </div>
  )
}
