import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import uuid from 'uuid';

process.env.NODE_ENV = 'test';

chai.should();
chai.use(chaiHttp);
// get all users
describe('USER TEST RESULT \n ---------------------------', () => {
  describe('/GET /api/v1/users', () => {
    it('Should get all users', () => {
      chai.request(app).get('/api/v1/users').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
    });
  });

  // login test
  describe('/POST /api/v1/users', () => {
    it('Should log into user account', () => {
      chai.request(app).post('/api/users/login').send({ username: 'mwibutsa', password: 'UnencryptedPassword' }).end((err, res) => {
        res.should.have.status(200);
      });
    });
  });
  describe('/POST /api/v1/users/new-account', () => {
    it('Should create a new user', () => {
      const userAccount = {
        firstname: 'Twizere',
        lastname: 'Aime',
        othername: 'Pacifique',
        email: 'tuipac@gmail.com',
        username: 'tuipac',
        password: 'UnencryptedPassword',
        cpassword: 'UnencryptedPassword',
      };
      chai.request(app).post('/api/users/new-account').send(userAccount).end((err, res) => {
        try {
            res.should.have.status(200);
        } catch (error) {
          throw error;
        }
      });
    });
  });
});
