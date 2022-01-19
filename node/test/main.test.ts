console.log(`

--------------------------

Mocha testing

--------------------------

`);

// Add test suites here
describe("node-utils", () => {

  // describe("\n\n  --- nodeutilsdocker.test ---\n",
  //   () => require("./tests/nodeutilsdocker.test"));

  // describe("\n\n  --- nodeutilshashing.test ---\n",
  //   () => require("./tests/nodeutilshashing.test"));

  // describe("\n\n  --- nodeutilsaxios.test ---\n",
  //   () => require("./tests/nodeutilsaxios.test"));

  // describe("\n\n  --- nodeutilsenvvarsstorage.test ---\n",
  //   () => require("./tests/nodeutilsenvvarsstorage.test"));

  describe("\n\n  --- nodeutilsfiles.test ---\n",
    () => require("./tests/nodeutilsfiles/nodeutilsfiles.test"));

});
