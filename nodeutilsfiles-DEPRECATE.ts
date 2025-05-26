import * as path from "path";

import * as rx from "rxjs";

import * as rxo from "rxjs/operators";

import * as child_process from "child_process";

import getFolderSizeFunction from "get-folder-size";

import * as papaparse from "papaparse";

import * as fs from "fs-extra";

import {
    writeFileSync,
    readFileSync as rfs,
    unlinkSync,
    rmSync,
    readdirSync
} from "fs";

/**
 *
 * Filesystem's utils.
 *
 */

/**
 *
 * Writes a TXT to file.
 *
 * @param filePathName        The path of the file to be written
 *                            inside the folder of FEE.
 * @param json                The JSON to write.
 * @returns                   The final path of the file written, as a string.
 *
 */
export function writeTxt$(
  filePath: string[],
  txt: any,
  { encoding = "utf8" }: { encoding?: BufferEncoding; } = {}
): rx.Observable<void> {
    return rx.from(fs.writeFile(path.join(...filePath), txt, { encoding: encoding }))
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
export function writeTxtSync(
  filePath: string[],
  txt: string,
  { encoding = "utf8" }: { encoding?: BufferEncoding; } = {}
): void {

  const p: string = path.join(...filePath);

  writeFileSync(p, txt, { encoding: encoding });

}

/**
 *
 * Reads a JSON file.
 *
 */
export function readJsonSync(
  filePath: string[],
  { encoding = "utf8" }: { encoding?: BufferEncoding } = {}
): any {

  const p: string = path.join(...filePath);

  const fileContent: string = rfs(p, { encoding: encoding });

  return JSON.parse(fileContent);

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
    encoding?: BufferEncoding;
    spaces?: number;
  } = {}
): rx.Observable<void> {

    const p: string = path.join(...filePath);

    // Convert the JSON to a string
    const jsonS: string = JSON.stringify(json, null, spaces);

    return rx.from(fs.writeFile(p, jsonS,
        { encoding: encoding }));

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
    encoding?: BufferEncoding;
    spaces?: number;
  } = {}
): void {

    const p: string = path.join(...filePath);

    // Convert the JSON to a string
    const jsonS: string = JSON.stringify(json, null, spaces);

    return writeFileSync(p, json,
        { encoding: encoding });

}

/**
 *
 * Read a CSV with Papaparse. Check papaparse options at the papaparse page.
 *
 */
export function readCsvSync(filePath: string[], options: any): any {
  const p: string = path.join(...filePath);
  const f: any = rfs(p, { encoding: options.encoding || "utf8" })
  return papaparse.parse(f, <papaparse.ParseConfig>options)
}

/**
 *
 * Read a CSV with Papaparse. Check papaparse options at the papaparse page.
 *
 */
export function readCsv$(filePath: string[], {
    encoding = <BufferEncoding>"utf8",
    delimiter,
    newline,
    quoteChar,
    escapeChar,
    header,
    transformHeader,
    dynamicTyping,
    preview,
    worker,
    comments,
    complete,
    step,
    error,
    download,
    downloadRequestHeaders,
    skipEmptyLines,
    chunk,
    chunkSize,
    fastMode,
    beforeFirstChunk,
    withCredentials,
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
    worker?: boolean;
    comments?: string;
    complete?: (x: any) => any;
    step?: (x: any) => any;
    error?: (x: papaparse.ParseError, f: any) => any;
    download?: boolean;
    downloadRequestHeaders?: any;
    skipEmptyLines?: boolean;
    chunk?: (x: any) => any;
    chunkSize?: any;
    fastMode?: boolean;
    beforeFirstChunk?: (x: any) => any;
    withCredentials?: boolean;
    transform?: (x: any) => any;
    delimitersToGuess?: any;
}): rx.Observable<any> {

  const p: string = path.join(...filePath);

  return rx.from(fs.readFile(p, { encoding: encoding }))
  .pipe(

    rxo.map((o: any): any => {

      return papaparse.parse(o, <papaparse.ParseConfig>{
        encoding: encoding,
        delimiter: delimiter,
        newline: newline,
        quoteChar: quoteChar,
        escapeChar: escapeChar,
        header: header,
        transformHeader: transformHeader,
        dynamicTyping: dynamicTyping,
        preview: preview,
        worker: worker,
        comments: comments,
        complete: complete,
        step: step,
        error: error,
        download: download,
        downloadRequestHeaders: downloadRequestHeaders,
        skipEmptyLines: skipEmptyLines,
        chunk: chunk,
        chunkSize: chunkSize,
        fastMode: fastMode,
        beforeFirstChunk: beforeFirstChunk,
        withCredentials: withCredentials,
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
 * Read a CSV with Papaparse. Check papaparse options at the papaparse page.
 *
 * @returns           The path of the file written as a string.
 *
 */
export function writeCsv$(file: string[], data: any, {
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
  return writeTxt$(file, f, { encoding: encoding }).pipe(
    rxo.map(() => path.join(...file))
  );
}
