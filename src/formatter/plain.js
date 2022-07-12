import _ from 'lodash';

const getValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const plain = (diffTree) => {
  const iter = (tree, fullPath) => tree.flatMap((node) => {
    const currentPath = [...fullPath, node.key];
    const path = currentPath.join('.');
    switch (node.type) {
      case 'nested':
        return iter(node.children, currentPath);
      case 'added':
        return `Property '${path}' was added with value: ${getValue(node.newValue)}`;
      case 'removed':
        return `Property '${path}' was removed`;
      case 'changed':
        return `Property '${path}' was updated. From ${getValue(node.oldValue)} to ${getValue(node.newValue)}`;
      case 'unchanged':
        return undefined;
      default:
        throw new Error('Unknown type!');
    }
  }).filter((item) => item !== undefined)
    .join('\n');
  return iter(diffTree, []);
};
export default plain;
