import express from 'express';
const router = express.Router();
import getMeetups from '../controllers/meetups';
import addMeetup from '../controllers/create-meetup';
import deleteMeetup from '../controllers/delete-meetup';

router.get('/',getMeetups);
router.post('/',addMeetup);
router.delete('/',deleteMeetup);

export default router;