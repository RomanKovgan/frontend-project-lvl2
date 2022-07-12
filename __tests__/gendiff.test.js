import fs from 'fs';
import genDiff from '../src/index.js';
import { getFixturePath } from '../src/utils/utils.js';

const formats = ['stylish', 'plain', 'json'];
const types = ['json', 'yaml'];

describe.each(formats)('Comparison files', (format) => {
  it.each(types)(`Testing format - ${format}`, (type) => {
    const file1Path = getFixturePath(`file1.${type}`);
    const file2Path = getFixturePath(`file2.${type}`);
    const expectResult = fs.readFileSync(getFixturePath(`expected-${format}.txt`), 'utf8');
    const result = genDiff(file1Path, file2Path, format);
    expect(result).toBe(expectResult);
  });
});
