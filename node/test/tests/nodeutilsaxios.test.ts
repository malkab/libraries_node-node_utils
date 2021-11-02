import "mocha";

import { expect } from "chai";

import { rxMochaTests } from "@malkab/ts-utils";

import { axiosSaveFile$ } from "../../src/index";

/**
 *
 * Axios Observables tests.
 *
 */
describe("axiosSaveFile, no host", function() {

  rxMochaTests({

    testCaseName: "axiosSaveFilem, no host",

    observables: [ axiosSaveFile$({
      url: "http://www.juntadeanda33lucia.es/medioambiente/mapwms/REDIAM_Ortofoto_Sierra_Maria_2010?LAYERS=orto_sierra_maria_2010&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&FORMAT=image%2Fpng&SRS=EPSG%3A23030&BBOX=575353.16956903,4186945.0356209,575573.88705739,4187165.7531093&WIDTH=256&HEIGHT=256",
      filePath: [ "orto.png" ]
    }) ],

    assertions: [

      (o: any) => {

        expect(o.status).to.be.equal(-3008);
        expect(o.statusText).to.be.equal("ENOTFOUND");

      }

    ],

    verbose: false

  })

});

describe("axiosSaveFile", function() {

  rxMochaTests({

    testCaseName: "axiosSaveFile",

    observables: [ axiosSaveFile$({
      url: "http://www.juntadeandalucia.es/medioambiente/mapwms/REDIAM_Ortofoto_Sierra_Maria_2010?LAYERS=orto_sierra_maria_2010&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&FORMAT=image%2Fpng&SRS=EPSG%3A23030&BBOX=575353.16956903,4186945.0356209,575573.88705739,4187165.7531093&WIDTH=256&HEIGHT=256",
      filePath: [ "orto.png" ]
    }) ],

    assertions: [

      (o: any) => expect(o.status).to.be.equal(200)

    ],

    verbose: false

  })

});
