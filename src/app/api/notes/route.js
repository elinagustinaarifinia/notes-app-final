// src/app/api/notes/route.js
import prisma from '@/lib/prisma'

export async function GET() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return Response.json(notes)
}

export async function POST(request) {
  const { title, content } = await request.json()

  const newNote = await prisma.note.create({
    data: { title, content }
  })

  return Response.json(newNote)
}
