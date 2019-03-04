import express from 'express';
import { upvoteQuestion, downvoteQuestion } from '../controllers/vote';
import getQuestions from '../controllers/questions';
import questionById from '../controllers/question-by-id';
import { getComment, postComment } from '../controllers/comment';
import getTopQuestions from '../controllers/top-questions';
import { verifyToken } from '../middleware/authenticate';

const router = express.Router();
router.get('/top-questions',verifyToken, getTopQuestions);
router.get('/:id/comments', getComment);
router.get('/:id', questionById);
router.get('/', getQuestions);
router.patch('/:id/upvote', upvoteQuestion);
router.patch('/:id/downvote', downvoteQuestion);
router.post('/:id/comment', postComment);

export default router;
