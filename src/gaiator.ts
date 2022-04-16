import 'cross-fetch/polyfill';
import {
  GaiaHubConfig,
  generateGaiaHubConfig,
  putFile,
  PutFileOptions,
  getFile,
  deleteFile,
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

/*
+-----------------------------------------------------------------------------+
| writeFile()                                                                 |
|                                                                             |
| TBDs :                                                                      |
|   1. Overwrite or not overwrite option                                      |
|   2. Encrypted or not encrypted option                                      |
+-----------------------------------------------------------------------------+
*/
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
|  - payload accepts a GaiaHubConfig object and filename to read              |
|  - returns a promise                                                        |
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

/*
+-----------------------------------------------------------------------------+
| deleteFile()                                                                |
|  - payload accepts a GaiaHubConfig object and file to delete                |
|  - returns a promise                                                        |
|                                                                             |
| To do : handle file does not exist, statusCode=404                          |
+-----------------------------------------------------------------------------+
*/
export async function deleteMyFile(
  path: string,
  gaiaHubConfig: GaiaHubConfig
): Promise<string> {
  const options = { wasSigned: false, gaiaHubConfig }; //fails if wasSigned is not set according to actual file signed/unsigned state
  const xxx = await deleteFile(path, options);
}

/*
+-----------------------------------------------------------------------------+
| listFiles()                                                                 |
|  - payload accepts a GaiaHubConfig object                                   |
|  - returns a promise                                                        |
+-----------------------------------------------------------------------------+
*/
async function listFiles(gaiaHubConfig: GaiaHubConfig): Promise<string> {
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

getStorage(privateKey) // get a Gaia object using private key
  .then((storage) => {
    // then put file into Gaia
    writeFile(targetFileName, data, storage).then((uriTargetFile) => {
      console.log('\nHere is your new file =', uriTargetFile);
    });
  })
  .catch(console.log);

getStorage(privateKey) // get a Gaia object using private key
  .then((storage) => {
    // then read a Gaia file
    readFile(targetFileName, storage).then((content) => {
      console.log('\nHere is your file content =', content);
    });
  })
  .catch(console.log);

//warning: deleteFile promise executes quicker than putFile promise above. so this usually fails with no file found.
getStorage(privateKey) // get a Gaia object using private key
  .then((storage) => {
    deleteMyFile(targetFileName, storage).then((content) => {
      console.log('\ndeleted =', targetFileName);
    });
  })
  .catch(console.log);
