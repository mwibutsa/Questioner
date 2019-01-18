class Helper {
  constructor() {
    this.intCastCompare = (value1, value2) => parseInt(value1, 10) === parseInt(value2, 10);

    this.processVote = (voteMethod, questions, questionId, userId = 1) => {
      const question = questions.find(q => this.intCastCompare(q.id, questionId));
      if (question) {
        questions.splice(questions.indexOf(question), 1);
        const upvoters = question.upvotedBy;
        const downvoters = question.downvotedBy;
        if (!(upvoters.find(ids => this.intCastCompare(ids, userId))) && !(downvoters.find(ids => this.intCastCompare(ids, userId)))) {
          if (voteMethod === 'upvote') {
            question.upvotes += 1;
            question.upvotedBy.push(userId);
          } else if (voteMethod === 'downvote') {
            question.downvotes += 1;
            question.downvotedBy.push(userId);
          }
        }
        // if user is not in upvoters ie user is in downvoters(3rd case) or none(firs case)
        else if (!(upvoters.find(ids => this.intCastCompare(ids, userId))) && voteMethod === 'upvote') {
          question.upvotes += 1;
          question.downvotes -= 1;
          question.downvotedBy.splice(downvoters.indexOf(userId), 1);
          question.upvotedBy.push(userId);
        }
        // if user is not in downvoters ie: user is in upvoters(2nd case) or none(first case)
        else if (!(downvoters.find(ids => this.intCastCompare(ids, userId))) && voteMethod === 'downvote') {
          question.downvotes += 1;
          question.upvotes -= 1;
          question.upvotedBy.splice(upvoters.indexOf(userId), 1);
          question.downvotedBy.push(userId);
        }
        else{
          if(upvoters.find(ids => this.intCastCompare(ids,userId)) && voteMethod === "upvote"){
            question.upvotes -= 1;
            question.upvotedBy.splice(upvoters.indexOf(userId),1);
          }
            else{
              question.downvotes -= 1;
              question.downvotedBy.splice(upvoters.indexOf(userId),1)
            }

          }
        }
        questions.push(question);
        return { question, questions };
      }
    };
  }
export default new Helper();
