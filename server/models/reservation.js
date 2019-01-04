import fs = from 'fs';
let reservations = [];
const reservation = fs.readFileSync('./data/reservations.json',{encoding:'utf8'});
reservations  = JSON.parse(reservation) || [];
export default reservations;