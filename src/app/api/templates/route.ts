import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
// GET - List all templates with optional filtering
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
    const templates = await db.template.findMany({
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
    return NextResponse.json(templates)
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}
// POST - Create a new template
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const template = await db.template.create({
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
    return NextResponse.json(template, { status: 201 })
  } catch (error) {
    console.error('Error creating template:', error)
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    )
  }
}
