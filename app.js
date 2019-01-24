import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import bodyParser from 'body-parser';
import logger from 'morgan';
import meetups from './server/routes/meetups';
import users from './server/routes/users';
import questions from './server/routes/questions';
import { pageNotFound, serverError } from './server/controllers/notfound';

const port = process.env.PORT || 3000;
const app = express();

app.use(favicon(path.resolve(__dirname, 'favicon.ico')));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: '_2@0)1!9(',
  cookie: {
    secure: true,
  },
}));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.set('port', port);
app.get('/', (req, res) => {
  res.json({
    status: 200,
    data: [{
      appName: 'eQuestioner',
      description: 'Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.',
      author: 'Mwibutsa',
    }],
  });
});
app.use('/api/v1/meetups', meetups);
app.use('/api/v1/questions', questions);
app.use('/api/v1/users', users);
app.use(pageNotFound);
app.use(serverError);
app.listen(app.get('port'));

export default app;
