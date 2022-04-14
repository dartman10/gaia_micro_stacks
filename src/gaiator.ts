import 'cross-fetch/polyfill';
import {
  GaiaHubConfig,
  generateGaiaHubConfig,
  putFile,
  PutFileOptions,
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

// Write a new Gaia file, with file name as parameter.
async function writeFile(
  filename: string,
  gaiaHubConfig: GaiaHubConfig
): Promise<void> {
  const fileContent = JSON.stringify({
    interest: 'skiing',
    age: 22,
    gender: 'male',
  });
  const encryptOptions: PutFileOptions = { encrypt: false, gaiaHubConfig };
  const publicURL = await putFile(filename, fileContent, encryptOptions);
  console.log('New file =', publicURL);
}

// Return a (Promise) Gaia object, using a provided private key
async function getStorage(privateKey: string): Promise<GaiaHubConfig> {
  const gaiaHubConfig: GaiaHubConfig = await generateGaiaHubConfig({
    privateKey,
    gaiaHubUrl: 'https://hub.blockstack.org',
  });
  return gaiaHubConfig;
}

//where do i get the private of user? from session object?
const privateKey =
  '2e0f1b1b5b2dd054fcc176d5b8e82e0425cec26e555d108298a7e16a8853e7a9';

// Main()
getStorage(privateKey) // get a Gaia object
  .then((storage) => {
    console.log('storage=', storage);
    writeFile('file3.json', storage); // write a Gaia file
  })
  .catch(console.log);
