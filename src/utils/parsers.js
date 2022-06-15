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
  if (format === '.json' || format === '') {
    return JSON.parse(data);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  }
  throw new Error(`Invalid file extension type: '${format}'! Try supported file formats.`);
};

export default dataParse;
