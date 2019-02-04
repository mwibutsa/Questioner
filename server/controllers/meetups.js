import { selectFrom } from '../models/getAll';

const getMeetups = (req, res) => {
  selectFrom('meetup_table').then((meetups) => {
    if (meetups.rows) {
      return res.status(200).json({ status: 200, data: meetups.rows });
    }
  }).catch(error => res.status(500).json({ status: 500, error: `Internal server error ${error}` }));
};

export default getMeetups;
