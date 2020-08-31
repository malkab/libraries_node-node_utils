// This is a quick-and-dirty test file

// Proper testing must be done with Mocha

console.log(`

---------------------------

Quick Test

---------------------------

`);

import { NodeUtilsFiles } from "../../lib/index";

NodeUtilsFiles.readJson$(".", "package.json").subscribe(

  (x: any) => console.log("D: next", x),

  (error: any) => console.log("D: error", error),

  () => console.log("D: complete")

)
