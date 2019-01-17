import express from 'express';

import voteQuestion from '../controllers/vote-question';
import getQuestions from '../controllers/questions';

const router = express.Router();
router.get('/', getQuestions);
router.patch('/:id/:voteMethod', voteQuestion);

export default router;
