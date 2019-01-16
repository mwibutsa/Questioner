import fs  from 'fs';
import path from 'path';
let reservations = [];

const reservation = fs.readFileSync(path.resolve(__dirname,'../data/reservations.json'),{encoding:'utf8'});
reservations  = JSON.parse(reservation) || [];
export default reservations;