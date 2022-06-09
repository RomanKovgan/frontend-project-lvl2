import getFixturePath from './utils/getFixturePath.js';
import dataParsers from './utils/parsers.js';
import stylish from './formatter/stylish.js';
import buildAST from './buildAST.js';
import plain from './formatter/plain.js';

const gendiff = (file1, file2) => {
  const data1 = dataParsers(getFixturePath(file1), 'utf8');
  const data2 = dataParsers(getFixturePath(file2), 'utf8');
  const unionTree = buildAST(data1, data2);
  // console.log(unionTree);
  return stylish(unionTree);
};

export default gendiff;
