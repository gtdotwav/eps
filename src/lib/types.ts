export interface Post {
  id: string
  title: string
  summary: string | null
  full_text: string | null
  document_type: string | null
  document_date: string | null
  source_url: string | null
  source_dataset: string | null
  efta_number: string | null
  key_topics: string[]
  key_people_names: string[]
  significance: string | null
  image_url: string | null
  category_id: number | null
  page_count: number
  created_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  icon: string
  color: string
  post_count: number
}

export interface Person {
  id: number
  name: string
  role: string | null
  mention_count: number
}

export const CATEGORY_COLORS: Record<string, string> = {
  'court-filing': '#3b82f6',
  'fbi-report': '#dc2626',
  'email': '#f59e0b',
  'deposition': '#8b5cf6',
  'flight-log': '#06b6d4',
  'police-report': '#10b981',
  'financial': '#ec4899',
  'prison-record': '#6366f1',
  'photograph': '#f97316',
  'travel-record': '#14b8a6',
  'interview': '#a855f7',
  'legal-brief': '#2563eb',
  'investigation': '#ef4444',
  'correspondence': '#eab308',
  'default': '#6b7280',
}

export const CATEGORY_ICONS: Record<string, string> = {
  'court-filing': '⚖️',
  'fbi-report': '🔍',
  'email': '📧',
  'deposition': '🎤',
  'flight-log': '✈️',
  'police-report': '🚔',
  'financial': '💰',
  'prison-record': '🔒',
  'photograph': '📷',
  'travel-record': '🗺️',
  'interview': '🗣️',
  'legal-brief': '📋',
  'investigation': '🕵️',
  'correspondence': '✉️',
  'default': '📄',
}
