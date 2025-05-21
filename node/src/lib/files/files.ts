import * as path from "path";

import * as rx from "rxjs";

import * as rxo from "rxjs/operators";

import * as child_process from "child_process";

import getFolderSizeFunction from "get-folder-size";

import * as fs from 'fs-extra';

import { ObjectEncodingOptions } from 'fs-extra';

/**

  This module implements several functions to work with files and folders in
  sync and async versions. Async versions return observables.

*/

/**

  Deletes a file.

  @param filePath    The file path and name.

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

  Deletes a file.

  @param filePath    The file path and name.

*/
export function deleteFileSync(...filePath: string[]): void {

  const p: string = path.join(...filePath);

  fs.unlinkSync(p);

}

/**

  Deletes a folder.

  @param folderPath    The file path and name.

*/
export function deleteFolder$(folderPath: string[]): rx.Observable<boolean> {

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

  Deletes a folder.

  @param folderPath    The file path and name.

*/
export function deleteFolderSync(folderPath: string[]): boolean {

  const p: string = path.join(...folderPath);

  fs.removeSync(p);

  return true;

}

/**

  Check path and create folder if it isn't exists, sync version.

  @param folders         The series of folders to create.
  @returns               The full path of the created folder, or
                         null if it exits.

*/
export function mkdir$(...folders: string[]): rx.Observable<string> {
  const p: string = path.join(...folders);
  return new rx.Observable<string>((o: any) => {
    fs.mkdir(p)
      .then(() => {
        o.next(p);
        o.complete();
      })
      .catch((err: any) => {
        o.error(err);
      });
  });
}

/**

  Check path and create folder if it isn't exists, sync version.

  @param folders         The series of folders to create.
  @returns               The full path of the created folder, or
                         null if it exits.

*/
export function mkdirSync(...folders: string[]): void {
  const p: string = path.join(...folders);
  fs.mkdirSync(p);
}

/**

  Duplicates a folder. Uses fs-extra. Will create destination folder if it
  doesn't exists.

  @param origin
  The origin folder as an array of strings.

  @param destination
  The destination folder as an array of strings. Will be created if not exists.

  @returns
  An observable that returns as a string the destination folder.

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

  Duplicates a folder. Uses fs-extra. Will create destination folder if it
  doesn't exists. Sync version.

  @param origin
  The origin folder as an array of strings.

  @param destination
  The destination folder as an array of strings. Will be created if not exists.

  @returns
  The destination folder as a string.

*/
export function copySync(origin: string[], destination: string[]): string {

  const originP: string = path.join(...origin);
  const destinationP: string = path.join(...destination);

  fs.copySync(originP, destinationP);

  return destinationP;

}

/**

  Runs a 7z command. Requires an installation of 7zip in the system / Docker
  image. 7z can be a little bit tricky to get the desired result. To ZIP the
  contents of a folder without zipping the folder path, use the following
  recipe:

  ```shell
  7z a -tzip -r path/to/zip/file.zip ./folder/to/zip/*
  ```

  Note the beginning "./" and the "*" in the folder to ZIP path. ZIP options
  are:

  - zipOptions: any options to pass to 7z, like -tzip -r;
  - dotPrefix:  add the "./" to the start of the folder to ZIP path. This has
                to be provided explicitly because path.join drops any "./"
                passed as a argument.

  @param itemsToZip
  A string with the path expression of the items to zip. This is the trickiest
  part. No path.join is used here because it makes too many assumptions that
  makes 7zip usage difficult. Use path.join externally if needed.

  @param zipFilePathName
  Path of the zip file to be created, also a string.

  @param Options
  Deconstructed parameters.

  @returns
  An Observable that returns the final path of the zipped file.

*/
export function zip$(
  itemsToZip: string,
  zipFilePathName: string,
  {
    zipFile,
    recursive
  }: {
    /**

      If true, a .zip file is generated instead of a .7z. Defaults to false.

    */
    zipFile: boolean;
    /**

      If true, the zipping is done recursively. Defaults to false.

    */
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

  Calculates the size of a single folder in bytes.
  Divide by 1024 twice to get megabytes.

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

  Outputs a report about the size of several folders, in different sizes, in
  numerical and human readable form.

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
          sizeKBytes: Math.round(x / 1024),
          sizeKBytesHuman: `${Math.round(x / 1024)} KB`,
          sizeMBytes: Math.round(x / 1024 / 1024),
          sizeMBytesHuman: `${Math.round(x / 1024 / 1024)} MB`,
          sizeGBytes: Math.round(x / 1024 / 1024 / 1024),
          sizeGBytesHuman: `${Math.round(x / 1024 / 1024 / 1024)} GB`,
        }

      })

    })

  )

}

/**

  Reads a file.

  @param   filePathName
  The path of the file to be written inside the folder of FEE.
  @param   json              The JSON to write.
  @param   beautifySpaces    Set different to null to output
                             a beautiful JSON.

*/
export function readFile$(
  filePath: string[],
  { encoding = "utf8" }: { encoding?: string } = {}
): rx.Observable<any> {
  const p: string = path.join(...filePath);
  return rx.from(fs.readFile(p, encoding as BufferEncoding));
}

/**

  Reads a file, sync version.

*/
export function readFileSync(
  filePath: string[],
  { encoding = "utf8" }: { encoding?: ObjectEncodingOptions["encoding"] } = {}
): any {

  const p: string = path.join(...filePath);
  return fs.readFileSync(p, { encoding: encoding });

}

/**

  Reads a text file and return its lines.

  @param   filePathName
  The path of the file to be written inside the folder of FEE.
  @param   json              The JSON to write.
  @param   beautifySpaces    Set different to null to output
                             a beautiful JSON.

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
  return rx.from(fs.readFile(p, encoding as BufferEncoding))
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

  Reads a text file and returns its lines, sync version.

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

  Delete contents of a folder without removing the folder itself.

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

  Delete contents of a folder, without removing the folder itself, sync version.

*/
export function deleteFolderContentSync(folderPath: string[]): boolean {

  getFolderContentSync(folderPath).map((o: string) => {

    fs.removeSync(path.join(...folderPath, o))

  })

  return true;

}

/**

  Get contents of a folder.

  @param folderPath
  The path to the folder to be scanned, as a string array.

  @return
  An observable with the contents of the folder as a string array.

*/
export function getFolderContent$(folderPath: string[]): rx.Observable<string[]> {
  return new rx.Observable<string[]>((o: any) => {
    fs.readdir(path.join(...folderPath))
      .then((files: string[]) => {
        o.next(files);
        o.complete();
      })
      .catch((err: any) => {
        o.error(err);
      });
  });
}

/**

  Get contents of a folder, sync version.

  @param folderPath
  The path to the folder to be scanned, as a string array.

  @return
  The contents of the folder as a string array.

*/
export function getFolderContentSync(folderPath: string[]): string[] {
  return fs.readdirSync(path.join(...folderPath));
}
