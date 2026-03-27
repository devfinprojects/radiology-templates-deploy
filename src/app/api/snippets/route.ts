import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
// GET - List all snippets with optional filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categoryId = searchParams.get('categoryId')
    const bodyPartId = searchParams.get('bodyPartId')
    const modality = searchParams.get('modality')
    const favorites = searchParams.get('favorites')
    const where: Record<string, unknown> = {}
    if (categoryId) {
      where.categoryId = categoryId
    }
    if (bodyPartId) {
      where.bodyPartId = bodyPartId
    }
    if (modality) {
      where.modality = modality
    }
    if (favorites === 'true') {
      where.isFavorite = true
    }
    const snippets = await db.snippet.findMany({
      where,
      include: {
        category: true,
        bodyPart: true,
      },
      orderBy: [
        { usageCount: 'desc' },
        { createdAt: 'desc' },
      ],
    })
    return NextResponse.json(snippets)
  } catch (error) {
    console.error('Error fetching snippets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch snippets' },
      { status: 500 }
    )
  }
}
// POST - Create a new snippet
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const snippet = await db.snippet.create({
      data: {
        title: data.title,
        description: data.description || null,
        content: data.content,
        categoryId: data.categoryId || null,
        bodyPartId: data.bodyPartId || null,
        modality: data.modality || null,
        tags: data.tags || null,
        isFavorite: data.isFavorite || false,
      },
      include: {
        category: true,
        bodyPart: true,
      },
    })
    return NextResponse.json(snippet, { status: 201 })
  } catch (error) {
    console.error('Error creating snippet:', error)
    return NextResponse.json(
      { error: 'Failed to create snippet' },
      { status: 500 }
    )
  }
}
