import * as path from "path";

import * as rx from "rxjs";

import * as rxo from "rxjs/operators";

import * as child_process from "child_process";

import roundTo from "round-to";

import getFolderSizeFunction from "get-folder-size";

import * as papaparse from "papaparse";

import * as fs from 'fs-extra';

import { ObjectEncodingOptions } from 'fs-extra';

/**
 *
 * Filesystem's utils.
 *
 */

/**
 *
 * Writes a string to file asynchroneously.
 *
 * @param filePathName        The path of the file to be written inside the
 *                            folder of FEE.
 * @param txt                 The string to write.
 * @param config              Optional. The encoding to write to.
 * @returns                   An observable with the final path of the file
 *                            written, as a string.
 *
 */
export function writeTxt$(filePath: string[], txt: any,
  { encoding = "utf8" }: { encoding?: fs.ObjectEncodingOptions["encoding"]; } = {}
): rx.Observable<string> {

  return new rx.Observable<string>((o: any) => {

    const p: string = path.join(...filePath);

    fs.writeFile(p, txt, { encoding: encoding }, (err: any) => {

      if (err) {

        o.error(err);

      } else {

        o.next(p);
        o.complete();

      }

    });

  });

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
  { encoding = "utf8" }: { encoding?: fs.ObjectEncodingOptions["encoding"]; } = {}
): void {

  const p: string = path.join(...filePath);

  fs.writeFileSync(p, txt, { encoding: encoding });

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
export function readJson$(
  filePath: string[],
  { encoding = "utf8" }: { encoding?: string } = {}
): rx.Observable<any> {

  const p: string = path.join(...filePath);
  return rx.from(fs.readJSON(p, { encoding: encoding }));

}

/**
 *
 * Reads a JSON file.
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
 * Reads a file.
 *
 * @param   filePathName
 * The path of the file to be written inside the folder of FEE.
 * @param   json              The JSON to write.
 * @param   beautifySpaces    Set different to null to output
 *                            a beautiful JSON.
 *
 */
export function readFile$(
  filePath: string[],
  { encoding = "utf8" }: { encoding?: string } = {}
): rx.Observable<any> {

  const p: string = path.join(...filePath);
  return rx.from(fs.readFile(p, { encoding: encoding }));

}

/**
 *
 * Reads a file.
 *
 */
export function readFileSync(
  filePath: string[],
  { encoding = "utf8" }: { encoding?: ObjectEncodingOptions["encoding"] } = {}
): any {

  const p: string = path.join(...filePath);
  return fs.readFileSync(p, { encoding: encoding });

}

/**
 *
 * Reads a text file and return its lines.
 *
 * @param   filePathName
 * The path of the file to be written inside the folder of FEE.
 * @param   json              The JSON to write.
 * @param   beautifySpaces    Set different to null to output
 *                            a beautiful JSON.
 *
 */
export function readFileLines$(
  filePath: string[],
  {
    encoding = "utf8",
    cleanEmptyLines = true,
    trim = true
  }: {
    encoding?: string;
    cleanEmptyLines?: boolean;
    trim?: boolean;
  } = {}
): rx.Observable<string[]> {

  const p: string = path.join(...filePath);
  return rx.from(fs.readFile(p, { encoding: encoding }))
  .pipe(

    rxo.map((o: string) => {

      let out: string[] = o.split("\n");
      if (trim) { out = out.map((o: string) => o.trim()) };
      if (cleanEmptyLines) { out = out.filter((l: string) => l !== "") };
      return out;

    })

  );

}

/**
 *
 * Reads a text file and returns its lines.
 *
 */
export function readFileLinesSync(
  filePath: string[],
  {
    encoding = "utf8",
    cleanEmptyLines = true,
    trim = true
  }: {
    encoding?: ObjectEncodingOptions["encoding"];
    cleanEmptyLines?: boolean;
    trim?: boolean;
  } = {}
): string[] {

  const p: string = path.join(...filePath);
  const f: string = <string>fs.readFileSync(p, { encoding: encoding });
  let out: string[] = f.split("\n");
  if (trim) { out = out.map((o: string) => o.trim()) };
  if (cleanEmptyLines) { out = out.filter((l: string) => l !== "") };
  return out;

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

/**
 *
 * Deletes a file.
 *
 * @param filePath    The file path and name.
 *
 */
export function deleteFile$(filePath: string[]): rx.Observable<boolean> {

  return new rx.Observable<boolean>((o: any) => {

    const p: string = path.join(...filePath);

    fs.unlink(p, (err: any) => {

      if (err) {

        o.error(err);

      } else {

        o.next(true);
        o.complete();

      }

    });

  });

}

/**
 *
 * Deletes a file.
 *
 * @param filePath    The file path and name.
 *
 */
export function deleteFileSync(...filePath: string[]): void {

  const p: string = path.join(...filePath);

  fs.unlinkSync(p);

}

/**
 *
 * Deletes a folder.
 *
 * @param folderPath    The file path and name.
 *
 */
export function deleteFolder$(folderPath: string[]):
rx.Observable<boolean> {

  return new rx.Observable<boolean>((o: any) => {

    const p: string = path.join(...folderPath);

    fs.remove(p, (err: any) => {

      if (err) {

        o.error(err);

      } else {

        o.next(true);
        o.complete();

      }

    });

  });

}

/**
 *
 * Deletes a folder.
 *
 * @param folderPath    The file path and name.
 *
 */
export function deleteFolderSync(folderPath: string[]): boolean {

  const p: string = path.join(...folderPath);

  fs.removeSync(p);

  return true;

}

/**
 *
 * Check path and create folder if it isn't exists, sync version.
 *
 * @param folders         The series of folders to create.
 * @returns               The full path of the created folder, or
 *                        null if it exits.
 *
 */
export function mkdir$(...folders: string[]):
rx.Observable<string> {

  // Path
  const p: string = path.join(...folders);

  // Observable
  return new rx.Observable<string>((o: any) => {

    fs.mkdir(p, (err: any) => {

      if (err) {

        o.error(err);

      } else {

        o.next(p);
        o.complete();

      }

    })

  })

}

/**
 *
 * Check path and create folder if it isn't exists, sync version.
 *
 * @param folders         The series of folders to create.
 * @returns               The full path of the created folder, or
 *                        null if it exits.
 *
 */
export function mkdirSync(...folders: string[]): void {

  const p: string = path.join(...folders);

  fs.mkdirSync(p);

}

/**
 *
 * Duplicates a folder. Uses fs-extra.
 *
 */
export function copy$(origin: string[], destination: string[]):
rx.Observable<string> {

  return new rx.Observable<string>((o: any) => {

    const originP: string = path.join(...origin);
    const destinationP: string = path.join(...destination);

    fs.copy(originP, destinationP, (err: any) => {

      if (err) {

        o.error(err);

      } else {

        o.next(destinationP);
        o.complete();

      }

    });

  })

}

/**
 *
 * Duplicates a folder. Uses fs-extra.
 *
 */
export function copySync(origin: string[], destination: string[]): void {

  const originP: string = path.join(...origin);
  const destinationP: string = path.join(...destination);

  fs.copySync(originP, destinationP);

}

/**
 *
 * Runs a 7z command. Requires an installation of 7zip in the system / Docker
 * image. 7z can be a little bit tricky to get the desired result. To ZIP the
 * contents of a folder without zipping the folder path, use the following
 * recipe:
 *
 * ```shell
 * 7z a -tzip -r path/to/zip/file.zip ./folder/to/zip/*
 * ```
 *
 * Note the beginning "./" and the "*" in the folder to ZIP path. ZIP options
 * are:
 *
 * - zipOptions: any options to pass to 7z, like -tzip -r;
 * - dotPrefix:  add the "./" to the start of the folder to ZIP path. This has
 *               to be provided explicitly because path.join drops any "./"
 *               passed as a argument.
 *
 * @param         itemsToZip              A string with the path expression of
 *                                        the items to zip. This is the
 *                                        trickiest part. No path.join is used
 *                                        here because it makes too many
 *                                        assumptions that makes 7zip usage
 *                                        difficult. Use path.join externally if
 *                                        needed.
 * @param         zipFilePathName         Path of the zip file to be created,
 *                                        also a string.
 * @param         __namedParameters       Optional options: zipFile to true to
 *                                        generate a .zip file instead of a .7z
 *                                        and recursive for recursive zipping.
 *                                        defaults to empty string.
 * @returns                               An Observable that returns the final
 *                                        path of the zipped file.
 *
 */
export function zip$(
  itemsToZip: string,
  zipFilePathName: string,
  {
    zipFile,
    recursive
  }: {
    zipFile: boolean;
    recursive: boolean;
  } = {
    zipFile: false,
    recursive: false
  }
): rx.Observable<string> {

  return new rx.Observable<string>((o: any) => {

    // Process options
    const zipFileF: string = zipFile ? "-r" : "";
    const recursiveF: string = recursive ? "-tzip" : "";

    // Compose command
    const command: string =
      `7z a ${zipFileF} ${recursiveF} ${zipFilePathName} ${itemsToZip}`;

    child_process.exec(command, (err: any, stdout: any, stderr: any) => {

      if (err) {

        o.error(err);

      } else {

        o.next(zipFile ? `${zipFilePathName}.zip` : `${zipFilePathName}.7z`);
        o.complete();

      }

    })

  })

}

/**
 *
 * Calculates the size of a single folder in bytes.
 * Divide by 1024 twice to get megabytes.
 *
 */
export function getFolderSize(folder: string): rx.Observable<number> {

  return new rx.Observable<number>((o: any) => {

    getFolderSizeFunction(folder, { })
    .then((out: { size: number, errors: any }) => {

      if (out.errors) {

        o.error(out.errors);

      } else {

        o.next(out.size);
        o.complete();

      }

    })

  })

}

/**
 *
 * Outputs a report about the size of several folders, in different sizes, in
 * numerical and human readable form.
 *
 */
export function getFolderSizeReport(...folder: string[]): rx.Observable<any[]> {

  return rx.zip(
    ...folder.map((x: string) => {

      return getFolderSize(x);

    })
  )
  .pipe(

    rxo.map((o: number[]) => {

      let i: number = -1;

      return o.map((x: number) => {

        i += 1;

        return {
          folder: folder[i],
          sizeBytes: x,
          sizeBytesHuman: `${x} B`,
          sizeKBytes: roundTo(x / 1024, 2),
          sizeKBytesHuman: `${roundTo(x / 1024, 2)} KB`,
          sizeMBytes: roundTo(x / 1024 / 1024, 2),
          sizeMBytesHuman: `${roundTo(x / 1024 / 1024, 2)} MB`,
          sizeGBytes: roundTo(x / 1024 / 1024 / 1024, 2),
          sizeGBytesHuman: `${roundTo(x / 1024 / 1024 / 1024, 2)} GB`,
        }

      })

    })

  )

}

/**
 *
 * Read a CSV with Papaparse. Check papaparse options at the papaparse page.
 *
 */
export function readCsvSync(filePath: string[], {
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
    delimitersToGuess,
  }: {
    encoding?: BufferEncoding;
    delimiter?: string;
    newline?: string;
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
    delimitersToGuess?: papaparse.GuessableDelimiters[];
}): any {

  const p: string = path.join(...filePath);

  const f: any = fs.readFileSync(p, { encoding: encoding })

  return papaparse.parse(f, {
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
    delimitersToGuess,
  }: {
    encoding?: BufferEncoding;
    delimiter?: string;
    newline?: string;
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
    delimitersToGuess?: papaparse.GuessableDelimiters[];
}): rx.Observable<any> {

  const p: string = path.join(...filePath);

  return rx.from(fs.readFile(p, { encoding: encoding }))
  .pipe(

    rxo.map((o: string): any => {

      return papaparse.parse(o, {
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

/**
 *
 * Delete contents of a folder, without removing the folder itself.
 *
 */
export function deleteFolderContent$(folderPath: string[]):
rx.Observable<boolean> {

  return getFolderContent$(folderPath)
  .pipe(

    rxo.concatMap((o: string[]) => {

      return rx.zip(
        ...o.map((o: string) => fs.remove(path.join(...folderPath, o)))
      );

    }),

    rxo.map((o: any) => true)

  )

}

/**
 *
 * Delete contents of a folder, without removing the folder itself, async.
 *
 */
export function deleteFolderContentSync(folderPath: string[]): boolean {

  getFolderContentSync(folderPath).map((o: string) => {

    fs.removeSync(path.join(...folderPath, o))

  })

  return true;

}

/**
 *
 * Get contents of a folder.
 *
 */
export function getFolderContent$(folderPath: string[]):
rx.Observable<string[]> {

  return new rx.Observable<any>((o: any) => {

    fs.readdir(path.join(...folderPath), (err: any, files: string[]) => {

      if (err) {

        o.error(err);

      } else {

        o.next(files);
        o.complete();

      }

    });

  })

}

/**
 *
 * Get contents of a folder, async.
 *
 */
export function getFolderContentSync(folderPath: string[]): string[] {

  return fs.readdirSync(path.join(...folderPath));

}
