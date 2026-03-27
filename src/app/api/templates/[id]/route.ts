import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
// GET - Get a single template by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const template = await db.template.findUnique({
      where: { id },
      include: {
        category: true,
        bodyPart: true,
      },
    })
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }
    // Increment usage count
    await db.template.update({
      where: { id },
      data: { usageCount: { increment: 1 } },
    })
    return NextResponse.json(template)
  } catch (error) {
    console.error('Error fetching template:', error)
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 }
    )
  }
}
// PUT - Update a template
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    const template = await db.template.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description || null,
        content: data.content,
        categoryId: data.categoryId || null,
        bodyPartId: data.bodyPartId || null,
        modality: data.modality || null,
        tags: data.tags || null,
        isFavorite: data.isFavorite,
      },
      include: {
        category: true,
        bodyPart: true,
      },
    })
    return NextResponse.json(template)
  } catch (error) {
    console.error('Error updating template:', error)
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    )
  }
}
// DELETE - Delete a template
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.template.delete({
      where: { id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting template:', error)
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    )
  }
}
