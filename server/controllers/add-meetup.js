import fs from 'fs';
import path from 'path';
import joi from 'joi';
import meetups from '../models/meetup';
import Validation from '../helpers/validation';

let filePath = '';
const addMeetup = (req, res) => {
  if (req.files) {
    const meetupImages = req.files.images;
    filePath = `../../meetup-files/${meetupImages.name}`;
    meetupImages.mv(filePath, (error) => {
      if (error) {
        return res.json({
          status: 500,
          error,
        });
      }
    });
  }

  joi.validate(req.body, Validation.meetupSchema, Validation.validationOption, (err, result) => {
    if (err) {
      return res.json({
        status: 400,
        error: err.details[0].message,
      });
    }
      const newMeetup = {
        id: meetups.length + 1,
        createdOn: new Date(),
        images: filePath,
        location: req.body.location,
        topic: req.body.topic,
        happeningOn: req.body.happeningOn,
        tags: req.body.tags,
      };
    meetups.push(newMeetup);
    fs.writeFileSync(path.resolve(__dirname, '../data/meetups.json'), JSON.stringify(meetups, null, 2));
    res.json({ status: 200, data: newMeetup });
});
}
export default addMeetup;
