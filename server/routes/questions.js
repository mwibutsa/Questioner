import express from 'express';

import downVoteQuestion from '../controllers/downvote';
import voteQuestion from '../controllers/upvote';
import getQuestions from '../controllers/questions';
import questionById from '../controllers/question-by-id';

const router = express.Router();
router.get('/:id', questionById);
router.get('/', getQuestions);
router.patch('/:id/upvote', voteQuestion);
router.patch('/:id/downvote', downVoteQuestion);

export default router;
