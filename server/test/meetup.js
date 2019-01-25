import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import 'babel-polyfill';
import Database from '../db/db-connection';

process.env.NODE_ENV = 'test';
chai.should();
chai.use(chaiHttp);
describe('TEST GET ALL MEETUPS', () => {
  // eslint-disable-next-line no-undef
  it('Should get All meetups', (done) => {
    chai.request(app).get('/api/v1/meetups').send().then((res) => {
      res.should.have.status(200);
      res.body.data.should.be.a('array');
      done();
    })
      .catch((error) => { throw error; });
  });
});
describe('TEST CREATE A MEETUP', () => {
  beforeEach('Clear All meetups data', (done) => {
    chai.request(app);
    Database.executeQuery('DELETE FROM meetup_table');
    done();
  });
  it('it should not create a new meetup without logging in', (done) => {
    const newMeetup = {
      topic: 'Test meetup',
      location: 'Gakenke',
      happeningOn: '28-08-2019',
    };
    chai.request(app).post('/api/v1/meetups').send(newMeetup).then((res) => {
      res.should.have.status(403);
      res.body.should.be.a('object');
      done();
    })
      .catch((error) => { throw error; });
  });
});
// describe('CREATE MEETUP', () => {
//   let loginToken = '';
//   before((done) => {
//     // get login token
//     chai.request(app).post('/api/v1/users/login').send({ email: 'admin@equestioner.rw', password: 'Password@1' }).then((res) => {
//       loginToken = res.body.token;
//       console.log(loginToken);
//       done();
//     })
//       .catch((error) => { throw error; });

//   });

//   it('Should create a new meetup', (done) => {
//     const newMeetup = {
//       topic: 'Test meetup',
//       location: 'Gakenke',
//       happeningOn: '28-08-2019',
//     };
//     chai.request(app).post('/api/v1/meetups').set('x-access-token', loginToken)
//       .send(newMeetup)
//       .then((res) => {
//         res.should.have.status(201);
//         done();
//       })
//       .catch((error) => { throw error; });
//   });
// });
