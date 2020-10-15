// This is a quick-and-dirty test file

// Proper testing must be done with Mocha

console.log(`

---------------------------

Quick Test

---------------------------

`);

import * as u from "../../src/index";

u.NodeUtilsFiles.getFolderSize("/ext_src")
.subscribe(

  (o: number) => console.log("D: next", o),

  (error: Error) => console.log("D: error", error),

  () => console.log("D: completed")

)



u.NodeUtilsFiles.getFolderSizeReport("/ext_src", "/bin", "/etc")
.subscribe(

  (o: number[]) => console.log("D: next", o),

  (error: Error) => console.log("D: error", error),

  () => console.log("D: completed")

)
