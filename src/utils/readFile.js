import fs from 'fs';
import { getFormat, getFilePath } from './utils.js';
import parser from './parsers.js';

const readFile = (filepath) => {
  const format = getFormat(filepath).slice(1);
  const data = fs.readFileSync(getFilePath(filepath), 'utf-8');
  return parser(data, format);
};

export default readFile;
