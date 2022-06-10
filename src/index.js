import getFixturePath from './utils/getFixturePath.js';
import dataParsers from './utils/parsers.js';
import buildAST from './buildAST.js';
import getVisual from './formatter/index.js';

const gendiff = (file1, file2, format = 'stylish') => {
  const data1 = dataParsers(getFixturePath(file1), 'utf8');
  const data2 = dataParsers(getFixturePath(file2), 'utf8');
  const unionTree = buildAST(data1, data2);
  const visual = getVisual(unionTree, format);
  return (visual);
};

export default gendiff;
