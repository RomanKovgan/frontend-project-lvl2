import _ from 'lodash';
import getFixturePath from '../utils/getFixturePath.js';
import dataParsers from '../utils/parsers.js';

export default (file1, file2) => {
  const data1 = dataParsers(getFixturePath(file1), 'utf8');
  const data2 = dataParsers(getFixturePath(file2), 'utf8');
  const sortedKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const result = ['{'];
  // eslint-disable-next-line no-restricted-syntax
  for (const key of sortedKeys) {
    if (!Object.hasOwn(data1, key)) {
      result.push(`  + ${key}: ${data2[key]}`);
    } else if (!Object.hasOwn(data2, key)) {
      result.push(`  - ${key}: ${data1[key]}`);
    } else if (data1[key] !== data2[key]) {
      result.push(`  - ${key}: ${data1[key]}`);
      result.push(`  + ${key}: ${data2[key]}`);
    } else {
      result.push(`    ${key}: ${data1[key]}`);
    }
  }
  result.push('}');

  return result.join('\n');
};
