import fs from 'fs';
import gendiff from '../src/index.js';
// import getFixturePath from '../utils/getFixturePath';

const result = fs.readFileSync('__fixtures__/expectedGendiff.txt', 'utf8');
const result1 = fs.readFileSync('__fixtures__/expectation.txt', 'utf8');

test('gendiffJson', () => {
  expect(gendiff('file3.json', 'file4.json')).toEqual(result1);
});

test('gendiffYaml', () => {
  expect(gendiff('file1.yaml', 'file2.yml')).toEqual(result);
});
