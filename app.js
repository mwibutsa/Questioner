import express from 'express';
import cors from 'cors';
import favicon from 'serve-favicon';
import path from 'path';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import meetups from './server/routes/meetups';
import users from './server/routes/users';
import questions from './server/routes/questions';
import { pageNotFound, serverError } from './server/controllers/notfound';

const port = process.env.PORT || 3000;
const app = express();

console.log('Images Path',path.resolve(__dirname, '/UI/images/uploaded'));
app.use(cors());
app.use(favicon(path.resolve(__dirname, 'favicon.ico')));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'UI')));
app.set('port', port);
app.get('/', (req, res) => {
  res.status(200).send('index.html');
});
app.use('/api/v1/meetups', meetups);
app.use('/api/v1/questions', questions);
app.use('/api/v1/users', users);
app.use(pageNotFound);
app.use(serverError);
app.listen(app.get('port'));

export default app;
