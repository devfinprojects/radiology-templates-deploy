/**
 * Database Type Definitions
 * Type-safe interfaces for all database entities
 */

export interface Category {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
}

export interface CategoryWithCounts extends Category {
  _count?: {
    templates: number
    snippets: number
  }
}

export interface BodyPart {
  id: string
  name: string
  description: string | null
}

export interface BodyPartWithCounts extends BodyPart {
  _count?: {
    templates: number
    snippets: number
  }
}

export interface Template {
  id: string
  title: string
  description: string | null
  content: string
  categoryId: string | null
  bodyPartId: string | null
  modality: string | null
  tags: string | null
  isFavorite: boolean
  usageCount: number
  createdAt: string
  updatedAt: string
  category?: Category | null
  bodyPart?: BodyPart | null
  searchScore?: number
  matchType?: string
}

export interface Snippet {
  id: string
  title: string
  description: string | null
  content: string
  categoryId: string | null
  bodyPartId: string | null
  modality: string | null
  tags: string | null
  isFavorite: boolean
  usageCount: number
  createdAt: string
  updatedAt: string
  category?: Category | null
  bodyPart?: BodyPart | null
  searchScore?: number
  matchType?: string
}

export type ItemType = 'template' | 'snippet'
