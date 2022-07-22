import {
  dirname, join, resolve, extname,
} from 'path';
import { fileURLToPath } from 'url';

const getFormatToFile = (filename) => extname(filename).toLowerCase().slice(1);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '..', '__fixtures__', filename);

const getFilePath = (filepath) => resolve(process.cwd(), filepath);

export { getFixturePath, getFilePath, getFormatToFile };
