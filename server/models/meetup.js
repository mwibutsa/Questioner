import fs  from 'fs';
import path from 'path'
let meetups = [];
const meetup = fs.readFileSync(path.resolve(__dirname,'../data/meetups.json'),{encoding:'utf8'});
meetups  = JSON.parse(meetup)
export default meetups;