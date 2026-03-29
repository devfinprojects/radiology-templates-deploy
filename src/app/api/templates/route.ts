import { NextRequest, NextResponse } from 'next/server'
import { getTemplates, createTemplate } from '@/lib/d1'
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

// GET - List all templates with optional filtering
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

    const templates = await getTemplates(db as any, filters)
    return NextResponse.json(templates)
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 })
  }
}

// POST - Create a new template
export async function POST(request: NextRequest) {
  try {
    const cf = getCloudflareContext()
    const env = cf?.env as Record<string, unknown> | undefined
    const db = env?.DB as D1Binding | undefined
    
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const data = await request.json()
    const template = await createTemplate(db as any, {
      title: data.title,
      description: data.description || null,
      content: data.content,
      categoryId: data.categoryId || null,
      bodyPartId: data.bodyPartId || null,
      modality: data.modality || null,
      tags: data.tags || null,
      isFavorite: data.isFavorite || false,
    })
    return NextResponse.json(template, { status: 201 })
  } catch (error) {
    console.error('Error creating template:', error)
    return NextResponse.json({ error: 'Failed to create template' }, { status: 500 })
  }
}
