import fs from 'fs';
import meetup from './models/meetup';
const addMeetup = (req, res) => {
  let newMeetup = {
    id: meetups.length + 1 | 1,
    createdOn: new Date(),
    images: 'fileName',
    location:req.body.location,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags,
  };
  meetups.push(newMeetup);
  fs.writeFileSync('./data/meetups.json',JSON.stringify(meetups,null,2));
  res.json(meetups);
};
export default addMeetup;