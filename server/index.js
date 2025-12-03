import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import bookingRoutes from './routes/bookingRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());

app.use('/api/auth', authRoutes);         // Login
app.use('/api/bookings', bookingRoutes);  

app.get('/', (req, res) => res.send('API is running'));

app.listen(PORT, () => console.log(`[ api ] http://localhost:${PORT}`));
