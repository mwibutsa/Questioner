import express from 'express';
import { verifyToken, isAdmin } from '../middleware/authenticate';
import getMeetups from '../controllers/meetups';
import addMeetup from '../controllers/add-meetup';
import getMeetupById from '../controllers/specific-meetup';
import addQuestion from '../controllers/add-question';
import attendMeetup from '../controllers/reservations';
import getUpcomingMeetups from '../controllers/upcoming-meetups';
import getQuestions from '../controllers/questions';
import deleteMeetup from '../controllers/delete-meetup';
import editMeetupt from '../controllers/edit-meetup';
import addImage from '../controllers/add-image';

const router = express.Router();
router.get('/:id/questions', getQuestions);
router.get('/', getMeetups);
router.post('/:id/rsvps', verifyToken, attendMeetup);
router.post('/:id/questions', verifyToken, addQuestion);
router.post('/:id/images/add', verifyToken, addImage);
router.put('/:id', verifyToken, isAdmin, editMeetupt);
router.delete('/:id', verifyToken, isAdmin, deleteMeetup);
router.post('/', verifyToken, isAdmin, addMeetup);
router.get('/upcoming', getUpcomingMeetups);
router.get('/:id', getMeetupById);
// router.delete('/',deleteMeetup);

export default router;
