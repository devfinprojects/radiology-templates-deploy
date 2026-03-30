# Code Refactoring Plan

## Overview
This document outlines the refactoring improvements for the Radiology Templates application.

## 1. File Structure Reorganization

### Current Issues:
- Large monolithic page component (`src/app/page.tsx` - 1000+ lines)
- Missing type definitions
- Duplicate code in API routes

### Proposed Structure:
```
src/
├── app/
│   ├── api/
│   │   └── [routes]
│   ├── login/
│   ├── layout.tsx
│   └── page.tsx (simplified)
├── components/
│   ├── ui/ (shadcn components)
│   ├── templates/
│   │   ├── template-list.tsx
│   │   ├── template-card.tsx
│   │   ├── template-editor.tsx
│   │   └── index.ts
│   ├── snippets/
│   │   ├── snippet-list.tsx
│   │   ├── snippet-card.tsx
│   │   └── index.ts
│   ├── search/
│   │   ├── search-bar.tsx
│   │   └── search-filters.tsx
│   └── layout/
│       ├── sidebar.tsx
│       ├── header.tsx
│       └── command-palette.tsx
├── hooks/
│   ├── use-templates.ts
│   ├── use-snippets.ts
│   ├── use-search.ts
│   ├── use-favorites.ts
│   └── index.ts
├── lib/
│   ├── d1.ts (database client)
│   ├── auth.ts (authentication)
│   ├── utils.ts (utilities)
│   └── constants.ts (app constants)
├── types/
│   ├── database.ts
│   ├── api.ts
│   └── index.ts
└── utils/
    ├── report-generator.ts
    └── formatters.ts
```

## 2. Type Safety Improvements

### Create Proper Type Definitions

**File: `src/types/database.ts`**
```typescript
export interface Category {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
}

export interface BodyPart {
  id: string
  name: string
  description: string | null
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
}

export interface CategoryWithCounts extends Category {
  _count?: {
    templates: number
    snippets: number
  }
}

export interface BodyPartWithCounts extends BodyPart {
  _count?: {
    templates: number
    snippets: number
  }
}
```

## 3. Component Extraction

### Extract Template Card Component

**File: `src/components/templates/template-card.tsx`**
```typescript
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Copy, Edit, Trash2, Star, StarOff, MoreVertical } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import type { Template } from "@/types"

interface TemplateCardProps {
  template: Template
  onCopy: (content: string) => void
  onCopyNormal: (template: Template) => void
  onEdit: (template: Template) => void
  onDelete: (id: string) => void
  onToggleFavorite: (id: string, isFavorite: boolean) => Promise<void>
}

export function TemplateCard({ 
  template, 
  onCopy, 
  onCopyNormal, 
  onEdit, 
  onDelete,
  onToggleFavorite 
}: TemplateCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(template.id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className={cn(
      "hover:shadow-md transition-shadow",
      template.isFavorite && "border-yellow-300 bg-yellow-50/50"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{template.title}</CardTitle>
            {template.description && (
              <CardDescription>{template.description}</CardDescription>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onCopy(template.content)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCopyNormal(template)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Normal Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(template)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onToggleFavorite(template.id, template.isFavorite)}
              >
                {template.isFavorite ? (
                  <>
                    <StarOff className="mr-2 h-4 w-4" />
                    Remove from Favorites
                  </>
                ) : (
                  <>
                    <Star className="mr-2 h-4 w-4" />
                    Add to Favorites
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mt-2">
          {template.category && (
            <Badge variant="outline">{template.category.name}</Badge>
          )}
          {template.bodyPart && (
            <Badge variant="secondary">{template.bodyPart.name}</Badge>
          )}
          {template.modality && (
            <Badge variant="outline">{template.modality}</Badge>
          )}
          {template.isFavorite && (
            <Badge className="bg-yellow-100 text-yellow-800">
              <Star className="h-3 w-3 mr-1" />
              Favorite
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
```

## 4. Custom Hooks

### Extract Template Management Hook

