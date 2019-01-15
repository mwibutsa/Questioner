import fs from 'fs';
import path from 'path';
const pathToModel = path.resolve(__dirname,'../models/meetup.js');
import meetups from '../models/meetup';
let filePath = '';
const addMeetup = (req, res) => {
  if(req.files){
    const meetupImages = req.files.images;
    filePath = '../../meetup-files/'+meetupImages.name;
    meetupImages.mv(filePath,(error)=> {
      if(error) res.json({
        status:500,
        error:error
      });
    });
  }

  let newMeetup = {
    id: meetups.length + 1,
    createdOn: new Date(),
    images: filePath,
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