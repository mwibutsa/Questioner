import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import 'babel-polyfill';
import Database from '../db/db-connection';

process.env.NODE_ENV = 'test';

chai.should();
chai.use(chaiHttp);

describe('App test', () => {
  beforeEach((done) => {
    chai.request(app);
    Database.executeQuery('DELETE  FROM user_table');
    done();
  });
  describe('Test 404 error  \n ---------------------------', () => {
    it('It should handle 404 Not found', (done) => {
      chai.request(app).get('/not-found').then((res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      }).catch((error) => {
        console.error(error);
      });
    });
  });
});
