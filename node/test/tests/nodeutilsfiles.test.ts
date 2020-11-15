import { rxMochaTests } from "@malkab/ts-utils";

import { deleteFolderSync, deleteFolderContentSync, getFolderContentSync, copy$, getFolderContent$, deleteFolderContent$, deleteFolder$, copySync } from "../../src/index";

import { expect } from "chai";

/**
 *
 * NodeUtilsFiles tests.
 *
 */

/**
 *
 * Copy folder assets to assets_copy for do tests.
 *
 */
describe("Test copy$", function() {

  rxMochaTests({

    testCaseName: "Test copy$",

    observables: [

      copy$([ "./test/assets" ], [ "./test/assets_copy" ]),
      // This is an error, that's why is left the last
      copy$([ "../../assets" ], [ "../../assets_copy" ])

    ],

    assertions: [

      (o: any) => expect(o).to.be.equal("test/assets_copy"),
      // Thrown errors by observables aren't detected as errors by
      // Mocha and are tested like regular objects
      (o: any) => expect(o.errno).to.be.equal(-2)

    ],

    verbose: false

  })

})

/**
 *
 * Test getFolderContent$.
 *
 */
describe("Test getFolderContent$", function() {

  rxMochaTests({

    testCaseName: "Test getFolderContent$",

    observables: [ getFolderContent$([ "./test/assets_copy" ]) ],

    assertions: [

      (o: any) => expect(o).to.be.deep.equal(
        [ 'csv_test.csv', 'test_folder_a', 'test_folder_b' ])

    ]

  })

})

/**
 *
 * Test deleteFolderContent$.
 *
 */
describe("Test deleteFolderContent$", function() {

  rxMochaTests({

    testCaseName: "Test deleteFolderContent$",

    observables: [ deleteFolderContent$([ "./test/assets_copy" ]) ],

    assertions: [

      (o: any) => expect(o).to.be.true

    ]

  })

})

/**
 *
 * Test deleteFolder$.
 *
 */
describe("Test deleteFolder$", function() {

  rxMochaTests({

    testCaseName: "Test deleteFolder$",

    observables: [ deleteFolder$([ "./test/assets_copy" ]) ],

    assertions: [

      (o: any) => expect(o).to.be.true

    ]

  })

})

/**
 *
 * Copy folder assets to assets_copy for do tests, async.
 *
 */
describe("Test copySync", function() {

  it("Test copySync failing", function() {

    // Thrown errors must be checked this way, by adding a function to expect
    expect(() => copySync([ "../../assets" ], [ "../../assets_copy" ]))
      .to.throw("ENOENT: no such file or directory, stat \'../../assets\'");

  });

  it("Test copySync", function() {

    expect(copySync([ "./test/assets" ], [ "./test/assets_copy" ]))
      .to.be.undefined;

  });

})

/**
 *
 * Test getFolderContentSync.
 *
 */
describe("Test getFolderContentSync", function() {

  it("Test getFolderContentSync", function() {

    expect(getFolderContentSync([ "./test/assets_copy" ]))
      .to.be.deep.equal([ 'csv_test.csv', 'test_folder_a', 'test_folder_b' ]);

  });

})

/**
 *
 * Test deleteFolderContentSync.
 *
 */
describe("Test deleteFolderContentSync", function() {

  it("Test deleteFolderContentSync", function() {

    expect(deleteFolderContentSync([ "./test/assets_copy" ]))
      .to.be.true;

  });

})

/**
 *
 * Test deleteFolderSync.
 *
 */
describe("Test deleteFolderSync", function() {

  it("Test deleteFolderSync", function() {

    expect(deleteFolderSync([ "./test/assets_copy" ]))
      .to.be.true;

  });

})
