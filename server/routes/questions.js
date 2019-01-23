import express from 'express';

import downVoteQuestion from '../controllers/downvote';
import voteQuestion from '../controllers/upvote';
import getQuestions from '../controllers/questions';
import questionById from '../controllers/question-by-id';
import { getComment, postComment } from '../controllers/comment';

const router = express.Router();
router.get('/:id/comments', getComment);
router.get('/:id', questionById);
router.get('/', getQuestions);
router.patch('/:id/upvote', voteQuestion);
router.patch('/:id/downvote', downVoteQuestion);
router.post('/:id/comment', postComment);

export default router;
