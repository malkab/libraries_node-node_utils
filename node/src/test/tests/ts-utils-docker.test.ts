import "mocha";

import { expect } from "chai";

import { TsUtilsDocker as docker } from "../../lib/index";



describe("dockerInfo", function() {

  it("dockerInfo", function() {

    expect(docker.dockerInfo().hostname, "dockerInfo hostname")
      .is.equal("ts_util_dev");

    expect(docker.dockerInfo().containerid.length, "dockerInfo hostname")
      .is.equal(64);

  })

});
