/* eslint-disable array-callback-return */
import _ from 'lodash';

const printValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const plain = (diffTree) => {
  // eslint-disable-next-line consistent-return
  const iter = (tree, fullPath) => tree.flatMap((node) => {
    const currentPath = fullPath.slice(0);
    currentPath.push(node.key);
    const path = currentPath.join('.');
    switch (node.type) {
      case 'nested':
        return iter(node.children, currentPath);
      case 'added':
        return `Property '${path}' was added with value: ${printValue(node.newValue)}`;
      case 'removed':
        return `Property '${path}' was removed`;
      case 'changed':
        return `Property '${path}' was updated. From ${printValue(node.oldValue)} to ${printValue(node.newValue)}`;
      case 'unchanged':
        break;
      default:
        console.log('error');
    }
  }).filter((item) => item !== undefined).join('\n');
  return iter(diffTree, []);
};
export default plain;
