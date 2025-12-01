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
 * POST /api/auth/login
 * Body: { email, password }
 */
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

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
 * Route GET /api/reservations
 * Retourne toutes les réservations de l’utilisateur connecté
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

/**
 * Route POST /api/reservations
 * Crée une nouvelle réservation
 * Body: { date, description }
 */
app.post('/api/reservations', authenticateToken, async (req: any, res) => {
  const { date, description } = req.body;

  try {
    const reservation = await prisma.reservation.create({
      data: {
        date: new Date(date),
        description,
        userId: req.userId,
      },
    });
    res.json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
