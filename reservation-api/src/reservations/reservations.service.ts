// src/reservations/reservations.service.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type CreateReservation = {
  userId: string
  roomId: string
  resourceId?: string
  date: string      // YYYY-MM-DD
  startTime: string // HH:mm
  endTime: string   // HH:mm
}

function overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  // assumes HH:mm lexicographically comparable when same format
  return aStart < bEnd && bStart < aEnd
}

export const reservationsService = {
  list: () =>
    prisma.reservation.findMany({
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    }),
  remove: (id: string) => prisma.reservation.delete({ where: { id } }),

  async create(data: CreateReservation) {
    // Check room conflicts
    const sameDay = await prisma.reservation.findMany({
      where: { roomId: data.roomId, date: data.date },
    })
    const conflictRoom = sameDay.some((r) => overlaps(data.startTime, data.endTime, r.startTime, r.endTime))
    if (conflictRoom) throw Object.assign(new Error('Time slot unavailable for this room'), { status: 400 })

    // Check resource conflicts (if resource provided)
    if (data.resourceId) {
      const sameDayRes = await prisma.reservation.findMany({
        where: { resourceId: data.resourceId, date: data.date },
      })
      const conflictRes = sameDayRes.some((r) => overlaps(data.startTime, data.endTime, r.startTime, r.endTime))
      if (conflictRes) throw Object.assign(new Error('Resource already reserved at this time'), { status: 400 })
    }

    return prisma.reservation.create({
      data: { ...data, status: 'Confirmed' },
    })
  },
}
