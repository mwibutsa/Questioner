import { processVote } from '../helpers/functions';

const upvoteQuestion = (req, res) => {
  processVote(req, res, 'upvote');
};
const downvoteQuestion = (req, res) => {
  processVote(req, res, 'downvote');
};
export { upvoteQuestion, downvoteQuestion };
