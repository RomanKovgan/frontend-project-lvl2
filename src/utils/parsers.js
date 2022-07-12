import fs from 'fs';
import yaml from 'js-yaml';
import { getFormat, getFilePath } from './utils.js';

const parser = (filename) => {
  const format = getFormat(filename).slice(1);
  const data = fs.readFileSync(filename);
  if (format === 'json' || format === '') {
    return JSON.parse(data);
  }
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(data);
  }
  throw new Error(`Invalid file extension type: '${format}'! Try supported file formats.`);
};

const readFile = (filepath) => parser(getFilePath(filepath), 'utf8');

export default readFile;
