import { NextRequest, NextResponse } from 'next/server'
import { getAllForSearch, getTemplates, getSnippets, createD1Client } from '@/lib/d1'
import { getCloudflareContext } from '@opennextjs/cloudflare'

// D1 type for binding
interface D1Binding {
  prepare(sql: string): {
    bind(...params: unknown[]): {
      all<T=Record<string, unknown>>(): Promise<{results: T[]; success: boolean}>
      first<T=Record<string, unknown>>(): Promise<T | null>
      run(): Promise<{success: boolean; meta: {changes: number; last_row_id: number}}>
    }
    all<T=Record<string, unknown>>(): Promise<{results: T[]; success: boolean}>
    first<T=Record<string, unknown>>(): Promise<T | null>
    run(): Promise<{success: boolean; meta: {changes: number; last_row_id: number}}>
  }
  exec(sql: string): Promise<{success: boolean; results: unknown[]; count: number; duration: number}>
}

// Fuzzy search function that calculates similarity score
function fuzzyMatch(text: string, query: string): { matched: boolean; score: number } {
  const textLower = text.toLowerCase()
  const queryLower = query.toLowerCase()
  
  // Direct substring match - highest score
  if (textLower.includes(queryLower)) {
    const position = textLower.indexOf(queryLower)
    const relativeLength = query.length / text.length
    const score = 100 - (position / text.length) * 20 + relativeLength * 30
    return { matched: true, score: Math.min(100, score) }
  }
  
  // Word-by-word matching
  const queryWords = queryLower.split(/\s+/)
  const textWords = textLower.split(/\s+/)
  let matchedWords = 0
  
  for (const queryWord of queryWords) {
    for (const textWord of textWords) {
      if (textWord.includes(queryWord) || queryWord.includes(textWord)) {
        matchedWords++
        break
      }
      // Check for partial character matches
      let charMatches = 0
      let queryIdx = 0
      for (let i = 0; i < textWord.length && queryIdx < queryWord.length; i++) {
        if (textWord[i] === queryWord[queryIdx]) {
          charMatches++
          queryIdx++
        }
      }
      if (charMatches >= queryWord.length * 0.6) {
        matchedWords += 0.5
        break
      }
    }
  }
  
  if (matchedWords > 0) {
    const score = (matchedWords / queryWords.length) * 70
    return { matched: true, score }
  }
  
  // Character-level fuzzy match
  let charMatches = 0
  let queryIdx = 0
  for (let i = 0; i < textLower.length && queryIdx < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIdx]) {
      charMatches++
      queryIdx++
    }
  }
  if (charMatches >= queryLower.length * 0.5) {
    const score = (charMatches / queryLower.length) * 40
    return { matched: true, score }
  }
  
  return { matched: false, score: 0 }
}

