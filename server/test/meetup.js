import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

process.env.NODE_ENV = 'test';
chai.should();
chai.use(chaiHttp);

describe('QUESTIONER TEST RESULTS \n ---------------------------', () => {
  describe('/GET /api/v1/meetups', () => {
    it('Should get all meetups', () => {
      chai.request(app).get('/api/v1/meetups').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
    });
  });

  // TEST GET MEETUP BY ID
  describe('/GET /api/v1/meetups/:id', () => {
    it('Should get a specific meetups', () => {
      chai.request(app).get('/api/v1/meetups/1').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
    });
  });
  // TEST GET UPCOMING MEETUPS
  describe('/GET /api/v1/meetups/upcoming', () => {
    it('Should get all upcoming meetups', () => {
      chai.request(app).get('/api/v1/meetups/upcoming').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
    });
  });

  describe('/POST /api/v1/meetups', () => {
    it('Should post a meetup', () => {
      const meetup = {
        id: 1,
        createdOn: new Date(),
        location: 'Telecom house',
        images: '/images/test-images.jpg',
        topic: 'Andela open session',
        happeningOn: '13-01-2019',
        tags: ['programing', 'talent development', 'bootcamp induction'],
      };
      chai.request(app).post('/api/v1/meetups').send(meetup).end((err, res) => {
        try{
            res.should.have.status(200);
            res.body.should.be.a('object');
            let meetup = res.body.data;
            meetup.should.have.property('id').eql(meetup.id);
            meetup.should.have.property('createdOn');
            meetup.should.have.property('location');
            meetup.should.have.property('images');
            meetup.should.have.property('topic');
            meetup.should.have.property('happeningOn');
            meetup.should.have.property('tags');
        }
        catch(err) {
            throw err;
        }
      });
    });
  });
  // TEST RESERVE PLACE
  describe('/GET /api/v1/meetups/:id/rsvp', () => {
    it('Should reserve place to meetup with id of 5', () => {
      const reservation = {
        id: 1,
        meetup: 1,
        answer: 'Yes',
      };
      chai.request(app).post('/api/v1/meetups/1/rsvp').send(reservation).end((err,res) => {
          try{
              res.should.have.status(200);
          }
          catch(error){
            throw error;
          }
      });
    });
  });


});
