import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getExtension = (filename) => {
  const dataParse = path.extname(filename).toLowerCase();
  return dataParse;
};

const dataParse = (filename) => {
  const format = getExtension(filename);
  const data = fs.readFileSync(filename);
  let parse;
  if (format === '.json' || format === '') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(data);
};

export default dataParse;
