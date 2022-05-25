import fs from 'fs';
import gendiff from '../src/index.js';
// import getFixturePath from '../utils/getFixturePath';

const result = fs.readFileSync('__fixtures__/expectedGendiff.txt', 'utf8');

test('gendiff', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(result);
});
