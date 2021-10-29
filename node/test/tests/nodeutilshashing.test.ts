import "mocha";

import { expect } from "chai";

import { sha256, miniHash } from "../../src/index";

/**
 *
 * NodeUtilsHashing.
 *
 */
describe("nodeutilshashing tests", function() {

  it("hash, no time", function() {

    const h0: string = sha256("hello");

    const h1: string = sha256("hello");

    expect(h0)
    .to.equal("2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824");

    expect(h0)
    .to.equal(h1);

  });

  it("hash, time", function() {

    const h0: string = sha256("hello", true);

    setTimeout(
      () => {

        const h1: string = sha256("hello", true);

        expect(h0)
        .not.to.equal(h1);

      },

      10

    );

  });

  it("miniHash, simple", function() {

    expect(miniHash({
      values: [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
        "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
      ]
    }))
    .to.deep.equal([

      "c", "3", "2", "1", "3f", "25", "cd", "a", "d", "18", "8", "ac", "6", "1b", "65", "14", "8e", "4", "0", "e", "0b", "4c", "5", "2d", "a1", "59"

    ]);

  });

  it("miniHash, existing keys", function() {

    expect(miniHash({
      values: [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
        "w", "x", "y", "z"
      ],
      existingMiniHashes: [
        "c", "3", "2", "1", "3f", "25", "cd", "a", "d", "18",
        "8", "ac", "6", "1b", "65", "14", "8e", "4", "0", "e",
        "0b", "4c", "5", "2d", "a1", "59"
      ],
      includeExisting: true
    }))
    .to.deep.equal([
      "c", "3", "2", "1", "3f", "25", "cd", "a", "d", "18", "8", "ac", "6",
      "1b", "65", "14", "8e", "4", "0", "e", "0b", "4c", "5", "2d", "a1", "59",
      "ca", "3e", "2e", "18a", "3f7", "252", "cd0", "aa", "de", "189", "82",
      "aca", "62", "1b1", "65c", "148", "8e3", "45", "04", "e3", "0bf", "4c9",
      "50", "2d7", "a1f", "594"
    ]);

  });

  it("miniHash, existing keys, time seed", function() {

    expect(miniHash({
      values: [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
        "w", "x", "y", "z"
      ],
      existingMiniHashes: [
        "c", "3", "2", "1", "3f", "25", "cd", "a", "d", "18",
        "8", "ac", "6", "1b", "65", "14", "8e", "4", "0", "e",
        "0b", "4c", "5", "2d", "a1", "59"
      ],
      includeExisting: false
    }))
    .to.not.deep.equal([

      "c", "3", "2", "1", "3f", "25", "cd", "a", "d", "18", "8",
      "ac", "6", "1b", "65", "14", "8e", "4", "0", "e", "0b",
      "4c", "5", "2d", "a1", "59", "ca", "3e", "2e", "18a", "3f7",
      "252", "cd0", "aa", "de", "189", "82", "aca", "62", "1b1",
      "65c", "148", "8e3", "45", "04", "e3", "0bf", "4c9", "50",
      "2d7", "a1f", "594"

    ]);

  });

});
