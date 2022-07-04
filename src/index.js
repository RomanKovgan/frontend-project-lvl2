import { getFilePath } from './utils/utils.js';
import dataParsers from './utils/parsers.js';
import buildAST from './buildAST.js';
import getVisual from './formatter/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = dataParsers(getFilePath(filepath1), 'utf8');
  const data2 = dataParsers(getFilePath(filepath2), 'utf8');
  const tree = buildAST(data1, data2);
  const formatTree = getVisual(tree, format);
  return (formatTree);
};

export default genDiff;
