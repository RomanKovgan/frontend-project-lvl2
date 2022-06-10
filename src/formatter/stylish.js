import _ from 'lodash';

const getIndent = (depth, replaser = ' ', spaceCount = 4) => replaser.repeat(depth * spaceCount - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object
    .entries(value)
    .map(([key, newValue]) => `${getIndent(depth)}  ${key}: ${stringify(newValue, depth + 1)}`);
  return [
    '{', ...lines, `${getIndent(depth - 1)}  }`,
  ].join('\n');
};

const stylish = (diffTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${getIndent(depth)}  ${node.key}: ${[
          '{', iter(node.children, depth + 1), `${getIndent(depth)}  }`,
        ].join('\n')}`;
      case 'added':
        return `${getIndent(depth)}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
      case 'removed':
        return `${getIndent(depth)}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`;
      case 'changed':
        return [`${getIndent(depth)}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
          `${getIndent(depth)}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`].join('\n');
      case 'unchanged':
        return `${getIndent(depth)}  ${node.key}: ${stringify(node.oldValue, depth + 1)}`;
      default:
        console.log('error');
    }
  }).join('\n');
  return ['{', iter(diffTree, 1), '}'].join('\n');
};

export default stylish;
