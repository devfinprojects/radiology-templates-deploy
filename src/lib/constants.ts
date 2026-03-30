/**
 * Application Constants
 * Centralized configuration and constants
 */

export const CATEGORY_ORDER = [
  'X-Ray',
  'Ultrasound',
  'CT',
  'MRI',
  'Fluoroscopy',
  'Mammography',
  'Interventional',
] as const

export type CategoryName = (typeof CATEGORY_ORDER)[number]

export const CATEGORY_ICONS: Record<CategoryName, string> = {
  'CT': 'Activity',
  'MRI': 'Brain',
  'X-Ray': 'Sun',
  'Ultrasound': 'Waves',
  'Mammography': 'Heart',
  'Nuclear Medicine': 'Activity',
  'Fluoroscopy': 'Video',
  'Interventional': 'Syringe',
} as const

export const CATEGORY_COLORS: Record<string, string> = {
  CT: 'bg-blue-500/10 text-blue-600 border-blue-200',
  MRI: 'bg-purple-500/10 text-purple-600 border-purple-200',
  'X-Ray': 'bg-amber-500/10 text-amber-600 border-amber-200',
  Ultrasound: 'bg-teal-500/10 text-teal-600 border-teal-200',
  Mammography: 'bg-pink-500/10 text-pink-600 border-pink-200',
  'Nuclear Medicine': 'bg-green-500/10 text-green-600 border-green-200',
  Fluoroscopy: 'bg-orange-500/10 text-orange-600 border-orange-200',
  Interventional: 'bg-red-500/10 text-red-600 border-red-200',
}

export const MODALITIES = [
  'CT',
  'MRI',
  'X-Ray',
  'Ultrasound',
  'Fluoroscopy',
  'Mammography',
  'Nuclear Medicine',
  'Interventional',
] as const

export type Modality = (typeof MODALITIES)[number]

// Session configuration
export const SESSION_COOKIE = 'radiology-session'
export const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Default credentials (use environment variables in production)
export const DEFAULT_CREDENTIALS = {
  username: process.env.DEFAULT_USERNAME || 'admin',
  password: process.env.DEFAULT_PASSWORD || 'password',
} as const

// API error messages
export const API_ERRORS = {
  DATABASE_NOT_CONFIGURED: 'Database not configured',
  FAILED_TO_FETCH: 'Failed to fetch data',
  FAILED_TO_CREATE: 'Failed to create item',
  FAILED_TO_UPDATE: 'Failed to update item',
  FAILED_TO_DELETE: 'Failed to delete item',
  NOT_FOUND: 'Item not found',
  UNAUTHORIZED: 'Unauthorized',
} as const

// Pagination defaults
export const PAGINATION = {
  DEFAULT_LIMIT: 50,
  MAX_LIMIT: 100,
} as const

// Search configuration
export const SEARCH = {
  DEBOUNCE_MS: 300,
  MIN_QUERY_LENGTH: 2,
} as const
