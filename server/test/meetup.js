import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import 'babel-polyfill';
import Database from '../db/db-connection';

process.env.NODE_ENV = 'test';
chai.should();
chai.use(chaiHttp);
describe('TEST CREATE A MEETUP', () => {
  beforeEach('Clear All meetups data',(done) => {
    chai.request(app);
    Database.executeQuery('DELETE FROM meetup_table');
    done();
  });
  it('it should create a new meetup',(done) => {
    
  });
});
describe('TEST GET ALL MEETUPS', () => {
  // eslint-disable-next-line no-undef
  it('Should get All meetups', (done) => {
    chai.request(app).get('/api/v1/meetups').send().then((res) => {
      res.should.have.status(200);
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('data');
      res.body.data.should.be.a('array');
      done();
    })
      .catch((error) => { throw error; });
  });
});
