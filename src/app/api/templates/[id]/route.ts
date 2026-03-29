import { NextRequest, NextResponse } from 'next/server'
import { getTemplateById, updateTemplate, deleteTemplate } from '@/lib/d1'
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

// GET - Get a single template by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cf = getCloudflareContext()
    const env = cf?.env as Record<string, unknown> | undefined
    const db = env?.DB as D1Binding | undefined
    
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { id } = await params
    const template = await getTemplateById(db as any, id)
    
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }
    
    return NextResponse.json(template)
  } catch (error) {
    console.error('Error fetching template:', error)
    return NextResponse.json({ error: 'Failed to fetch template' }, { status: 500 })
  }
}

// PUT - Update a template
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cf = getCloudflareContext()
    const env = cf?.env as Record<string, unknown> | undefined
    const db = env?.DB as D1Binding | undefined
    
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { id } = await params
    const data = await request.json()
    const template = await updateTemplate(db as any, id, {
      title: data.title,
      description: data.description || null,
      content: data.content,
      categoryId: data.categoryId || null,
      bodyPartId: data.bodyPartId || null,
      modality: data.modality || null,
      tags: data.tags || null,
      isFavorite: data.isFavorite,
    })
    return NextResponse.json(template)
  } catch (error) {
    console.error('Error updating template:', error)
    return NextResponse.json({ error: 'Failed to update template' }, { status: 500 })
  }
}

// DELETE - Delete a template
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cf = getCloudflareContext()
    const env = cf?.env as Record<string, unknown> | undefined
    const db = env?.DB as D1Binding | undefined
    
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { id } = await params
    const deleted = await deleteTemplate(db as any, id)
    
    if (!deleted) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting template:', error)
    return NextResponse.json({ error: 'Failed to delete template' }, { status: 500 })
  }
}
