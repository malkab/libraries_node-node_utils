import * as path from "path";

import * as rx from "rxjs";

import * as fs from 'fs-extra';

/**
*
* Writes a string to file asynchroneously.
*
* @param filePath
* The path of the file to be written inside the folder of FEE.
*
* @param txt
* The string to write.
*
* @param __namedParameters
* Options.
*
* @param __namedParameters.encoding
* The encoding to write to.
*
* @returns
* An observable with the final path of the file written, as a string.
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
* Writes a string to file synchroneously.
*
* @param filePath
* The path of the file to be written inside the folder of FEE.
*
* @param txt
* The string to write.
*
* @param __namedParameters
* Options.
*
* @param __namedParameters.encoding
* The encoding to write to.
*
* @returns
* An string with the final path of the file written.
*
*/
export function writeTxtSync(
  filePath: string[],
  txt: string,
  { encoding = "utf8" }: { encoding?: fs.ObjectEncodingOptions["encoding"]; } = {}
): string {

  const p: string = path.join(...filePath);

  fs.writeFileSync(p, txt, { encoding: encoding });

  return p;

}
