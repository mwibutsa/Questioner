import fs from 'fs';
import path from 'path';

fs.readFileSync(path.resolve(__dirname, '../data/reservations.json'), { encoding: 'utf8' });

const reservation = fs.readFileSync(path.resolve(__dirname, '../data/reservations.json'), { encoding: 'utf8' });
const reservations = JSON.parse(reservation) || [];
export default reservations;
