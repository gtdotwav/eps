'use client'

import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/types'

interface CategoryFilterProps {
  categories: { name: string; slug: string; count: number }[]
  selected: string | null
  onSelect: (slug: string | null) => void
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
      <button
        onClick={() => onSelect(null)}
        className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
          selected === null
            ? 'bg-white text-dark-900 border-white'
            : 'bg-dark-700 text-zinc-400 border-dark-500 hover:border-dark-400 hover:text-zinc-300'
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => {
        const color = CATEGORY_COLORS[cat.slug] || CATEGORY_COLORS.default
        const icon = CATEGORY_ICONS[cat.slug] || CATEGORY_ICONS.default
        const isActive = selected === cat.slug
        return (
          <button
            key={cat.slug}
            onClick={() => onSelect(isActive ? null : cat.slug)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5 ${
              isActive
                ? 'text-white border-current'
                : 'bg-dark-700 text-zinc-400 border-dark-500 hover:border-dark-400 hover:text-zinc-300'
            }`}
            style={isActive ? { backgroundColor: `${color}20`, color, borderColor: `${color}50` } : {}}
          >
            <span className="text-sm">{icon}</span>
            {cat.name}
            <span className="text-[10px] opacity-60">({cat.count})</span>
          </button>
        )
      })}
    </div>
  )
}
