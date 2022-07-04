import fs from 'fs';
import buildAST from '../src/buildAST.js';
import stylish from '../src/formatter/stylish.js';
import plain from '../src/formatter/plain.js';
import json from '../src/formatter/json.js';
import { getPathFixture } from '../src/utils/utils.js';
import dataParse from '../src/utils/parsers.js';

const resultStylish = fs.readFileSync('__fixtures__/expectedStylish.txt', 'utf8');
const resultPlain = fs.readFileSync('__fixtures__/expectedPlain.txt', 'utf8');
const resultJson = fs.readFileSync('__fixtures__/expectedJson.txt', 'utf8');

const data1 = dataParse(getPathFixture('file1.json'));
const data2 = dataParse(getPathFixture('file2.json'));

const unionTree = buildAST(data1, data2);

test.each([
  [stylish, resultStylish],
  [plain, resultPlain],
  [json, resultJson],
])('%pformat of gendiff', (format, expected) => {
  expect(format(unionTree)).toEqual(expected);
});
