import express from 'express';

import voteQuestion from '../controllers/downvote';
import downVoteQuestion from '../controllers/upvote';
import getQuestions from '../controllers/questions';

const router = express.Router();
router.get('/', getQuestions);
router.patch('/:id/upvote', voteQuestion);
router/patch('/:id/downvote',downVoteQuestion);

export default router;
