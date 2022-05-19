import fs from 'fs';
import _ from 'lodash';
import { getFixturePath } from '../utils/fixturePath.js';

const genDiff = (file1, file2) => {

  
  const data1 = JSON.parse(fs.readFileSync(getFixturePath(file1)));
  const data2 = JSON.parse(fs.readFileSync(getFixturePath(file2)));
  const sortedKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2))); 

  const result = ['{']
  for (const key of sortedKeys) {
    if (!Object.hasOwn(data1, key)) {
      result.push(`+ ${key}: ${data2[key]}`);
    } else if (!Object.hasOwn(data2, key)) {
      result.push(`- ${key}: ${data1[key]}`);
    } else if (data1[key] !== data2[key]) {
      result.push(`- ${key}: ${data2[key]}`);
      result.push(`+ ${key}: ${data1[key]}`)
    
    } else {
      result.push(`  ${key}: ${data1[key]}`);
    }
  }
  result.push('}')
  
  return result.join('\n');
  };
  export { genDiff };