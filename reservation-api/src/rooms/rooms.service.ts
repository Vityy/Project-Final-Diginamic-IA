// src/rooms/rooms.service.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const roomsService = {
  list: () => prisma.room.findMany({ orderBy: { name: 'asc' } }),
  create: (data: { name: string; capacity: number; location: string }) => prisma.room.create({ data }),
  update: (id: string, data: Partial<{ name: string; capacity: number; location: string }>) =>
    prisma.room.update({ where: { id }, data }),
  remove: (id: string) => prisma.room.delete({ where: { id } }),
}
