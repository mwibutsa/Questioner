import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import app from '../../app';
import Database from '../db/db-connection';

process.env.NODE_ENV = 'test';
process.env.PGDATABASE = 'test';

chai.should();
chai.use(chaiHttp);

describe('/POST /api/v1/users/new-account', () => {
  beforeEach('Clear data from User table', (done) => {
    chai.request(app);
    Database.executeQuery('DELETE FROM user_table');
    done();
  });
  it('Should create a new user', () => {
    const userAccount = {
      firstname: 'Twizere',
      lastname: 'Aime',
      othername: 'Pacifique',
      email: 'tuipac@gmail.com',
      username: 'tuipac',
      password: 'password',
      phoneNumber: '+250787740316',
      cpassword: 'password',
      isAdmin: 1,
    };
    chai.request(app).post('/api/v1/users/new-account').send(userAccount).then((res) => {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(201);
      res.body.should.have.status('data');
      res.body.data.should.be.a('array');
      res.body.data.forEach((element) => {
        element.shoud.have.property('firstname').eql('Twizere');
        element.shoud.have.property('lastname').eql('Aime');
      });
    })
      .catch((error) => { throw error; });
  });
});

// get all users
describe('USER TEST RESULT \n ---------------------------', () => {
  describe('/GET /api/v1/users', () => {
    it('Should get all users', () => {
      chai.request(app).get('/api/v1/users').send().then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
      })
        .catch((error) => { throw error; });
    });
  });

  // login test
  describe('/POST /api/v1/users/login', () => {
    it('Should log into user account', () => {
      chai.request(app).post('/api/v1/users/login').send({ email: 'twipac@gmail.com', password: 'password' }).end((err, res) => {
        res.should.have.status(202);
        res.body.should.have.property('status').eql(202);
        res.body.should.have.property('data');
        res.body.data.forEach((element) => {
          element.shoud.have.property('token');
          element.toke.shoud.be.a('string');
        });
      });
    });
  });

});
