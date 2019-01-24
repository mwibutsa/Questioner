import express from 'express';
import  verifyAuthentication  from '../middleware/authenticate';
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
router.post('/:id/rsvps',verifyAuthentication.verifyToken, attendMeetup);
router.post('/:id/questions', verifyAuthentication.verifyToken, addQuestion);
router.post('/',verifyAuthentication.verifyToken,verifyAuthentication.isAdmin,addMeetup);
router.get('/upcoming', getUpcomingMeetups);
router.get('/:id', getMeetupById);
// router.delete('/',deleteMeetup);

export default router;
