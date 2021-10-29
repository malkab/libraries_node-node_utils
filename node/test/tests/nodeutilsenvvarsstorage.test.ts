import "mocha";

import { expect } from "chai";

import { EnvVarsStorage } from "../../src/index";

/**
 *
 * Node Utils Docker.
 *
 */
describe("dockerInfo", function() {

  it("dockerInfo", function() {

    const e: EnvVarsStorage = new EnvVarsStorage("NODE_MEMORY");

    expect(e.e.NODE_MEMORY, "NODE_MEMORY env var")
      .is.equal("2GB");

  })

});
