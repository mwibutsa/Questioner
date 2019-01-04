import express from 'express';
import attendMeetup from '../controllers/reservations';

const router = express.Router();

router.post('/:id/rsvp',attendMeetup);
export default router;