import yaml from 'js-yaml';

const parser = (data, format) => {
  switch (format) {
    case 'json':
    case '':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Invalid file extension type: '${format}'! Try supported file formats.`);
  }
};

export default parser;
