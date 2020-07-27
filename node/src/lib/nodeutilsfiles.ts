import * as fs from "fs-extra";

import * as path from "path";

import * as rx from "rxjs";

import * as child_process from "child_process";

/**
 * 
 * Filesystem's utils
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
  
        if (err) {
            
            o.error(err);

        } else {

          o.next(JSON.parse(data));
          o.complete();

        }

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

      fs.mkdir(p, (err: any) => {

        if (err) {

          o.error(err);

        }

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

      fs.copy(originP, destinationP, (err: any) => {

        if (err) {

          o.error(err);

        }

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

          if (error) { o.error(error) }

          o.next(zipFilePathNameP);
          o.complete();

        })

    })

  }

}