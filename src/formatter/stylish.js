import _ from 'lodash';

const getIdent = (depth, replaser = ' ', spacesCount = 2) => replaser.repeat(spacesCount * depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object
    .entries(value)
    .map(([key, newValue]) => `${getIdent(depth)}${key}: ${stringify(newValue, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${getIdent(depth + 1)}}`,
  ].join('\n');
};

const stylish = (diffTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    const makeline = (value, mark) => `${getIdent(depth + 1)}${mark} ${node.key}: ${stringify(value, depth + 1)}`;
    const mapMark = {
      added: '+',
      removed: '-',
      unchanged: ' ',
    };
    console.log(depth);
    switch (node.type) {
      case 'nested':
        return `  ${getIdent(depth)}${node.key}: ${[
          '{',
          ...iter(node.children, depth + 1),
          `${getIdent(depth)}}`,
        ].join('\n')}`;
      case 'added':
        return makeline(node.newValue, mapMark.added);
      case 'removed':
        return makeline(node.oldValue, mapMark.removed);
      case 'changed':
        return [`${makeline(node.oldValue, mapMark.removed)}`,
          `${makeline(node.newValue, mapMark.added)}`].join('\n');
      case 'unchanged':
        return makeline(node.oldValue, mapMark.unchanged);
      default:
        console.log('error');
    }
  });
  return ['{', ...iter(diffTree, 1), '}'].join('\n');
};

export default stylish;
