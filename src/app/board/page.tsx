'use client'

import { InvestigationBoard } from '@/components/InvestigationBoard'

export default function BoardPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-white mb-2">Investigation Board</h1>
        <p className="text-zinc-400">
          Create your personal evidence board. Pin documents, add notes, and create connections
          to build your investigation narrative.
        </p>
      </div>
      <InvestigationBoard />
    </div>
  )
}
