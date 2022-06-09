#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/index.js';

const programm = new Command();
programm
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((file1, file2, { format }) => {
    console.log(gendiff(file1, file2, format));
  });

programm.parse();
