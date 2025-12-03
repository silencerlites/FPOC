// controllers/authController.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../db.json');

const readDb = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));

export const login = (req, res) => {
  const { email, phone } = req.body;
  const db = readDb();

  const user = db.users.find(u => u.email === email && u.phone === phone);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  // Simple token: Base64 encoded userId
  const token = Buffer.from(user.id.toString()).toString('base64');
  res.json({ user, token });
};
