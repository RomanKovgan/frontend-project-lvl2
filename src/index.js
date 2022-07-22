import { getFormatToFile } from './utils/utils.js';
import parser from './utils/parsers.js';
import readFile from './utils/readFile.js';
import buildTree from './buildTree.js';
import getFormat from './formatter/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parser(readFile(filepath1), getFormatToFile(filepath1));
  const data2 = parser(readFile(filepath2), getFormatToFile(filepath2));
  const tree = buildTree(data1, data2);
  const formatTree = getFormat(tree, format);
  return (formatTree);
};

export default genDiff;
