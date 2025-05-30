import * as rx from "rxjs";

import * as rxo from "rxjs/operators";

import { IAxiosResponse, axiosGet$, ERESPONSETYPE } from "@sunntics/ts-utils";

import * as path from "path";

import * as fs from "fs";

/**
 *
 * This module encapsulates Axios as Observables.
 *
 */

/**
 *
 * Gets a file from a request and writes it to a file.
 *
 * @param url
 * URL to throw the request at.
 *
 * @param filePath
 * A set of strings to define the path of the file to be saved.
 *
 * @returns
 * A data structure with the following data items:
 * - data (any): the request data
 * - status (number): HTTP status of the request
 * - statusText (string): the text of the HTTP status
 * - headers (any): the set of headers
 * - method (string): the method used in the request
 *
 */
export function axiosSaveFile({
    url,
    filePath
  }: {
    url: string;
    filePath: string[];
}): rx.Observable<IAxiosResponse> {

  return axiosGet$(
    filePath.join("/"),
    {
      baseUrl: url,
      responseType: ERESPONSETYPE.stream
    }
  )
  .pipe(

    rxo.map((response: any) => {

      response.data.pipe(fs.createWriteStream(path.join(...filePath)));

      return <IAxiosResponse>{
        data: undefined,
        headers: response.headers,
        method: response.method,
        status: response.status,
        statusText: response.statusText
      }

    })

  )

}
