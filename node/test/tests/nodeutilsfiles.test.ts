import { rxMochaTests } from "@malkab/ts-utils";

import { NodeUtilsFiles as f } from "../../src/index";

import { expect, assert } from "chai";

import * as rx from "rxjs";

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

    observable: rx.concat(

      f.copy$([ "./test/assets" ], [ "./test/assets_copy" ]),
      // This is an error, that's why is left the last
      f.copy$([ "../../assets" ], [ "../../assets_copy" ])

    ),

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

    observable: f.getFolderContent$([ "./test/assets_copy" ]),

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

    observable: f.deleteFolderContent$([ "./test/assets_copy" ]),

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

    observable: f.deleteFolder$([ "./test/assets_copy" ]),

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
    expect(() => f.copySync([ "../../assets" ], [ "../../assets_copy" ]))
      .to.throw("ENOENT: no such file or directory, stat \'../../assets\'");

  });

  it("Test copySync", function() {

    expect(f.copySync([ "./test/assets" ], [ "./test/assets_copy" ]))
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

    expect(f.getFolderContentSync([ "./test/assets_copy" ]))
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

    expect(f.deleteFolderContentSync([ "./test/assets_copy" ]))
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

    expect(f.deleteFolderSync([ "./test/assets_copy" ]))
      .to.be.true;

  });

})
