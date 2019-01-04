import fs from 'fs';
import path from 'path';
let questions = [];
const question =  fs.readFileSync(path.resolve(__dirname,'../data/questions.json'),{encoding:'utf8'});
questions  = JSON.parse(question) || [];
export default questions;