**File: `src/hooks/use-templates.ts`**
```typescript
"use client"

import { useState, useCallback } from "react"
import { toast } from "@/hooks/use-toast"
import type { Template } from "@/types"

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchTemplates = useCallback(async (filters?: {
    categoryId?: string
    bodyPartId?: string
    modality?: string
    favorites?: boolean
  }) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters?.categoryId) params.append("categoryId", filters.categoryId)
      if (filters?.bodyPartId) params.append("bodyPartId", filters.bodyPartId)
      if (filters?.modality) params.append("modality", filters.modality)
      if (filters?.favorites) params.append("favorites", "true")

      const response = await fetch(`/api/templates?${params}`)
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setTemplates(data)
      }
    } catch (error) {
      console.error("Error fetching templates:", error)
      toast({
        title: "Error",
        description: "Failed to fetch templates",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createTemplate = useCallback(async (templateData: Partial<Template>) => {
    try {
      const response = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(templateData),
      })

      if (!response.ok) throw new Error("Failed to create template")
      
      const newTemplate = await response.json()
      setTemplates(prev => [...prev, newTemplate])
      
      toast({
        title: "Success",
        description: "Template created successfully",
      })
      
      return newTemplate
    } catch (error) {
      console.error("Error creating template:", error)
      toast({
        title: "Error",
        description: "Failed to create template",
        variant: "destructive",
      })
      throw error
    }
  }, [])

  const updateTemplate = useCallback(async (id: string, templateData: Partial<Template>) => {
    try {
      const response = await fetch(`/api/templates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(templateData),
      })

      if (!response.ok) throw new Error("Failed to update template")
      
      const updatedTemplate = await response.json()
      setTemplates(prev => prev.map(t => t.id === id ? updatedTemplate : t))
      
      toast({
        title: "Success",
        description: "Template updated successfully",
      })
      
      return updatedTemplate
    } catch (error) {
      console.error("Error updating template:", error)
      toast({
        title: "Error",
        description: "Failed to update template",
        variant: "destructive",
      })
      throw error
    }
  }, [])

  const deleteTemplate = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/templates/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete template")
      
      setTemplates(prev => prev.filter(t => t.id !== id))
      
      toast({
        title: "Success",
        description: "Template deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting template:", error)
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive",
      })
      throw error
    }
  }, [])

  const toggleFavorite = useCallback(async (id: string, currentFavorite: boolean) => {
    try {
      const response = await fetch(`/api/templates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: !currentFavorite }),
      })

      if (!response.ok) throw new Error("Failed to update favorite")
      
      const updated = await response.json()
      setTemplates(prev => prev.map(t => t.id === id ? updated : t))
      
      toast({
        title: updated.isFavorite ? "Added to favorites" : "Removed from favorites",
        description: `"${updated.title}" has been ${updated.isFavorite ? "added to" : "removed from"} favorites`,
      })
      
      return updated
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      })
      throw error
    }
  }, [])

  return {
    templates,
    isLoading,
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    toggleFavorite,
  }
}
```

## 5. Utility Function Extraction

### Extract Report Generator

**File: `src/utils/report-generator.ts`**
```typescript
interface NormalReportOptions {
  indication?: string
  laterality?: string
}

const NORMAL_REPLACEMENTS: Record<string, string> = {
  // Clinical indication
  "[Indication]": "Routine evaluation",
  "[indication]": "Routine evaluation",
  // Measurements - normal values
  "[X]": "within normal limits",
  "[x]": "within normal limits",
  "[__]": "normal",
  "[mm]": "within normal range",
  "[cm]": "within normal range",
  "[measurement]": "within normal limits",
  "[value]": "normal",
  "[number]": "normal",
  "[size]": "normal",
  "[dimensions]": "within normal limits",
  // Laterality
  "[LATERALITY]": "",
  "[SIDE]": "",
  "[Side]": "",
  // Views
  "[VIEWS]": "standard views",
  // Specific findings
  "[describe]": "normal",
  "[description]": "normal findings",
  "[findings]": "No abnormality detected",
  "[location]": "as expected",
  "[level]": "normal",
  "[type]": "normal",
  "[degree]": "within normal limits",
  "[severity]": "none",
  "[assessment]": "normal",
  "[result]": "normal",
  "[status]": "normal",
  "[percentage]": "within normal range",
  "[degrees]": "within normal range",
  "[grade]": "normal",
  "[stage]": "early",
  // Time-related
  "[time]": "normal",
  "[minutes]": "within normal range",
  "[hours]": "within expected timeframe",
  // Organ-specific normal findings
  "[liver size]": "normal",
  "[spleen size]": "normal",
  "[kidney size]": "normal",
  "[cardiac size]": "normal",
  "[ventricle size]": "normal",
  // Generic placeholders
  "[specify]": "as noted",
  "[note]": "",
  "[comment]": "",
  "[other]": "none",
  "[additional findings]": "none",
}

/**
 * Generate a normal report from a template by replacing placeholders
 */
export function generateNormalReport(
  content: string, 
  options?: NormalReportOptions
): string {
  let normalContent = content

  // Apply predefined replacements
  Object.entries(NORMAL_REPLACEMENTS).forEach(([placeholder, replacement]) => {
    normalContent = normalContent.split(placeholder).join(replacement)
  })

  // Clean up any remaining bracket placeholders with generic normal values
  normalContent = normalContent.replace(/\[[^\]]+\]/g, (match) => {
    const lowerMatch = match.toLowerCase()
    if (lowerMatch.includes("mm") || lowerMatch.includes("cm") || lowerMatch.includes("size")) {
      return "within normal limits"
    }
    return "normal"
  })

  // Clean up multiple spaces and lines
  normalContent = normalContent
    .replace(/  +/g, " ")
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim()

  return normalContent
}

/**
 * Check if content contains placeholders
 */
export function hasPlaceholders(content: string): boolean {
  return /\[[^\]]+\]/.test(content)
}

/**
 * Count placeholders in content
 */
export function countPlaceholders(content: string): number {
  const matches = content.match(/\[[^\]]+\]/g)
  return matches ? matches.length : 0
}
```

## 6. Constants Extraction

### Create Constants File

**File: `src/lib/constants.ts`**
```typescript
export const CATEGORY_ORDER = [
  'X-Ray',
  'Ultrasound',
  'CT',
  'MRI',
  'Fluoroscopy',
  'Mammography',
  'Interventional',
] as const

export const CATEGORY_ICONS = {
  CT: "Activity",
  MRI: "Brain",
  "X-Ray": "Sun",
  Ultrasound: "Waves",
  Mammography: "Heart",
  "Nuclear Medicine": "Activity",
  Fluoroscopy: "Video",
  Interventional: "Syringe",
} as const

export const CATEGORY_COLORS: Record<string, string> = {
  CT: "bg-blue-500/10 text-blue-600 border-blue-200",
  MRI: "bg-purple-500/10 text-purple-600 border-purple-200",
  "X-Ray": "bg-amber-500/10 text-amber-600 border-amber-200",
  Ultrasound: "bg-teal-500/10 text-teal-600 border-teal-200",
  Mammography: "bg-pink-500/10 text-pink-600 border-pink-200",
  "Nuclear Medicine": "bg-green-500/10 text-green-600 border-green-200",
  Fluoroscopy: "bg-orange-500/10 text-orange-600 border-orange-200",
  Interventional: "bg-red-500/10 text-red-600 border-red-200",
}

export const MODALITIES = [
  "CT",
  "MRI",
  "X-Ray",
  "Ultrasound",
  "Fluoroscopy",
  "Mammography",
  "Nuclear Medicine",
  "Interventional",
] as const

export const SESSION_COOKIE = "radiology-session"
export const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export const DEFAULT_CREDENTIALS = {
  username: process.env.DEFAULT_USERNAME || "admin",
  password: process.env.DEFAULT_PASSWORD || "password",
}

export const API_ERRORS = {
  DATABASE_NOT_CONFIGURED: "Database not configured",
  FAILED_TO_FETCH: "Failed to fetch data",
  FAILED_TO_CREATE: "Failed to create item",
  FAILED_TO_UPDATE: "Failed to update item",
  FAILED_TO_DELETE: "Failed to delete item",
  NOT_FOUND: "Item not found",
} as const
```

## 7. Security Improvements

### Update Auth Configuration

**File: `src/lib/auth.ts` (Updated)**
```typescript
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE, SESSION_DURATION, DEFAULT_CREDENTIALS } from './constants'

// Session token generator using crypto API
export function generateSessionToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Verify credentials with environment variable support
export function verifyCredentials(username: string, password: string): boolean {
  // In production, use environment variables or a secure auth provider
  if (process.env.AUTH_USERNAME && process.env.AUTH_PASSWORD) {
    return username === process.env.AUTH_USERNAME && password === process.env.AUTH_PASSWORD
  }
  return username === DEFAULT_CREDENTIALS.username && password === DEFAULT_CREDENTIALS.password
}

// Set session cookie with security options
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  })
}

// Get session cookie
export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value
}

// Clear session cookie
export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionCookie()
  return !!token
}

// Middleware helper to check auth
export async function checkAuth(request: NextRequest): Promise<NextResponse | null> {
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value
  const isLoginPage = request.nextUrl.pathname === '/login'
  
  if (!sessionCookie && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (sessionCookie && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return null
}
```

## 8. Database Query Optimization

### Improve D1 Client with Better Types

**File: `src/lib/d1.ts` (Partial Update)**
```typescript
// Import proper types
import type { Template, Snippet, Category, BodyPart } from '@/types'

// Use generics properly
export class D1Client {
  constructor(private db: D1Database) {}

  async select<T extends Record<string, unknown>>(
    sql: string,
    ...params: unknown[]
  ): Promise<T[]> {
    const stmt = this.db.prepare(sql)
    if (params.length > 0) {
      stmt.bind(...params)
    }
    const result = await stmt.all<T>()
    return result.results || []
  }

  // ... rest of implementation
}

// Type-safe query builders
export async function getTemplates(
  db: D1Database,
  filters: {
    categoryId?: string
    bodyPartId?: string
    modality?: string
    favorites?: boolean
  } = {}
): Promise<Template[]> {
  // Implementation with proper typing
}
```

## 9. Performance Optimizations

### Add React.memo for Expensive Components

```typescript
export const TemplateCard = memo(function TemplateCard({ 
  template, 
  onCopy, 
  onCopyNormal, 
  onEdit, 
  onDelete,
  onToggleFavorite 
}: TemplateCardProps) {
  // Component implementation
})
```

### Use useCallback for Event Handlers

Already implemented in many places, but ensure consistency across all components.

### Implement Virtual Scrolling for Large Lists

Consider using `@tanstack/react-virtual` for template/snippet lists when they grow large.

## 10. Testing Strategy

### Add Unit Tests

Create test files for:
- Utility functions (`src/utils/report-generator.test.ts`)
- Custom hooks (`src/hooks/use-templates.test.ts`)
- Components (`src/components/templates/template-card.test.tsx`)

### Example Test File

**File: `src/utils/report-generator.test.ts`**
```typescript
import { describe, it, expect } from 'vitest'
import { generateNormalReport, hasPlaceholders, countPlaceholders } from './report-generator'

describe('generateNormalReport', () => {
  it('should replace common placeholders', () => {
    const content = 'Findings: [findings]. Size: [X] mm.'
    const result = generateNormalReport(content)
    expect(result).toContain('No abnormality detected')
    expect(result).toContain('within normal limits')
  })

  it('should clean up multiple spaces', () => {
    const content = 'Text   with    spaces'
    const result = generateNormalReport(content)
    expect(result).toBe('Text with spaces')
  })
})

describe('hasPlaceholders', () => {
  it('should detect placeholders', () => {
    expect(hasPlaceholders('Normal [findings]')).toBe(true)
    expect(hasPlaceholders('All normal')).toBe(false)
  })
})

describe('countPlaceholders', () => {
  it('should count placeholders correctly', () => {
    expect(countPlaceholders('[a] [b] [c]')).toBe(3)
    expect(countPlaceholders('No placeholders')).toBe(0)
  })
})
```

## Implementation Priority

### Phase 1 (High Priority)
1. ✅ Add ESLint configuration
2. Create type definitions
3. Extract constants
4. Update auth with environment variables

### Phase 2 (Medium Priority)
5. Extract utility functions
6. Create custom hooks
7. Split large components

### Phase 3 (Lower Priority)
8. Add comprehensive tests
9. Implement performance optimizations
10. Add documentation

## Benefits

- **Maintainability**: Smaller, focused files are easier to understand and modify
- **Type Safety**: Proper TypeScript types catch errors at compile time
- **Reusability**: Extracted components and hooks can be reused
- **Testability**: Isolated functions and components are easier to test
- **Performance**: Optimized rendering and reduced bundle size
- **Security**: Environment-based configuration for sensitive data
