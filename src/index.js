import readFile from './utils/parsers.js';
import buildAST from './buildAST.js';
import getFormat from './formatter/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const tree = buildAST(data1, data2);
  const formatTree = getFormat(tree, format);
  return (formatTree);
};

export default genDiff;
