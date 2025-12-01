import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

app.use(cors());
app.use(express.json());

/**
 * Route de login
 */
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Mot de passe incorrect' });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * Middleware d’authentification
 */
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;
    next();
  });
}

/**
 * --- ROUTES RESERVATIONS ---
 */
app.get('/api/reservations', authenticateToken, async (req: any, res) => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { userId: req.userId },
    });
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/reservations', authenticateToken, async (req: any, res) => {
  const { date, startTime, endTime, roomId, resourceId } = req.body;

  try {
    const reservation = await prisma.reservation.create({
      data: {
        date,
        startTime,
        endTime,
        roomId,
        resourceId,
        userId: req.userId,
      },
    });
    res.json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * --- ROUTES ROOMS ---
 */
app.get('/api/rooms', authenticateToken, async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/rooms', authenticateToken, async (req, res) => {
  const { name, capacity, location } = req.body;
  try {
    const room = await prisma.room.create({
      data: { name, capacity, location },
    });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.delete('/api/rooms/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.room.delete({ where: { id: req.params.id } });
    res.json({ message: 'Salle supprimée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * --- ROUTES RESOURCES ---
 */
app.get('/api/resources', authenticateToken, async (req, res) => {
  try {
    const resources = await prisma.resource.findMany();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/resources', authenticateToken, async (req, res) => {
  const { type, description, available } = req.body;
  try {
    const resource = await prisma.resource.create({
      data: { type, description, available },
    });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.delete('/api/resources/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.resource.delete({ where: { id: req.params.id } });
    res.json({ message: 'Ressource supprimée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});
