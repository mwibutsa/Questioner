import express from 'express';
import attendMeetup from '../controllers/reservations';

const router = express.Router();

router.post('/', attendMeetup);
export default router;
