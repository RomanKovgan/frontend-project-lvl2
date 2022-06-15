import fs from 'fs';
import buildAST from '../src/buildAST.js';
import stylish from '../src/formatter/stylish.js';
import plain from '../src/formatter/plain.js';
import json from '../src/formatter/json.js';
import { getFixturePath } from '../src/utils/getFixturePath.js';
import dataParse from '../src/utils/parsers.js';

const resultStylish = fs.readFileSync('__fixtures__/expectedStylish.txt', 'utf8');
const resultPlain = fs.readFileSync('__fixtures__/expectedPlain.txt', 'utf8');
const resultJson = fs.readFileSync('__fixtures__/expectedJson.txt', 'utf8');

const data1 = dataParse(getFixturePath('file1.json'));
const data2 = dataParse(getFixturePath('file2.json'));

const unionTree = buildAST(data1, data2);

test('stylishGenDiff', () => {
  expect(stylish(unionTree)).toEqual(resultStylish);
});

test('plainGenDiff', () => {
  expect(plain(unionTree)).toEqual(resultPlain);
});

test('jsonGenDiff', () => {
  expect(json(unionTree)).toEqual(resultJson);
});
