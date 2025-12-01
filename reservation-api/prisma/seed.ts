// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@exemple.com' },
    update: {},
    create: { email: 'demo@exemple.com', password: passwordHash },
  })

  const roomA = await prisma.room.create({ data: { name: 'Salle 101', capacity: 20, location: 'Bâtiment A' } })
  const roomB = await prisma.room.create({ data: { name: 'Salle 204', capacity: 10, location: 'Bâtiment B' } })

  const resA = await prisma.resource.create({ data: { type: 'Projecteur', description: 'HDMI', available: true } })
  const resB = await prisma.resource.create({ data: { type: 'Tableau blanc', description: 'Feutres inclus', available: true } })

  await prisma.reservation.create({
    data: {
      userId: user.id,
      roomId: roomA.id,
      resourceId: resA.id,
      date: '2025-12-02',
      startTime: '09:00',
      endTime: '10:00',
      status: 'Confirmed',
    },
  })
}

main().finally(async () => {
  await prisma.$disconnect()
})
