import "mocha";

import { expect } from "chai";

import { dockerInfo } from "../../src/index";

/**
 *
 * Node Utils Docker.
 *
 */
describe("dockerInfo", function() {

  it("dockerInfo", function() {

    expect(dockerInfo().hostname, "dockerInfo hostname")
      .is.equal("node_utils_dev_");

    expect(dockerInfo().containerid.length, "dockerInfo hostname")
      .is.equal(64);

  })

});
