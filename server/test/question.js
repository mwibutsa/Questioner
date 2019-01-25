// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../../app';

// process.env.NODE_ENV = 'test';

// chai.should();
// chai.use(chaiHttp);

// describe('QUESTION TEST RESULTS \n ---------------------------', () => {
//   describe('/POST /api/v1/meetups/:id', () => {
//     it('Should post a question', () => {
//       const Question = {
//         title: 'Andela open session',
//         question: 'Hello I am asking how does andela make money?',

//       };
//       chai.request(app).post('/api/v1/meetups/1').send(Question).end((err, res) => {
//         try {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           const question = res.body.data;
//           question.should.have.property('id').eql(question.id);
//           question.should.have.property('createdOn');
//           question.should.have.property('createdBy');
//           question.should.have.property('meetup');
//           question.should.have.property('title');
//           question.should.have.property('upvotes');
//           question.should.have.property('downvotes');
//         } catch (error) {
//           throw error;
//         }
//       });
//     });
//   });
//   // // TEST VOTE QUESTION
//   describe('/GET /api/v1/questions/:id/upvote', () => {
//     it('Should increase questions votes', () => {
//       chai.request(app).put('/api/v1/questions/2/upvote').end((err, res) => {
//         //             res.should.have.status(200);
//       });
//     });
//   });
//   // TEST VOTE QUESTION
//   describe('/GET /api/v1/questions/1/downvote', () => {
//     it('should decrease questions votes', () => {
//       chai.request(app).put('/api/v1/questions/2/downvote').end((err, res) => {
//         res.should.have.status(200);
//       });
//     });
//   });
// });
