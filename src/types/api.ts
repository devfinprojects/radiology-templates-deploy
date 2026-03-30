/**
 * API Type Definitions
 * Types for API requests and responses
 */

import type { Template, Snippet, Category, BodyPart } from './database'

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export type TemplatesResponse = ApiResponse<Template[]>
export type SnippetsResponse = ApiResponse<Snippet[]>
export type CategoriesResponse = ApiResponse<Category[]>
export type BodyPartsResponse = ApiResponse<BodyPart[]>

export interface TemplateFilters {
  categoryId?: string
  bodyPartId?: string
  modality?: string
  favorites?: boolean
}

export interface SnippetFilters {
  categoryId?: string
  bodyPartId?: string
  modality?: string
  favorites?: boolean
}

export interface SearchFilters extends TemplateFilters {
  q?: string
  type?: 'all' | 'templates' | 'snippets'
}

export interface CreateTemplateInput {
  title: string
  description?: string | null
  content: string
  categoryId?: string | null
  bodyPartId?: string | null
  modality?: string | null
  tags?: string | null
  isFavorite?: boolean
}

export interface UpdateTemplateInput extends Partial<CreateTemplateInput> {}

export interface CreateSnippetInput {
  title: string
  description?: string | null
  content: string
  categoryId?: string | null
  bodyPartId?: string | null
  modality?: string | null
  tags?: string | null
  isFavorite?: boolean
}

export interface UpdateSnippetInput extends Partial<CreateSnippetInput> {}
