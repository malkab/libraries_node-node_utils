import { md } from "node-forge";

import uid from "uid-generator";

import { hashSync as bcryptHash } from "bcryptjs";

export module hashing {

/**
*
* Returns an UID.
*
*/
export function genUid(): string {

  const uidgen: any = new uid(48);
  return uidgen.generateSync();

}

/**
*
* Encrypt something with bcrypthash.
*
*/
export function encrypt(item: string, size: number = 10): string {

  return bcryptHash(item, size);

}

/**
*
* Returns as short as possible hashses without repeats for a set of strings,
* taking into account an optional existing set of keys.
*
* @param values
* Set of new values to create minihashes for.
*
* @param existingMiniHashes
* Set of existing mini hashes already in the set to avoid new hashes clashes.
*
* @param includeExisting
* A flag to include the existing mini hashes in the output. Existing minihashes
* will be added to the end of the new ones.
*
* @param time
* Optional use of a time seed in the hash.
*
* @return
* The array of the newly created hashes, not including the
*
*/
export function miniHash({
    values,
    existingMiniHashes = [],
    includeExisting = false,
    time = false
  }: {
    values: string[];
    existingMiniHashes?: string[];
    includeExisting?: boolean;
    time?: boolean;
}): string[] {

  // To store new seeds
  const newMiniHashes: string[] = [];

  // Chec
  for (const x of values) {

    // Get a full length hash
    const s: string = sha256(x, time);

    // Boolean to check for repeats
    let existing: boolean = true;

    // Initial length of the mini hash
    let l: number = 1;

    // Loop to look for repeats
    while (existing) {

      existing = false;

      // Get the mini hash of the current length
      const mini: string = s.substring(0, l);

      // Check if the mini hash already exist in the existing mini hashes
      if (existingMiniHashes.indexOf(mini) > -1) {

        existing = true;
        l += 1;

      } else {

        // If not existing, add the new minihash to the output and to the
        // existing mini hashes to avoid further crashes
        newMiniHashes.push(mini);
        existingMiniHashes.push(mini);

      }

    }

  }

  // Check if the existing mini hashes must be included
  return includeExisting ? existingMiniHashes : newMiniHashes;

}

/**
*
* Returns a sha256 hash, optionally taking into account a time
* seed to improve uniqueness.
*
* @param seed      The seed to produce the sha256.
* @param time      Boolean to add Date.now() to improve uniqueness.
* @returns         The sha256.
*
*/
export function sha256(seed: string, time: boolean = false): string {

  const mdi: md.MessageDigest = md.sha256.create();

  if (time) {

    seed = `${seed}${Date.now()}`;

  }

  mdi.update(seed);

  return mdi.digest().toHex();

}

}
