// This is a quick-and-dirty test file

// Proper testing must be done with Mocha

console.log(`

---------------------------

Quick Test

---------------------------

`);

import * as u from "../../lib/index";

console.log("D: 000", u.NodeUtilsSystemStatus.nodeMemoryUsage());

console.log("D: 010", u.NodeUtilsSystemStatus.nodeMemoryUsageReport());

console.log("D: 020", u.NodeUtilsSystemStatus.systemMemoryUsage());

console.log("D: 030", u.NodeUtilsSystemStatus.systemMemoryUsageReport());

console.log("D: 040", u.NodeUtilsSystemStatus.cpuReport());
