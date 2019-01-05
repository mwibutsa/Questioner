import express from 'express';
import path from 'path';
import meetups from './server/routes/meetups';
import questions from './server/routes/questions';
import reservations from './server/routes/reservations';
import bodyParser from 'body-parser';
import logger from 'morgan';

const port = process.env.PORT || 3000;
const app = express();

app.set('port', port);
app.get('/',(req,res)=>{
    res.json({
        status:200,
        data:[{appName:'eQuestioner',author:'Mwibutsa'}]
    });
});
app.use('/api/v1/meetups/:id/rsvp',reservations);
app.use('/api/v1/meetups',meetups);
app.use('/api/v1/questions',questions);
app.listen(app.get('port'), () => {
  console.log(`server started on port ${port}`);
});
