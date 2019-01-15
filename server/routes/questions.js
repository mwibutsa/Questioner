import express from 'express';
const router = express.Router();

import voteQuestion from '../controllers/vote-question';
import getQuestions from '../controllers/questions';
router.get('/',getQuestions);
router.put('/:id/:voteMethod',voteQuestion);

export default router;