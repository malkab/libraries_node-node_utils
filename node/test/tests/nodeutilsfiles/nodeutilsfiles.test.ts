import { rxMochaTests } from "@malkab/ts-utils";

import { deleteFolderSync, deleteFolderContentSync, getFolderContentSync, copy$,
  getFolderContent$, deleteFolderContent$, deleteFolder$, copySync, readYaml$,
  readYamlSync, writeYamlSync, writeYaml$} from "../../../src/index";

import { expect } from "chai";

import * as rxo from "rxjs/operators";

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

      copy$([ "test", "tests", "nodeutilsfiles", "assets" ],
        [ "test", "tests", "nodeutilsfiles", "assets_copy" ]),
      // This is an error, that's why is left the last
      copy$([ "../../assets" ], [ "../../assets_copy" ])

    ],

    assertions: [

      (o: any) =>
        expect(o).to.be.equal("test/tests/nodeutilsfiles/assets_copy"),
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

    observables: [ getFolderContent$([ "test", "tests",
      "nodeutilsfiles", "assets_copy" ]) ],

    assertions: [

      (o: any) => expect(o).to.be.deep.equal(
        [ 'csv_test.csv', "outputs", 'test_folder_a', 'test_folder_b', 'yaml.yaml' ])

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

    observables: [ deleteFolderContent$(
      [ "test", "tests", "nodeutilsfiles", "assets_copy" ]) ],

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

    observables: [ deleteFolder$(
      [ "test", "tests", "nodeutilsfiles", "assets_copy" ]) ],

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
      .to.throw("ENOENT: no such file or directory, lstat \'../../assets\'");

  });

  it("Test copySync", function() {

    expect(copySync([ "test", "tests", "nodeutilsfiles", "assets" ],
      [ "test", "tests", "nodeutilsfiles", "assets_copy" ])).to.be.undefined;

  });

})

/**
 *
 * Test getFolderContentSync.
 *
 */
describe("Test getFolderContentSync", function() {

  it("Test getFolderContentSync", function() {

    expect(getFolderContentSync(
      [ "test", "tests", "nodeutilsfiles", "assets_copy" ]))
      .to.be.deep.equal([ 'csv_test.csv', "outputs", 'test_folder_a',
      'test_folder_b', 'yaml.yaml' ]);

  });

})

/**
 *
 * Test deleteFolderContentSync.
 *
 */
describe("Test deleteFolderContentSync", function() {

  it("Test deleteFolderContentSync", function() {

    expect(deleteFolderContentSync(
      [ "test", "tests", "nodeutilsfiles", "assets_copy" ])).to.be.true;

  });

})

/**
 *
 * Test deleteFolderSync.
 *
 */
describe("Test deleteFolderSync", function() {

  it("Test deleteFolderSync", function() {

    expect(deleteFolderSync(
      [ "test", "tests", "nodeutilsfiles", "assets_copy" ])).to.be.true;

  });

})

/**
 *
 * Test readYaml$.
 *
 */
describe("Test readYaml$", function() {

  rxMochaTests({

    testCaseName: "Test readYaml$",

    observables: [ readYaml$(
      [ "test", "tests", "nodeutilsfiles", "assets", "yaml.yaml" ]) ],

    assertions: [

      (o: any) => expect(o.ssh["kepler-remote"].host)
        .to.be.equal("the_default_host")

    ],

    verbose: false

  })

})

/**
 *
 * Test writeYaml$.
 *
 */
 describe("Test writeYaml$", function() {

  rxMochaTests({

    testCaseName: "Test writeYaml$",

    observables: [

      readYaml$(
        [ "test", "tests", "nodeutilsfiles", "assets", "yaml.yaml" ]
      ).pipe(

        rxo.concatMap((object: any) => {

          return writeYaml$(
            [ "test", "tests", "nodeutilsfiles", "assets", "outputs", "yaml2.yaml" ],
            object)

        })

      )

    ],

    assertions: [

      (o: any) => expect(o).to.be.equal(
        "test/tests/nodeutilsfiles/assets/outputs/yaml2.yaml")

    ],

    verbose: false

  })

})

/**
 *
 * Test readYamlSync.
 *
 */
describe("Test readYamlSync", function() {

  it("Test readYamlSync", function() {

    expect(readYamlSync(
      [ "test", "tests", "nodeutilsfiles", "assets", "yaml.yaml" ])
      .ssh["kepler-remote"].host).to.be.equal("the_default_host");

  });

})

/**
 *
 * Test writeYamlSync.
 *
 */
 describe("Test writeYamlSync", function() {

  it("Test writeYamlSync", function() {

    const a: any = readYamlSync(
      [ "test", "tests", "nodeutilsfiles", "assets", "yaml.yaml" ]);

    const b: string = writeYamlSync(
      [ "test", "tests", "nodeutilsfiles", "assets", "outputs", "yaml.yaml" ],
      a);

    expect(b).to.be.equal(
      "test/tests/nodeutilsfiles/assets/outputs/yaml.yaml");

  });

})
