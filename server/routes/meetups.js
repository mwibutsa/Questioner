import express from 'express';

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
router.post('/:id/rsvps', attendMeetup);
router.post('/:id', addQuestion);
router.post('/', addMeetup);
router.get('/upcoming', getUpcomingMeetups);
router.get('/:id', getMeetupById);
// router.delete('/',deleteMeetup);

export default router;
