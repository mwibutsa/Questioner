import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

process.env.NODE_ENV = 'test';

chai.should();
chai.use(chaiHttp);

describe('QUESTIONER TEST RESULTS \n ---------------------------', () => {
    describe('/POST /api/v1/meetups/:id', () => {
        it('Should post a question', () => {
          const question = {
            id: 1,
            createdOn: new Date(),
            createdBy: 1,
            meetup: 1,
            title: 'Andela open session',
            body: 'Hello I am asking how does andela make money?',
            votes: 0,
          };
          chai.request(app).post('/api/v1/meetups/1').send(question).end((err, res) => {
            if (err) console.log(err);
    
            res.should.have.status(200);
            res.body.should.be.a('object');
           let question =  res.body.data
              question.should.have.property('id').eql(question.id);
              question.should.have.property('createdOn');
              question.should.have.property('createdBy');
              question.should.have.property('meetup');
              question.should.have.property('title');
              question.should.have.property('upvotes');
              question.should.have.property('downvotes')
          });
        });
      });
  // // TEST VOTE QUESTION
  describe('/GET /api/v1/questions/:id/upvote', () => {
    it('Should increase questions votes', () => {
      chai.request(app).put('/api/v1/questions/2/upvote').end((err, res) => {
        //             res.should.have.status(200);
      });
    });
  });
  // TEST VOTE QUESTION
  describe('/GET /api/v1/questions/1/downvote', () => {
    it('should decrease questions votes', () => {
      chai.request(app).put('/api/v1/questions/2/downvote').end((err, res) => {
        res.should.have.status(200);
      });
    });
  });
});
