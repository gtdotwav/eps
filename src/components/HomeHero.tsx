"use client"

import { motion } from 'framer-motion'

interface HomeHeroProps {
  totalCount: number
}

export function HomeHero({ totalCount }: HomeHeroProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-12 pb-12 md:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-block mb-6">
          <div className="px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full">
            <p className="text-xs font-semibold text-red-600 uppercase tracking-widest">
              Investigation Platform
            </p>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          EPSTEIN FILES
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
          Professional social investigation platform for exploring case documents,
          building evidence connections, and understanding the network.
        </p>

        <div className="flex items-center justify-center gap-8 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600" />
            <span>{totalCount} Documents</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600" />
            <span>Multiple Sources</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600" />
            <span>2005-2026</span>
          </div>
        </div>
      </motion.div>

      {/* Feature Highlights */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: 'Document Feed',
            description: 'Browse and filter thousands of case documents with intelligent search',
            icon: '📄',
          },
          {
            title: 'Investigation Board',
            description: 'Create custom evidence boards with connections and annotations',
            icon: '🎯',
          },
          {
            title: 'Case Timeline',
            description: 'Track key events and progression from investigation to prosecution',
            icon: '⏱️',
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
            className="p-6 bg-zinc-800/30 border border-zinc-700 rounded-lg hover:border-red-600 transition-colors"
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-zinc-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
