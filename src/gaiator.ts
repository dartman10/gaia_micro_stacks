import 'cross-fetch/polyfill';
import {
  GaiaHubConfig,
  generateGaiaHubConfig,
  putFile,
  PutFileOptions,
  getFile,
  GetFileOptions,
} from 'micro-stacks/storage';

// So, create like a 'connect to database' method.
// This will 'instantiate' a Gaia 'object' and all interactions is thru this object.
// Use singleton pattern for the Gaia object. Or not. Factory maybe.
// Make sure to provide "disconnect from database" method, to reset user specific memory (specially auth token).

//This module is for Trubit's specific use cases, having hardcoded Trubit info:
// 1. Get a Trubit app Gaia storage object.
// 2. App user file
//     2.1 Create a Trubit app user Gaia file.
//     2.2 Read a Trubit app user Gaia file.
//     2.3 Update a Trubit app user Gaia file.
//     2.4 List all Trubit app user Gaia files.
// 3. Trubit app own file
//     3.1 Create a Trubit app user Gaia file.
//     3.2 Read a Trubit app user Gaia file.
//     3.3 Update a Trubit app user Gaia file.
//     3.4 List all Trubit app user Gaia files.

// Return a (Promise) Gaia object, using a provided private key
async function getStorage(privateKey: string): Promise<GaiaHubConfig> {
  const gaiaHubConfig: GaiaHubConfig = await generateGaiaHubConfig({
    privateKey,
    gaiaHubUrl: 'https://hub.blockstack.org',
  });
  return gaiaHubConfig;
}

// Write a new Gaia file
async function writeFile(
  filename: string,
  fileContent: string,
  gaiaHubConfig: GaiaHubConfig
): Promise<string> {
  const encryptOptions: PutFileOptions = { encrypt: false, gaiaHubConfig };
  const publicURL = await putFile(filename, fileContent, encryptOptions);
  //console.log('New file =', publicURL);
  return publicURL;
}

/*
+-----------------------------------------------------------------------------+
| readFile()                                                                  |
|  - payload accepts a Storage instance and filename to read                  |
|  - returns string file content                                              |
+-----------------------------------------------------------------------------+
*/
async function readFile(
  filename: string,
  gaiaHubConfig: GaiaHubConfig
): Promise<string> {
  const options = { decrypt: false, gaiaHubConfig };
  const file = await getFile(filename, options);
  //console.log('New file =', publicURL);
  return JSON.parse(<string>file);
}

//--------------------------------
//  Main() - this is the start
//--------------------------------

const privateKey =
  '2e0f1b1b5b2dd054fcc176d5b8e82e0425cec26e555d108298a7e16a8853e7a9'; //where do i get the private key of user? from session object?
const targetFileName = 'file3.json';
const data = JSON.stringify({
  interest: 'skiing',
  age: 22,
  gender: 'male',
});

getStorage(privateKey) // get a Gaia object
  .then((storage) => {
    // then put file into Gaia
    writeFile(targetFileName, data, storage).then((uriTargetFile) => {
      console.log('\nHere is your new file =', uriTargetFile);
    });
  })
  .catch(console.log);

getStorage(privateKey) // get a Gaia object
  .then((storage) => {
    // then read a Gaia file
    readFile(targetFileName, storage).then((content) => {
      console.log('\nHere is your file content =', content);
    });
  })
  .catch(console.log);
