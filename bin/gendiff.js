import { Command } from "commander";
const programm = new Command();
programm
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')



programm.parse();