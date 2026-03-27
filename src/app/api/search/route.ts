import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
// Fuzzy search function that calculates similarity score
function fuzzyMatch(text: string, query: string): { matched: boolean; score: number } {
  const textLower = text.toLowerCase()
  const queryLower = query.toLowerCase()
  // Direct substring match - highest score
  if (textLower.includes(queryLower)) {
    // Score based on position (earlier = higher) and relative length
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
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'all' // 'all', 'templates', 'snippets'
    const categoryId = searchParams.get('categoryId')
    const bodyPartId = searchParams.get('bodyPartId')
    const modality = searchParams.get('modality')
    if (!query.trim()) {
      // Return all items if no query
      const templates = type !== 'snippets' ? await db.template.findMany({
        include: { category: true, bodyPart: true },
        orderBy: { usageCount: 'desc' },
        take: 50,
      }) : []
      const snippets = type !== 'templates' ? await db.snippet.findMany({
        include: { category: true, bodyPart: true },
        orderBy: { usageCount: 'desc' },
        take: 50,
      }) : []
      return NextResponse.json({ templates, snippets })
    }
    // Fetch all templates and snippets
    const templates = type !== 'snippets' ? await db.template.findMany({
      include: { category: true, bodyPart: true },
    }) : []
    const snippets = type !== 'templates' ? await db.snippet.findMany({
      include: { category: true, bodyPart: true },
    }) : []
    // Filter and score templates
    const matchedTemplates = templates
      .map((template) => {
        // Apply filters
        if (categoryId && template.categoryId !== categoryId) return null
        if (bodyPartId && template.bodyPartId !== bodyPartId) return null
        if (modality && template.modality !== modality) return null
        // Search in multiple fields
        const titleMatch = fuzzyMatch(template.title, query)
        const descMatch = template.description ? fuzzyMatch(template.description, query) : { matched: false, score: 0 }
        const contentMatch = fuzzyMatch(template.content, query)
        const tagsMatch = template.tags ? fuzzyMatch(template.tags, query) : { matched: false, score: 0 }
        const modalityMatch = template.modality ? fuzzyMatch(template.modality, query) : { matched: false, score: 0 }
        const categoryNameMatch = template.category?.name ? fuzzyMatch(template.category.name, query) : { matched: false, score: 0 }
        const bodyPartNameMatch = template.bodyPart?.name ? fuzzyMatch(template.bodyPart.name, query) : { matched: false, score: 0 }
        // Calculate combined score
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
          matchType: titleMatch.matched ? 'title' :
                     descMatch.matched ? 'description' :
                     contentMatch.matched ? 'content' :
                     tagsMatch.matched ? 'tags' :
                     modalityMatch.matched ? 'modality' :
                     categoryNameMatch.matched ? 'category' :
                     bodyPartNameMatch.matched ? 'bodyPart' : 'other',
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.searchScore - a.searchScore)
    // Filter and score snippets
    const matchedSnippets = snippets
      .map((snippet) => {
        // Apply filters
        if (categoryId && snippet.categoryId !== categoryId) return null
        if (bodyPartId && snippet.bodyPartId !== bodyPartId) return null
        if (modality && snippet.modality !== modality) return null
        // Search in multiple fields
        const titleMatch = fuzzyMatch(snippet.title, query)
        const descMatch = snippet.description ? fuzzyMatch(snippet.description, query) : { matched: false, score: 0 }
        const contentMatch = fuzzyMatch(snippet.content, query)
        const tagsMatch = snippet.tags ? fuzzyMatch(snippet.tags, query) : { matched: false, score: 0 }
        const modalityMatch = snippet.modality ? fuzzyMatch(snippet.modality, query) : { matched: false, score: 0 }
        const categoryNameMatch = snippet.category?.name ? fuzzyMatch(snippet.category.name, query) : { matched: false, score: 0 }
        const bodyPartNameMatch = snippet.bodyPart?.name ? fuzzyMatch(snippet.bodyPart.name, query) : { matched: false, score: 0 }
        // Calculate combined score
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
          matchType: titleMatch.matched ? 'title' :
                     descMatch.matched ? 'description' :
                     contentMatch.matched ? 'content' :
                     tagsMatch.matched ? 'tags' :
                     modalityMatch.matched ? 'modality' :
                     categoryNameMatch.matched ? 'category' :
                     bodyPartNameMatch.matched ? 'bodyPart' : 'other',
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.searchScore - a.searchScore)
    return NextResponse.json({
      templates: matchedTemplates.slice(0, 20),
      snippets: matchedSnippets.slice(0, 20),
      totalResults: matchedTemplates.length + matchedSnippets.length,
    })
  } catch (error) {
    console.error('Error searching:', error)
    return NextResponse.json(
      { error: 'Failed to search' },
      { status: 500 }
    )
  }
}
