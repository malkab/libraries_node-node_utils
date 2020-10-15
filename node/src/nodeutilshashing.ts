import { md } from "node-forge";

import uid from "uid-generator";

import { hashSync as bcryptHash } from "bcryptjs";

export namespace NodeUtilsHashing {

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
   * Returns minihashes of the specified target lenght for a set of seeds.
   *
   */
  export function miniHash(
    seeds: string[],
    existingSeeds: string[] = [],
    time: boolean = false
  ): string[] {

    for (const x of seeds) {

      const s: string = sha256(x, time);

      let existing: boolean = true;

      let l: number = 1;

      while (existing) {

        existing = false;

        const mini: string = s.substring(0, l);

        if (existingSeeds.indexOf(mini) > -1) {

          existing = true;
          l += 1;

        } else {

          existingSeeds.push(mini);

        }

      }

    }

    return existingSeeds;

  }

  /**
   *
   * Returns a sha256 hash, optionally taking into account a time
   * seed to improve uniqueness.
   *
   */
  export function sha256(seed: string, time?: boolean): string {

    const mdi: md.MessageDigest = md.sha256.create();

    if (time) {

      seed = `${seed}${Date.now()}`;

    }

    mdi.update(seed);

    return mdi.digest().toHex();

  }

}
