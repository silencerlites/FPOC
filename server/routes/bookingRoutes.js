import express from 'express';
import { getBookings, getMessages, createMessage } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/', getBookings);
router.get('/:id/messages', getMessages);
router.post('/:id/messages', createMessage);

export default router;
