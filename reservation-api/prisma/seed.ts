import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Création de l’utilisateur de test
  const user = await prisma.user.upsert({
    where: { email: 'demo@exemple.com' },
    update: {},
    create: {
      email: 'demo@exemple.com',
      password: hashedPassword,
    },
  });

  // Création d’une salle de test
  const room = await prisma.room.create({
    data: {
      name: 'Salle de réunion A',
      capacity: 10,
      location: 'Bâtiment principal',
    },
  });

  // Création d’une ressource de test
  const resource = await prisma.resource.create({
    data: {
      type: 'Projecteur',
      description: 'Projecteur HD disponible',
      available: true,
    },
  });

  // Création d’une réservation exemple
  await prisma.reservation.create({
    data: {
      userId: user.id,
      roomId: room.id,
      resourceId: resource.id,
      date: '2025-12-01',   // format ISO YYYY-MM-DD
      startTime: '15:00',   // format HH:mm
      endTime: '16:00',     // format HH:mm
      status: 'Confirmed',
    },
  });

  console.log('✅ Seed terminé : utilisateur, salle, ressource et réservation créés');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
