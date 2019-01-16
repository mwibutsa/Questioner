import express from 'express';

import getMeetups from '../controllers/meetups';
import addMeetup from '../controllers/add-meetup';
import getMeetupById from '../controllers/specific-meetup';
import addQuestion from '../controllers/add-question';
import attendMeetup from '../controllers/reservations';
import getUpcommingMeetups from '../controllers/upcomming-meetups';

const router = express.Router();
router.get('/', getMeetups);
router.post('/:id/rsvp', attendMeetup);
router.post('/:id', addQuestion);
router.post('/', addMeetup);
router.get('/upcomming', getUpcommingMeetups);
router.get('/:id', getMeetupById);
// router.delete('/',deleteMeetup);

export default router;
