import fs from 'fs';
import { getFilePath } from './utils.js';

const readFile = (filepath) => fs.readFileSync(getFilePath(filepath), 'utf-8');

export default readFile;
