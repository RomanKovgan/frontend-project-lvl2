import _ from 'lodash';

const getIdent = (depth, offset = 0, replaser = ' ', spacesCount = 2) => replaser.repeat(spacesCount * (depth + offset));

const stringify = (value, depth, mark) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object
    .entries(value)
    .map(([key, newValue]) => `${getIdent(depth)}${mark}${key}: ${stringify(newValue, depth + 1, mark)}`);
  return [
    '{', ...lines, `${getIdent(depth)}}`,
  ].join('\n');
};

const stylish = (diffTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${getIdent(depth, depth - 1)}  ${node.key}: ${[
          '{', iter(node.children, depth + 1), `${getIdent(depth, depth - 1)}  }`,
        ].join('\n')}`;
      case 'added':
        return `${getIdent(depth, depth - 1)}+ ${node.key}: ${stringify(node.newValue, depth + 1, '  ')}`;
      case 'removed':
        return `${getIdent(depth, depth - 1)}- ${node.key}: ${stringify(node.oldValue, depth + 1, '  ')}`;
      case 'changed':
        return [`${getIdent(depth, depth - 1)}- ${node.key}: ${stringify(node.oldValue, depth + 1, '  ')}`,
          `${getIdent(depth, depth - 1)}+ ${node.key}: ${stringify(node.newValue, depth + 1, '  ')}`].join('\n');
      case 'unchanged':
        return `${getIdent(depth, depth - 1)}  ${node.key}: ${stringify(node.oldValue, depth + 1, '  ')}`;
      default:
        console.log('error');
    }
  }).join('\n');
  return ['{', iter(diffTree, 1, 0), '}'].join('\n');
};

// const stringify = (value, depth) => {
//   if (!_.isObject(value)) {
//     return `${value}`;
//   }
//   const lines = Object
//     .entries(value)
//     .map(([key, newValue]) => `${getIdent(depth + 1)}${key}: ${stringify(newValue, depth + 1)}`);
//   return [
//     '{',
//     ...lines,
//     `${getIdent(depth + 1)}}`,
//   ].join('\n');
// };
// const stylish = (diffTree) => {
//   const iter = (tree, depth) => tree.map((node) => {
//     const makeline = (value, mark) => `${getIdent(depth)}${mark} ${node.key}: ${stringify(value, depth + 1)}`;
//     const mapMark = {
//       added: '+',
//       removed: '-',
//       unchanged: ' ',
//     };
//     switch (node.type) {
//       case 'nested':
//         return `  ${getIdent(depth)}${node.key}: ${[
//           '{',
//           ...iter(node.children, depth + 1),
//           `${getIdent(depth)}}`,
//         ].join('\n')}`;
//       case 'added':
//         return makeline(node.newValue, mapMark.added);
//       case 'removed':
//         return makeline(node.oldValue, mapMark.removed);
//       case 'changed':
//         return [`${makeline(node.oldValue, mapMark.removed)}`,
//           `${makeline(node.newValue, mapMark.added)}`].join('\n');
//       case 'unchanged':
//         return makeline(node.oldValue, mapMark.unchanged);
//       default:
//         console.log('error');
//     }
//   });
//   return ['{', ...iter(diffTree, 1), '}'].join('\n');
// };

export default stylish;