// GET - Search templates and snippets
export async function GET(request: NextRequest) {
  try {
    const cf = getCloudflareContext()
    const env = cf?.env as Record<string, unknown> | undefined
    const db = env?.DB as D1Binding | undefined
    
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'all'
    const categoryId = searchParams.get('categoryId')
    const bodyPartId = searchParams.get('bodyPartId')
    const modality = searchParams.get('modality')

    if (!query.trim()) {
      // Return all items if no query
      const data = await getAllForSearch(db as any, 50)
      return NextResponse.json({
        templates: type !== 'snippets' ? data.templates : [],
        snippets: type !== 'templates' ? data.snippets : [],
      })
    }

    // Fetch all templates and snippets using D1 client
    const client = createD1Client(db as any)
    
    const templates = type !== 'snippets' ? await client.select(`
      SELECT t.*, c.id as category_id, c.name as category_name, c.description as category_description, c.icon as category_icon, c.color as category_color, bp.id as bodyPart_id, bp.name as bodyPart_name, bp.description as bodyPart_description
      FROM Template t
      LEFT JOIN Category c ON t.categoryId = c.id
      LEFT JOIN BodyPart bp ON t.bodyPartId = bp.id
    `) : []
    
    const snippets = type !== 'templates' ? await client.select(`
      SELECT s.*, c.id as category_id, c.name as category_name, c.description as category_description, c.icon as category_icon, c.color as category_color, bp.id as bodyPart_id, bp.name as bodyPart_name, bp.description as bodyPart_description
      FROM Snippet s
      LEFT JOIN Category c ON s.categoryId = c.id
      LEFT JOIN BodyPart bp ON s.bodyPartId = bp.id
    `) : []

    // Transform templates
    const transformedTemplates = templates.map((row: Record<string, unknown>) => ({
      ...row,
      category: row.category_id ? { id: row.category_id, name: row.category_name, description: row.category_description, icon: row.category_icon, color: row.category_color } : null,
      bodyPart: row.bodyPart_id ? { id: row.bodyPart_id, name: row.bodyPart_name, description: row.bodyPart_description } : null,
    }))

    // Transform snippets
    const transformedSnippets = snippets.map((row: Record<string, unknown>) => ({
      ...row,
      category: row.category_id ? { id: row.category_id, name: row.category_name, description: row.category_description, icon: row.category_icon, color: row.category_color } : null,
      bodyPart: row.bodyPart_id ? { id: row.bodyPart_id, name: row.bodyPart_name, description: row.bodyPart_description } : null,
    }))

    // Filter and score templates
    const matchedTemplates = transformedTemplates
      .map((template: Record<string, unknown>) => {
        if (categoryId && template.categoryId !== categoryId) return null
        if (bodyPartId && template.bodyPartId !== bodyPartId) return null
        if (modality && template.modality !== modality) return null

        const titleMatch = fuzzyMatch(String(template.title || ''), query)
        const descMatch = template.description ? fuzzyMatch(String(template.description), query) : { matched: false, score: 0 }
        const contentMatch = fuzzyMatch(String(template.content || ''), query)
        const tagsMatch = template.tags ? fuzzyMatch(String(template.tags), query) : { matched: false, score: 0 }
        const modalityMatch = template.modality ? fuzzyMatch(String(template.modality), query) : { matched: false, score: 0 }
        const categoryNameMatch = template.category ? fuzzyMatch(String((template.category as Record<string, unknown>).name || ''), query) : { matched: false, score: 0 }
        const bodyPartNameMatch = template.bodyPart ? fuzzyMatch(String((template.bodyPart as Record<string, unknown>).name || ''), query) : { matched: false, score: 0 }

        const maxScore = Math.max(
          titleMatch.score * 1.5,
          descMatch.score,
          contentMatch.score * 0.8,
          tagsMatch.score * 1.2,
          modalityMatch.score * 1.3,
          categoryNameMatch.score * 1.1,
          bodyPartNameMatch.score * 1.1
        )

        if (maxScore === 0) return null

        return {
          ...template,
          type: 'template' as const,
          searchScore: maxScore,
          matchType: titleMatch.matched ? 'title' : descMatch.matched ? 'description' : contentMatch.matched ? 'content' : tagsMatch.matched ? 'tags' : modalityMatch.matched ? 'modality' : categoryNameMatch.matched ? 'category' : bodyPartNameMatch.matched ? 'bodyPart' : 'other',
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => (b.searchScore as number) - (a.searchScore as number))

    // Filter and score snippets
    const matchedSnippets = transformedSnippets
      .map((snippet: Record<string, unknown>) => {
        if (categoryId && snippet.categoryId !== categoryId) return null
        if (bodyPartId && snippet.bodyPartId !== bodyPartId) return null
        if (modality && snippet.modality !== modality) return null

        const titleMatch = fuzzyMatch(String(snippet.title || ''), query)
        const descMatch = snippet.description ? fuzzyMatch(String(snippet.description), query) : { matched: false, score: 0 }
        const contentMatch = fuzzyMatch(String(snippet.content || ''), query)
        const tagsMatch = snippet.tags ? fuzzyMatch(String(snippet.tags), query) : { matched: false, score: 0 }
        const modalityMatch = snippet.modality ? fuzzyMatch(String(snippet.modality), query) : { matched: false, score: 0 }
        const categoryNameMatch = snippet.category ? fuzzyMatch(String((snippet.category as Record<string, unknown>).name || ''), query) : { matched: false, score: 0 }
        const bodyPartNameMatch = snippet.bodyPart ? fuzzyMatch(String((snippet.bodyPart as Record<string, unknown>).name || ''), query) : { matched: false, score: 0 }

        const maxScore = Math.max(
          titleMatch.score * 1.5,
          descMatch.score,
          contentMatch.score * 0.8,
          tagsMatch.score * 1.2,
          modalityMatch.score * 1.3,
          categoryNameMatch.score * 1.1,
          bodyPartNameMatch.score * 1.1
        )

        if (maxScore === 0) return null

        return {
          ...snippet,
          type: 'snippet' as const,
          searchScore: maxScore,
          matchType: titleMatch.matched ? 'title' : descMatch.matched ? 'description' : contentMatch.matched ? 'content' : tagsMatch.matched ? 'tags' : modalityMatch.matched ? 'modality' : categoryNameMatch.matched ? 'category' : bodyPartNameMatch.matched ? 'bodyPart' : 'other',
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => (b.searchScore as number) - (a.searchScore as number))

    return NextResponse.json({
      templates: matchedTemplates.slice(0, 20),
      snippets: matchedSnippets.slice(0, 20),
      totalResults: matchedTemplates.length + matchedSnippets.length,
    })
  } catch (error) {
    console.error('Error searching:', error)
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 })
  }
}
