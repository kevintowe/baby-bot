/* tslint:disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { writeFile, existsSync, mkdirSync } = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { argv } = require('yargs');

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const environment = argv.environment;

function writeFileUsingFS(targetPath, environmentFileContent) {
  writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
      console.log(err);
    }
    if (environmentFileContent !== '') {
      console.log(`wrote variables to ${targetPath}`);
    }
  });
}

// Providing path to the `environments` directory
const envDirectory = './apps/pwa/src/environments';

// creates the `environments` directory if it does not exist
if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

//creates the `environment.prod.ts` and `environment.ts` file if it does not exist
writeFileUsingFS('./apps/pwa/src/environments/environment.prod.ts', '');
writeFileUsingFS('./apps/pwa/src/environments/environment.ts', '');

// Checks whether command line argument of `prod` was provided signifying production mode
const isProduction = environment === 'prod';

// choose the correct targetPath based on the environment chosen
const targetPath = isProduction
  ? './apps/pwa/src/environments/environment.prod.ts'
  : './apps/pwa/src/environments/environment.ts';

//actual content to be compiled dynamically and pasted into respective environment files
const environmentFileContent = `
  // This file was autogenerated by dynamically running setEnv.ts and using dotenv for managing API key secrecy
  export const environment = {
    production: ${isProduction},
    firebaseConfig: '${process.env.FIREBASE_CONFIG}'
  };
`;

writeFileUsingFS(targetPath, environmentFileContent); // appending data into the target file

/* tslint:enable */