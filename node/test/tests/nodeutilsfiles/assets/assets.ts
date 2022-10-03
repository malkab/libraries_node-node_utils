import { existsSync, mkdirSync, rmSync } from "fs";

import * as path from "path";

/**
*
* Export folders.
*
*/
export const exportFolder: string[] = [ "test", "tests", "nodeutilsfiles",
  "900_out" ];

/**
*
* Create output folder.
*
*/
if (existsSync(path.join(...exportFolder)))
  rmSync(path.join(...exportFolder), { recursive: true });
if (!existsSync(path.join(...exportFolder)))
  mkdirSync(path.join(...exportFolder));
