import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
// GET - List all body parts
export async function GET() {
  try {
    const bodyParts = await db.bodyPart.findMany({
      include: {
        _count: {
          select: {
            templates: true,
            snippets: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(bodyParts)
  } catch (error) {
    console.error('Error fetching body parts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch body parts' },
      { status: 500 }
    )
  }
}
