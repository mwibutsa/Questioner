import fs from 'fs';
import meetups from '../models/meetup';
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
  res.json({status:200,data:meetups});
};
export default addMeetup;