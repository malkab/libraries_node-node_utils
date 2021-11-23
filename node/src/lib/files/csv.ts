import * as path from "path";

import * as rx from "rxjs";

import * as rxo from "rxjs/operators";

import * as papaparse from "papaparse";

import * as fs from 'fs-extra';

import { writeTxtSync,writeTxt$ } from "./txt";

/**
 *
 * Read a CSV with Papaparse. Check papaparse options at the papaparse page.
 *
 */
export function readCsvSync(filePath: string[], {
  encoding = <BufferEncoding>"utf8",
  delimiter,
  newline = "\n",
  quoteChar,
  escapeChar,
  header,
  transformHeader,
  dynamicTyping,
  preview,
  comments,
  complete,
  step,
  skipEmptyLines,
  fastMode,
  beforeFirstChunk,
  transform,
  delimitersToGuess,
}: {
  encoding?: BufferEncoding;
  delimiter?: string;
  newline?: any;
  quoteChar?: string;
  escapeChar?: string;
  header?: boolean;
  transformHeader?: (x: any) => any;
  dynamicTyping?: boolean;
  preview?: number;
  comments?: string;
  complete?: (x: any) => any;
  step?: (x: any) => any;
  skipEmptyLines?: boolean;
  fastMode?: boolean;
  beforeFirstChunk?: (x: any) => any;
  transform?: (x: any) => any;
  delimitersToGuess?: string[];
} = {
  encoding: <BufferEncoding>"utf8",
  newline: "\n"
}): any {

  const p: string = path.join(...filePath);

  const f: any = fs.readFileSync(p, { encoding: encoding })

  return papaparse.parse(f, {
    delimiter: delimiter,
    newline: newline,
    quoteChar: quoteChar,
    escapeChar: escapeChar,
    header: header,
    transformHeader: transformHeader,
    dynamicTyping: dynamicTyping,
    preview: preview,
    comments: comments,
    complete: complete,
    step: step,
    skipEmptyLines: skipEmptyLines,
    fastMode: fastMode,
    beforeFirstChunk: beforeFirstChunk,
    transform: transform,
    delimitersToGuess: delimitersToGuess
  })

}

/**
*
* Read a CSV with Papaparse. Check papaparse options at the papaparse page.
*
*/
export function readCsv$(filePath: string[], {
  encoding = <BufferEncoding>"utf8",
  delimiter,
  newline = "\n",
  quoteChar,
  escapeChar,
  header,
  transformHeader,
  dynamicTyping,
  preview,
  comments,
  complete,
  step,
  skipEmptyLines,
  fastMode,
  beforeFirstChunk,
  transform,
  delimitersToGuess
}: {
  encoding?: any;
  delimiter?: string;
  newline?: any;
  quoteChar?: string;
  escapeChar?: string;
  header?: boolean;
  transformHeader?: (x: any) => any;
  dynamicTyping?: boolean;
  preview?: number;
  comments?: string;
  complete?: (x: any) => any;
  step?: (x: any) => any;
  skipEmptyLines?: boolean;
  fastMode?: boolean;
  beforeFirstChunk?: (x: any) => any;
  transform?: (x: any) => any;
  delimitersToGuess?: string[];
} = {
  encoding: <BufferEncoding>"utf8",
  newline: "\n"
}): rx.Observable<any> {

const p: string = path.join(...filePath);

return rx.from(fs.readFile(p, { encoding: encoding }))
.pipe(

  rxo.map((o: any): any => {

    return papaparse.parse(o, {
      delimiter: delimiter,
      newline: newline,
      quoteChar: quoteChar,
      escapeChar: escapeChar,
      header: header,
      transformHeader: transformHeader,
      dynamicTyping: dynamicTyping,
      preview: preview,
      comments: comments,
      complete: complete,
      step: step,
      skipEmptyLines: skipEmptyLines,
      fastMode: fastMode,
      beforeFirstChunk: beforeFirstChunk,
      transform: transform,
      delimitersToGuess: delimitersToGuess
    })

  })

)

}

/**
*
* Read a CSV with Papaparse. Check papaparse options at the papaparse page.
*
*/
export function writeCsvSync(filePath: string[], data: any, {
  encoding = <BufferEncoding>"utf8",
  delimiter,
  quotes,
  quoteChar,
  escapeChar,
  header,
  newline,
  skipEmptyLines,
  columns
}: {
  encoding?: BufferEncoding;
  delimiter?: string;
  quotes?: boolean | boolean[];
  quoteChar?: string;
  escapeChar?: string;
  header?: boolean;
  newline?: string;
  skipEmptyLines?: boolean;
  columns?: undefined | string[];
} = {}): any {

  const f: string = papaparse.unparse(data, {
    delimiter: delimiter,
    quotes: quotes,
    quoteChar: quoteChar,
    escapeChar: escapeChar,
    header: header,
    newline: newline,
    skipEmptyLines: skipEmptyLines,
    columns: columns
  })

  writeTxtSync(filePath, f, { encoding: encoding });

}

/**
 *
 * Write a JSON to a CSV file. Check papaparse options at the papaparse page.
 *
 * @param     file    The path of the file to be written.
 * @param     data    The JSON to be written.
 * @param     config  papaparse options to write the file.
 * @returns           The path of the file written as a string.
 *
 */
 export function writeJsonAsCsv$(file: string[], data: any, {
  encoding = <BufferEncoding>"utf8",
  delimiter,
  quotes,
  quoteChar,
  escapeChar,
  header,
  newline,
  skipEmptyLines,
  columns
}: {
  encoding?: BufferEncoding;
  delimiter?: string;
  quotes?: boolean | boolean[];
  quoteChar?: string;
  escapeChar?: string;
  header?: boolean;
  newline?: string;
  skipEmptyLines?: boolean;
  columns?: undefined | string[];
} = {}): rx.Observable<string> {

  const f: string = papaparse.unparse(data, {
    delimiter: delimiter,
    quotes: quotes,
    quoteChar: quoteChar,
    escapeChar: escapeChar,
    header: header,
    newline: newline,
    skipEmptyLines: skipEmptyLines,
    columns: columns
  })

  return writeTxt$(file, f, { encoding: encoding });

}
