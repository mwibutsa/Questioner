import fs = from 'fs';
let questions = [];
const reservation = fs.readFileSync('../data/questions.json',{encoding:'utf8'});
questions  = JSON.parse(question) || [];
export default questions;