import fs = from 'fs';
let meetups = [];
const meetup = fs.readFileSync('../data/meetups.json',{encoding:'utf8'});
meetups  = JSON.parse(meetup) || [];
export default meetups;