import express from 'express';
const router = express.Router();

import addQuestion from '../controllers/add-question';
import upvoteQuestion from '../controllers/upvote-question';
import downvoteQuestion from '../controllers/downvote-question';
router.get('/',getQuestions);
router.post('/',addQuestion);
router.put('/upvote',upvoteQuestion);
router.put('/downvote',downvoteQuestion);

export default router;