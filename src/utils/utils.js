import {
  dirname, join, resolve, extname,
} from 'path';
import { fileURLToPath } from 'url';

const getFormat = (filename) => {
  const dataParse = extname(filename).toLowerCase();
  return dataParse;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPathFixture = (filename) => join(__dirname, '..', '..', '__fixtures__', filename);

const getFilePath = (filepath) => resolve(process.cwd(), filepath);

export { getPathFixture, getFilePath, getFormat };
