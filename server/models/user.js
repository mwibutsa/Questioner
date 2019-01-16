import fs from 'fs';
import path from 'path';

const user = fs.readFileSync(path.resolve(__dirname, '../data/users.json'), { encoding: 'utf8' });
const users = JSON.parse(user);
export default users;
