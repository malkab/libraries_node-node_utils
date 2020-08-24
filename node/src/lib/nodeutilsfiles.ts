import * as fs from "fs-extra";

import * as path from "path";

import * as rx from "rxjs";

import * as rxo from "rxjs/operators";

import * as child_process from "child_process";

import * as roundTo from "round-to";

const getFolderSizeFunction: any = require("get-folder-size");

/**
 *
 * Filesystem's utils.
 *
 */
export namespace NodeUtilsFiles {

  /**
   *
   * Writes a TXT to file.
   *
   * @param   filePathName      The path of the file to be written
   *                            inside the folder of FEE.
   * @param   json              The JSON to write.
   *
   */
  export function writeTxt$(
    filePath: string[],
    txt: any
  ): rx.Observable<boolean> {

    return new rx.Observable<boolean>((o: any) => {

      const p: string = path.join(...filePath);

      fs.writeFile(p, txt, { encoding: "utf-8" }, (err: any) => {

        if (err) { o.error(err); }

        o.next(true);
        o.complete();

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
    txt: string
  ): void {

    const p: string = path.join(...filePath);

    fs.writeFileSync(p, txt, { encoding: "utf-8" });

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
  export function readJson$(...filePath: string[]):
  rx.Observable<any> {

    return new rx.Observable<boolean>((o: any) => {

      const p: string = path.join(...filePath);

      fs.readFile(p, (err: any, data: any) => {

        if (err) { o.error(err); }

        o.next(JSON.parse(data));
        o.complete();

      });

    })

  }

  /**
   *
   * Reads a JSON file.
   *
   */
  export function readJsonSync(...filePath: string[]): void {

    return JSON.parse(fs.readFileSync(path.join(...filePath), "utf8"));

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
    beautifySpaces: number = null
  ): rx.Observable<boolean> {

    return new rx.Observable<boolean>((o: any) => {

      const p: string = path.join(...filePath);

      fs.writeFile(p, JSON.stringify(json, null,
        beautifySpaces), { encoding: "utf-8" }, (err: any) => {

          if (err) { o.error(err); }

          o.next(true);
          o.complete();

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
   *
   */
  export function writeJsonSync(
    filePath: string[],
    json: any,
    beautifySpaces: number = null
  ): void {

    const p: string = path.join(...filePath);

    fs.writeFileSync(p, JSON.stringify(json, null,
      beautifySpaces), { encoding: "utf-8" });

  }

  /**
   *
   * Deletes a file.
   *
   * @param filePath    The file path and name.
   *
   */
  export function deleteFile$(...filePath: string[]): rx.Observable<boolean> {

    return new rx.Observable<boolean>((o: any) => {

      const p: string = path.join(...filePath);

      fs.unlink(p, (err: any) => {

        if (err) { o.error(err); }

        o.next(true);
        o.complete();

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

      fs.remove(p, (error: any) => {

        if (error) { o.error(error); }

        o.next(true);
        o.complete();

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
  export function deleteFolderSync(folderPath: string[]): void {

    const p: string = path.join(...folderPath);

    fs.removeSync(p);

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

      fs.mkdir(p, (error: any) => {

        // Drop if error
        if (error) { o.error(error); }

        o.next(p);
        o.complete();

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

      fs.copy(originP, destinationP, (error: any) => {

        // Drop if error
        if (error) { o.error(error); }

        o.next(destinationP);
        o.complete();

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
   * Requires an installation of 7zip.
   *
   * @param folder
   * @param zipFilePathName
   *
   */
  export function zipFolder(folder: string[], zipFilePathName: string[]):
  rx.Observable<string> {

    const folderP: string = path.join(...folder);
    const zipFilePathNameP: string = path.join(...zipFilePathName);

    return new rx.Observable<string>((o: any) => {

      child_process.exec(`7z a ${zipFilePathNameP} ${folderP}`,
        (error: any, stdout: any, stderr: any) => {

          // Drop if error
          if (error) { o.error(error); }

          o.next(zipFilePathNameP);
          o.complete();

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

      getFolderSizeFunction(folder, (error: Error, size: number) => {

        // Drop if error
        if (error) { o.error(error); }

        o.next(size);
        o.complete();

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

}
