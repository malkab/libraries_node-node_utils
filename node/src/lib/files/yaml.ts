import * as path from "path";

import * as rx from "rxjs";

import * as fs from 'fs-extra';

import { promises as fsp } from 'fs';

import { ObjectEncodingOptions } from 'fs-extra';

import * as jsYaml from "js-yaml";

import * as txt from "../files/txt";

/**
*
* Reads a YAML file asynchronously.
*
* @param filePath
* The path to the file to open.
*
* @param __namedParameters
* Options.
*
* @param __namedParameters.encoding
* Encoding.
*
* @returns
* The parsed object from the YAML.
*
*/
export function readYaml$(
  filePath: string[],
  { encoding = "utf8" }: { encoding?: string } = {}
): rx.Observable<any> {

  const p: string = path.join(...filePath);

  return new rx.Observable<any>((o: any) => {

    fsp.readFile(p, encoding as BufferEncoding)
      .then((a: string) => {

        o.next(jsYaml.load(a));
        o.complete();

      })
      .catch((a: any) => o.error(a));

  })

}

/**
*
* Writes an object to a YAML file synchronously.
*
* @param filePath
* The path to the file to write.
*
* @param object
* The object to convert to YAML.
*
* @param __namedParameters
* Encoding of data.
*
* @param encoding
* Encoding.
*
* @returns
* The path of the written file.
*
*/
export function writeYaml$(
  filePath: string[],
  object: any,
  { encoding = "utf8" }: { encoding?: ObjectEncodingOptions["encoding"] } = {}
): rx.Observable<string> {

  return txt.writeTxt$(filePath,
    jsYaml.dump(object), { encoding: encoding });

}


/**
*
* Reads a YAML file synchronously.
*
* @param filePath
* The path to the file to open.
*
* @param __namedParameters
* Encoding of data.
*
* @param encoding
* Encoding.
*
* @returns
* The parsed object from the YAML.
*
*/
export function readYamlSync(
  filePath: string[],
  { encoding = "utf8" }: { encoding?: ObjectEncodingOptions["encoding"] } = {}
): any {

  const p: string = path.join(...filePath);

  return jsYaml.load(<string>fs.readFileSync(p, { encoding: encoding }));

}

/**
*
* Writes an object to a YAML file synchronously.
*
* @param filePath
* The path to the file to write.
*
* @param object
* The object to convert to YAML.
*
* @param __namedParameters
* Encoding of data.
*
* @param encoding
* Encoding.
*
* @returns
* The path of the written file.
*
*/
export function writeYamlSync(
  filePath: string[],
  object: any,
  { encoding = "utf8" }: { encoding?: ObjectEncodingOptions["encoding"] } = {}
): string {

  return txt.writeTxtSync(filePath,
    jsYaml.dump(object), { encoding: encoding });

}
