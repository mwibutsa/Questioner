import uuid from 'uuid';
import meetups from '../models/meetup';
import Database from '../database/db_connection';

let filePath = '';

const addMeetup = async (req, res) => {
  if (req.files) {
    const meetupImages = req.files.images;
    filePath = `../../meetup-files/${meetupImages.name}`;
    meetupImages.mv(filePath, (error) => {
      if (error) {
        res.json({
          status: 500,
          error,
        });
      }
    });
  }
  const meetupQuery = 'INSERT INTO meetup_table (id,created_on,location,topic,happening_on) VALUES ($1,$2,$3,$4,$5) RETURNING *;';
  const { location, topic, happeningOn } = req.body;
  const newMeetup = [uuid.v4(), new Date(), location, topic, happeningOn];
  await Database.executeQuery(meetupQuery, newMeetup);
  res.json({ status: 200, data: meetups });
};
export default addMeetup;
