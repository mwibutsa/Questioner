import meetups from '../models/meetup';
const getMeetupById = async (req, res) => {
  const meetupData = await meetups(); 
  const meetupById = meetupData.find(meetup => meetup.id == req.params.id);
  if (meetupById) {
    res.json(meetupById);
  } else {
    res.json({
      status: 404,
      error: 'The meetup with given id is not found',
    });
  }
};
export default getMeetupById;