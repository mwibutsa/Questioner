import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import Database from '../db/db-connection';

process.env.NODE_ENV = 'test';
chai.should();
chai.use(chaiHttp);
let userId;
let userToken;

describe('MEETUP TEST RESULTS \n ---------------------------', () => {
  before((done) => {
    chai.request(app);
    Database.createAdmin();
    chai.request(app).post('/api/v1/users/login')
      .send({ email: 'admin@questioner.com', password: 'adMin@2019' })
      .end((err, res) => {
        userId = res.body.data[0].id;
        userToken = res.body.token;
      });
    done();
  });
  describe('Create a new meetup', () => {
    console.log(userToken);
    it('Should create a new Meetup', (done) => {
      chai.request(app).post('/api/v1/meetups').set('Authorization', `Bearer ${userToken}`)
        .send({
          topic: 'Test meetup',
          location: 'Kigali Rwanda',
          happeningOn: '28-09-2019',
        })
        .then((res) => {
          console.log(res.body);
          res.should.have.status(201);
        })
        .catch(error => console.error(error));
      done();
    });
  });
  describe('Get all Meetups', () => {
    it('Should get all Meetups', (done) => {
      chai.request(app).get('/api/v1/meetups').then((res) => {
        res.should.have.status(200);
        done();
      }).catch(error => console.error(error));
    });
  });
});
