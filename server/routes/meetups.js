import express from 'express';
import { verifyToken, isAdmin } from '../middleware/authenticate';
import getMeetups from '../controllers/meetups';
import addMeetup from '../controllers/add-meetup';
import getMeetupById from '../controllers/specific-meetup';
import addQuestion from '../controllers/add-question';
import attendMeetup from '../controllers/reservations';
import getUpcomingMeetups from '../controllers/upcoming-meetups';
import getQuestions from '../controllers/questions';

const router = express.Router();
router.get('/:id/questions', getQuestions);
router.get('/', getMeetups);
router.post('/:id/rsvps',verifyToken, attendMeetup);
router.post('/:id/questions', verifyToken, addQuestion);
router.post('/', verifyToken, isAdmin, addMeetup);
router.get('/upcoming', getUpcomingMeetups);
router.get('/:id', getMeetupById);
// router.delete('/',deleteMeetup);

export default router;
