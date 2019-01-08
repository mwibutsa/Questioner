import meetups from '../models/meetup';
const getMeetups = async (req, res) => res.json({
	status:200,
	data: await meetups()
});

export default getMeetups;