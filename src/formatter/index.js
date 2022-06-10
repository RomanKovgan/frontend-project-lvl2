import plain from './plain.js';
import stylish from './stylish.js';

export default (diffTree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    default:
      throw new Error(`Invalid file format type: '.${format}'! Try supported file formats.`);
  }
};
