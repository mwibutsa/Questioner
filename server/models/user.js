import fs  from 'fs';
import path from 'path'
let users = [];
const user = fs.readFileSync(path.resolve(__dirname,'../data/users.json'),{encoding:'utf8'});
users  = JSON.parse(user)
export default users;