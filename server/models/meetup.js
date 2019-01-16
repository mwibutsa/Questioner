import fs from 'fs';
import path from 'path';

const meetup = fs.readFileSync(path.resolve(__dirname, '../data/meetups.json'), { encoding: 'utf8' });
const meetups = JSON.parse(meetup);
export default meetups;
