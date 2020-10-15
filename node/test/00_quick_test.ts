// This is a quick-and-dirty test file

// Proper testing must be done with Mocha

console.log(`

---------------------------

Quick Test

---------------------------

`);

import { NodeUtilsFiles } from "../src/index";

console.log("D:",
  NodeUtilsFiles.readCsvSync(
    [ "/assets/csv_test.csv" ],
    { header: true }
  )
);

// NodeUtilsFiles.readCsv$([ "/assets/csv_test.csv" ], { header: true })
// .subscribe(

//   (o: any) => console.log("D: next", o),

//   (error: Error) => console.log("D: error", error),

//   () => console.log("D: completed")

// )

const d: any = [ { a: 34, b: 6 }, { a: 1, b: 5, n: 1 }];

NodeUtilsFiles.writeCsvSync([ "/caca.csv" ], d, { delimiter: ";" });
