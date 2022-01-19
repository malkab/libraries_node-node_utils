import * as child_process from "child_process";

export module dockerinfo {

/**
*
* This namespace contains functions meant to be run inside a Docker
* container, most of them to get insight of any Docker info that the
* container might know. Specially useful to characterise and identify
* Docker containers in multi-services deployment (like worker pools).
*
*/

/**
*
* A data structure for returning information from Docker containers.
*
*/
export interface IDockerInfo {

  containerid: string;
  hostname: string;

}

/**
*
* This function returns all information available from within the
* container. Works at least with Docker version 19.03.5.
*
*/
export function dockerInfo(): IDockerInfo {

  // Get hostname
  const hostname: string = child_process.execSync(
    "cat /etc/hostname",

    { encoding: "utf8" }
  ).replace(/\n$/, "");


  // Get container ID
  const containerId: string = child_process.execSync(
    "cat /proc/self/cgroup | grep docker/ | tail -1 | sed 's/^.*\\///'",

    { encoding: "utf8" }
  ).replace(/\n$/, "");


  // Return
  const out: IDockerInfo = {

    containerid: containerId,
    hostname: hostname

  };

  return out;

}

}
