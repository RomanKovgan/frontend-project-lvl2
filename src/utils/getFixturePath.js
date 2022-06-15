import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '..', '__fixtures__', filename);

const getPathFile = (filepath) => resolve(process.cwd(), filepath);

export { getFixturePath, getPathFile };
