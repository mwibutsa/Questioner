import express from 'express';
const router = express.Router();

import addQuestion from '../controllers/add-question';
import upvoteQuestion from '../controllers/upvote-question';
import downvoteQuestion from '../controllers/downvote-question';
import getQuestions from '../controllers/questions';
router.get('/',getQuestions);
router.put('/:id/upvote',upvoteQuestion);
router.put('/:id/downvote',downvoteQuestion);

export default router;