import * as path from "path";

import * as rx from "rxjs";

import * as fs from 'fs-extra';

import { ObjectEncodingOptions } from 'fs-extra';

import * as yaml from "js-yaml";

import { writeTxt$, writeTxtSync } from "../files/txt";

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

    fs.readFile(p, encoding)
      .then((a: string) => {

        o.next(yaml.load(a));
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

  return writeTxt$(filePath,
    yaml.dump(object), { encoding: encoding });

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

  return yaml.load(<string>fs.readFileSync(p, { encoding: encoding }));

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

  return writeTxtSync(filePath,
    yaml.dump(object), { encoding: encoding });

}
