#!/usr/bin/env node

import { Command } from "commander";

const programm = new Command();
programm
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .arguments('<filepath1> <filepath2>')
programm
  .option( '-f, --format <type>', 'output format')

programm.parse();