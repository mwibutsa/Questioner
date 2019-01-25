import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import 'babel-polyfill';

process.env.NODE_ENV = 'test';
chai.should();
chai.use(chaiHttp);

describe('TEST GET ALL MEETUPS',(done) => {
  
});
