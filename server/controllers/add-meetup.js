import fs from 'fs';
import path from 'path';
const pathToModel = path.resolve(__dirname,'../models/meetup.js');
import meetups from '../models/meetup';
const addMeetup = (req, res) => {
  let newMeetup = {
    id: meetups.length + 1,
    createdOn: new Date(),
    images: 'image.jpg',
    location:req.body.location,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags,
  };
  meetups.push(newMeetup);
  fs.writeFileSync(path.resolve(__dirname,'../data/meetups.json'),JSON.stringify(meetups,null,2));
  res.json({status:200,data:meetups});
};
export default addMeetup;