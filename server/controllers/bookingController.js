import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchJobs } from '../services/servicem8.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../db.json');

// Safe DB reader
const readDb = () => {
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch (err) {
    return { users: [], messages: [] };
  }
};

const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

/**
 * GET /api/bookings
 * Returns all bookings (no auth)
 */
export const getBookings = async (req, res) => {
  try {
    const allJobs = await fetchJobs();

    // Just return all jobs (or you can filter by email/phone query param)
    const formattedJobs = allJobs.map(job => ({
      uuid: job.uuid,
      job_id: job.generated_job_id,
      status: job.status,
      description: job.job_description,
      address: job.job_address,
      date: job.date,
    }));

    res.json(formattedJobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve bookings",
      error: error.message
    });
  }
};

/**
 * GET /api/bookings/:id
 */
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const allJobs = await fetchJobs();

    const job = allJobs.find(j => j.uuid === id);

    if (!job) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to load job", error: error.message });
  }
};

/**
 * GET /api/bookings/:id/messages
 */
export const getMessages = (req, res) => {
  const { id } = req.params;

  const db = readDb();
  const messages = db.messages.filter(msg => msg.bookingId === id);

  res.json(messages);
};

/**
 * POST /api/bookings/:id/messages
 */
export const createMessage = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Message content required" });
  }

  const db = readDb();

  const newMessage = {
    id: Date.now(),
    bookingId: id,
    content,
    sender: 'Customer',
    timestamp: new Date().toISOString()
  };

  db.messages.push(newMessage);
  writeDb(db);

  res.status(201).json(newMessage);
};
