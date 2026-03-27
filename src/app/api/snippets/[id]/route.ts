import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
// GET - Get a single snippet by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const snippet = await db.snippet.findUnique({
      where: { id },
      include: {
        category: true,
        bodyPart: true,
      },
    })
    if (!snippet) {
      return NextResponse.json(
        { error: 'Snippet not found' },
        { status: 404 }
      )
    }
    // Increment usage count
    await db.snippet.update({
      where: { id },
      data: { usageCount: { increment: 1 } },
    })
    return NextResponse.json(snippet)
  } catch (error) {
    console.error('Error fetching snippet:', error)
    return NextResponse.json(
      { error: 'Failed to fetch snippet' },
      { status: 500 }
    )
  }
}
// PUT - Update a snippet
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    const snippet = await db.snippet.update({
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
    return NextResponse.json(snippet)
  } catch (error) {
    console.error('Error updating snippet:', error)
    return NextResponse.json(
      { error: 'Failed to update snippet' },
      { status: 500 }
    )
  }
}
// DELETE - Delete a snippet
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.snippet.delete({
      where: { id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting snippet:', error)
    return NextResponse.json(
      { error: 'Failed to delete snippet' },
      { status: 500 }
    )
  }
}
