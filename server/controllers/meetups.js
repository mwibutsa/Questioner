import fs = from 'fs';
let meetups = [];

const meetup = fs.readFileSync('./data/meetups.json',{encoding:'utf8'});
meetups  = JSON.parse(meetup) || [];
const getMeetups = (req, res) => res.json({
	status:200,
	data:meetups
});

export default getMeetups;