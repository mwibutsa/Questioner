import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

process.env.NODE_ENV = 'test';

chai.should();
chai.use(chaiHttp);

describe('COMMENT TEST RESULTS \n ---------------------------', () => {
  // describe('/GET /api/v1/comments',()=>{
  //     it('Should get all comments',()=>{
  //         chai.request(app).get('/api/v1/comments').end((err,res)=>{
  //             res.should.have.status(200)
  //             res.body.should.be.a('array');
  //         });
  //     });
  // });
});
