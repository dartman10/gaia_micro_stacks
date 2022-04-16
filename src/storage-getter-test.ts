/*
Getters returning a storage object.
*/

import { getStorePvtKey } from './storage-getter';

const privateKey =
  '2e0f1b1b5b2dd054fcc176d5b8e82e0425cec26e555d108298a7e16a8853e7a9'; //where do i get the private key of user? from session object?

getStorePvtKey(privateKey) // get a Gaia object using private key
  .then((storage) => {
    // then put file into Gaia
    console.log('\nHere is your storage (GaiaHubConfig) =\n', storage);
  });

/*
---------------
 Test result:
---------------
  Here is your storage (GaiaHubConfig) =
 {
  address: '19ipr3aK7BXxy3h4NfJxzoywxHqd8NhkYg',
  url_prefix: 'https://gaia.blockstack.org/hub/',
  token: 'v1:eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJnYWlhQ2hhbGxlbmdlIjoiW1wiZ2FpYWh1YlwiLFwiMFwiLFwic3RvcmFnZTIuYmxvY2tzdGFjay5vcmdcIixcImJsb2Nrc3RhY2tfc3RvcmFnZV9wbGVhc2Vfc2lnblwiXSIsImh1YlVybCI6Imh0dHBzOi8vaHViLmJsb2Nrc3RhY2sub3JnIiwiaXNzIjoiMDMyZDg2NGFmNGJhNDlhZGEyZTA0Yzg2MTRhYjY0N2NmYzVhOTMzODBiMTUzNWE4ODA4NWQ4MDgwMzljNGIwYjlkIiwic2FsdCI6IjEzOCwyMzgsMzIsNDMsODYsMTQzLDEyMywxMzEsMTMsMTAsMTI2LDEyMCwxMTUsMTA5LDE3NSwyMCIsImFzc29jaWF0aW9uVG9rZW4iOm51bGwsInNjb3BlcyI6bnVsbH0.QMU4UXanDdTJfvkWPGTVGYphMEfEYP1/V6MavRAERA4fSros42uJFrkJ2LYFFGLQ5g2E3FqskrSGN1n9Rvi4vg',
  server: 'https://hub.blockstack.org',
  max_file_upload_size_megabytes: 20
 }
*/
