import express from 'express';
import path from 'path';
import meetups from './server/routes/meetups';
import questions from './server/routes/questions';
import reservations from './server/routes/reservations';

const port  = process.env.PORT || 3000;
const app = express();
app.set('port',port);
app.listen(app.get('port'),()=>{
    console.log(`server started on port ${port}`);
    
});

