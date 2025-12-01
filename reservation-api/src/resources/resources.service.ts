// src/resources/resources.service.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const resourcesService = {
  list: () => prisma.resource.findMany({ orderBy: { type: 'asc' } }),
  create: (data: { type: string; description: string; available: boolean }) => prisma.resource.create({ data }),
  update: (id: string, data: Partial<{ type: string; description: string; available: boolean }>) =>
    prisma.resource.update({ where: { id }, data }),
  remove: (id: string) => prisma.resource.delete({ where: { id } }),
}
