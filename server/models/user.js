import fs  from 'fs';
import path from 'path'
let users = [];
const users = fs.readFileSync(path.resolve(__dirname,'../data/users.json'),{encoding:'utf8'});
users  = JSON.parse(users)
export default users;