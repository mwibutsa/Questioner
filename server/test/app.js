import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import 'babel-polyfill';

process.env.NODE_ENV = 'test';
process.env.PGDATABASE = 'test';

chai.should();
chai.use(chaiHttp);

describe('TESTING 404 NOT FOUND ERROR \n ---------------------------', () => {
  it('It should hande 404 error', (done) => {
    chai.request(app).get('/unexisting-page').send().then((res) => {
      res.should.have.status(404);
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('error').eql('Page not found!');
      done();
    })
      .catch(error => console.error(error));
  });
});
