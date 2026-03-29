import { NextRequest, NextResponse } from 'next/server'
import { getSnippets, createSnippet } from '@/lib/d1'
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

// GET - List all snippets with optional filtering
export async function GET(request: NextRequest) {
  try {
    const cf = getCloudflareContext()
    const env = cf?.env as Record<string, unknown> | undefined
    const db = env?.DB as D1Binding | undefined
    
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const searchParams = request.nextUrl.searchParams
    const filters = {
      categoryId: searchParams.get('categoryId') || undefined,
      bodyPartId: searchParams.get('bodyPartId') || undefined,
      modality: searchParams.get('modality') || undefined,
      favorites: searchParams.get('favorites') === 'true',
    }

    const snippets = await getSnippets(db as any, filters)
    return NextResponse.json(snippets)
  } catch (error) {
    console.error('Error fetching snippets:', error)
    return NextResponse.json({ error: 'Failed to fetch snippets' }, { status: 500 })
  }
}

// POST - Create a new snippet
export async function POST(request: NextRequest) {
  try {
    const cf = getCloudflareContext()
    const env = cf?.env as Record<string, unknown> | undefined
    const db = env?.DB as D1Binding | undefined
    
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const data = await request.json()
    const snippet = await createSnippet(db as any, {
      title: data.title,
      description: data.description || null,
      content: data.content,
      categoryId: data.categoryId || null,
      bodyPartId: data.bodyPartId || null,
      modality: data.modality || null,
      tags: data.tags || null,
      isFavorite: data.isFavorite || false,
    })
    return NextResponse.json(snippet, { status: 201 })
  } catch (error) {
    console.error('Error creating snippet:', error)
    return NextResponse.json({ error: 'Failed to create snippet' }, { status: 500 })
  }
}
