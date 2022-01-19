import * as path from "path";

import * as rx from "rxjs";

import * as fs from 'fs-extra';

export module json {

/**
*
* Reads a JSON asynchronously.
*
* @param   filePathName      The path of the file to be written
*                            inside the folder of FEE.
* @param   json              The JSON to write.
* @param   beautifySpaces    Set different to null to output
*                            a beautiful JSON.
*
*/
export function readJson$(
  filePath: string[],
  { encoding = "utf8" }: { encoding?: string } = {}
): rx.Observable<any> {

  const p: string = path.join(...filePath);
  return rx.from(fs.readJSON(p, { encoding: encoding }));

}

/**
*
* Reads a JSON file synchronously.
*
*/
export function readJsonSync(
  filePath: string[],
  { encoding = "utf8" }: { encoding?: string } = {}
): any {

  const p: string = path.join(...filePath);
  return fs.readJSONSync(p, { encoding: encoding });

}

/**
*
* Writes a JSON to file.
*
* @param   filePathName      The path of the file to be written
*                            inside the folder of FEE.
* @param   json              The JSON to write.
* @param   beautifySpaces    Set different to null to output
*                            a beautiful JSON.
*
*/
export function writeJson$(
  filePath: string[],
  json: any,
  {
    encoding = "utf8",
    spaces
  }: {
    encoding?: string;
    spaces?: number;
  } = {}
): rx.Observable<void> {

  const p: string = path.join(...filePath);

  return rx.from(fs.writeJSON(p, json,
    { encoding: encoding, spaces: spaces }));

}

/**
*
* Writes a JSON to file.
*
* @param   filePathName      The path of the file to be written
*                            inside the folder of FEE.
* @param   json              The JSON to write.
*
*/
export function writeJsonSync(
  filePath: string[],
  json: any,
  {
    encoding = "utf8",
    spaces
  }: {
    encoding?: string;
    spaces?: number;
  } = {}
): void {

  const p: string = path.join(...filePath);

  return fs.writeJSONSync(p, json,
    { encoding: encoding, spaces: spaces });

}

}
