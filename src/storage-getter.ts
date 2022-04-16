/*
 Getters returning a (promise) storage object (GaiaHubConfig).
*/

import 'cross-fetch/polyfill';
import { GaiaHubConfig, generateGaiaHubConfig } from 'micro-stacks/storage';

const gaiaHubUrl = 'https://hub.blockstack.org';

// Return a (Promise) Gaia object, using private key
export async function getStorePvtKey(
  privateKey: string
): Promise<GaiaHubConfig> {
  const gaiaHubConfig: GaiaHubConfig = await generateGaiaHubConfig({
    privateKey,
    gaiaHubUrl: gaiaHubUrl,
  });
  return gaiaHubConfig;
}

// TBD:
// 1. Return a (Promise) Gaia object, using a session.
// 2. Return a (Promise) Gaia object, using a token?
// 3. Return a (Promise) Gaia object, using an app key?
// 4. Return a (Promise) Gaia object, using a ?
