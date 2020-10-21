import "mocha";

import "webpack";

console.log(`

--------------------------

Mocha testing

--------------------------

`);

describe("node-utils Tests", () => {
  // require("./tests/node-utils-getfoldersize.test")
  // require("./tests/node-utils-readjson.test"),
  // require("./tests/node-utils-system.test"),
  // require("./tests/ts-utils-docker.test")
  require("./tests/nodeutilsfiles.test")
});
