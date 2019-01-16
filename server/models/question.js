import fs from 'fs';
import path from 'path';

const question = fs.readFileSync(path.resolve(__dirname, '../data/questions.json'), { encoding: 'utf8' });
const questions = JSON.parse(question) || [];
export default questions;
