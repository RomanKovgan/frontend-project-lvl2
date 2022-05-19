#!/usr/bin/env node

import { Command } from 'commander';
import { genDiff } from '../src/index.js';


const programm = new Command();
programm
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .arguments('<filepath1> <filepath2>')
  .option( '-f, --format <type>', 'output format')
  .action((file1, file2) => {
    console.log(genDiff(file1, file2))
  })
    
    

programm.parse();