process.env.NODE_ENV = 'test';
import meetups from '../routes/meetups';
import questions from '../routes/questions';
import reservations from '../routes/reservations';
import app from '../../app';

import chai from 'chai';

let should = chai.should();
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

describe('QUESTIONER TEST RESULTS \n ---------------------------',()=>{
    // describe('/GET /api/v1/comments',()=>{
    //     it('Should get all comments',()=>{
    //         chai.request(app).get('/api/v1/comments').end((err,res)=>{
    //             res.should.have.status(200)
    //             res.body.should.be.a('array');
    //         });
    //     });
    // });

    // describe('/GET /api/v1/users',()=>{
    //     it('Should get all users',()=>{
    //         chai.request(app).get('/api/v1/users').end((err,res)=>{
    //             res.should.have.status(200)
    //             res.body.should.be.a('array');
    //         });
    //     });
    // });
    // TEST GET MEETUP REQUEST
    describe('/GET /api/v1/meetups',()=>{
        it('Should get all meetups',()=>{
            chai.request(app).get('/api/v1/meetups').end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });
    });

    // TEST GET MEETUP BY ID
    describe('/GET /api/v1/meetups/:id',()=>{
        it('Should get a specific meetups',()=>{
            chai.request(app).get('/api/v1/meetups/1').end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });
    });
    // TEST GET UPCOMING MEETUPS
    describe('/GET /api/v1/meetups/upcoming',()=>{
        it('Should get all upcoming meetups',()=>{
            chai.request(app).get('/api/v1/meetups/upcoming').end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });
    });


    describe('/GET /api/v1/cuestions',()=>{
        it('Should get all questions',()=>{
            chai.request(app).get('/api/v1/questions').end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object');
            });
        });
    });


    describe('/POST /api/v1/meetups',()=>{
        it('Should post a meetup',()=>{
            let meetup = {
                id:1,
                createdOn:new Date(),
                location:"Telecom house",
                images:"/images/test-images.jpg",
                topic:"Andela open session",
                happeningOn:"13-01-2019",
                tags:['programing','talent development','bootcamp induction']
            }
            chai.request(app).post('/api/v1/meetups').send(meetup).end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.data.forEach(meetup => {
                    meetup.should.have.property('id').eql(meetup.id);
                    meetup.should.have.property('createdOn');
                    meetup.should.have.property('location');
                    meetup.should.have.property('images');
                    meetup.should.have.property('topic');
                    meetup.should.have.property('happeningOn');
                    meetup.should.have.property('tags');
                });
        
            });
        });
    });


    describe('/POST /api/v1/meetups/:id',()=>{
        it('Should post a question',()=>{
            let question = {
                id:1,
                createdOn:new Date(),
                createdBy:1,
                meetup:1,
                title:"Andela open session",
                body:"Hello I am asking how does andela make money?",
                votes:0
            }
            chai.request(app).post('/api/v1/meetups/1').send(question).end((err,res)=>{
                if(err) console.log(err);
                
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.data.forEach(question => {
                    question.should.have.property('id').eql(question.id);
                    question.should.have.property('createdOn');
                    question.should.have.property('createdBy');
                    question.should.have.property('meetup');
                    question.should.have.property('title');
                    question.should.have.property('votes');
                });

            });

        });
    });
    // TEST RESERVE PLACE
    describe('/GET /api/v1/meetups/:id/rsvp',()=>{
        it('Should reserve place to meetup with id of 5',()=>{
            let reservation = {
                id:1,
                meetup:1,
                answer:"Yes"
            };
            chai.request(app).post('/api/v1/meetups/1/rsvp').send(reservation).end((err,res)=>{
                res.should.have.status(200);
            });
        });
    });
    // // TEST VOTE QUESTION
    describe('/GET /api/v1/questions/:id/upvote',()=>{
        it('Should increase questions votes',()=>{
            chai.request(app).put('/api/v1/questions/2/upvote').end((err,res)=>{
    //             res.should.have.status(200);
            });
        });
     });
     // TEST VOTE QUESTION
     describe('/GET /api/v1/questions/1/downvote',()=>{
         it('should decrease questions votes',()=>{
             chai.request(app).put('/api/v1/questions/2/downvote').end((err,res)=>{
                 res.should.have.status(200);
             });
         });
     });
});