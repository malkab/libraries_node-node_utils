import * as nodeProcess from "process";

import { roundTo } from "round-to";

import * as nodeOs from "os";

/**
 *
 * System status utils.
 *
 */
export module systemstatus {

/**
*
* Returns Node memory usage, crude.
*
*/
export function nodeMemoryUsage() {

  return nodeProcess.memoryUsage();

}

/**
*
* Return Node memory usage, report format.
*
*/
export function nodeMemoryUsageReport() {

  const mu: any = nodeProcess.memoryUsage();

  return {
    rssBytes: mu.rss,
    rssBytesHuman: `${mu.rss} B`,
    rssKBytes: roundTo(mu.rss / 1024, 2),
    rssKBytesHuman: `${roundTo(mu.rss / 1024, 2)} KB`,
    rssMBytes: roundTo(mu.rss / 1024 / 1024, 2),
    rssMBytesHuman: `${roundTo(mu.rss / 1024 / 1024, 2)} MB`,
    rssGBytes: roundTo(mu.rss / 1024 / 1024 / 1024, 2),
    rssGBytesHuman: `${roundTo(mu.rss / 1024 / 1024 / 1024, 2)} GB`,

    heapTotalBytes: mu.heapTotal,
    heapTotalBytesHuman: `${mu.heapTotal} B`,
    heapTotalKBytes: roundTo(mu.heapTotal / 1024, 2),
    heapTotalKBytesHuman: `${roundTo(mu.heapTotal / 1024, 2)} KB`,
    heapTotalMBytes: roundTo(mu.heapTotal / 1024 / 1024, 2),
    heapTotalMBytesHuman: `${roundTo(mu.heapTotal / 1024 / 1024, 2)} MB`,
    heapTotalGBytes: roundTo(mu.heapTotal / 1024 / 1024 / 1024, 2),
    heapTotalGBytesHuman: `${roundTo(mu.heapTotal / 1024 / 1024 / 1024, 2)} GB`,

    heapUsedBytes: mu.heapUsed,
    heapUsedBytesHuman: `${mu.heapUsed} B`,
    heapUsedKBytes: roundTo(mu.heapUsed / 1024, 2),
    heapUsedKBytesHuman: `${roundTo(mu.heapUsed / 1024, 2)} KB`,
    heapUsedMBytes: roundTo(mu.heapUsed / 1024 / 1024, 2),
    heapUsedMBytesHuman: `${roundTo(mu.heapUsed / 1024 / 1024, 2)} MB`,
    heapUsedGBytes: roundTo(mu.heapUsed / 1024 / 1024 / 1024, 2),
    heapUsedGBytesHuman: `${roundTo(mu.heapUsed / 1024 / 1024 / 1024, 2)} GB`,

    externalBytes: mu.external,
    externalBytesHuman: `${mu.external} B`,
    externalKBytes: roundTo(mu.external / 1024, 2),
    externalKBytesHuman: `${roundTo(mu.external / 1024, 2)} KB`,
    externalMBytes: roundTo(mu.external / 1024 / 1024, 2),
    externalMBytesHuman: `${roundTo(mu.external / 1024 / 1024, 2)} MB`,
    externalGBytes: roundTo(mu.external / 1024 / 1024 / 1024, 2),
    externalGBytesHuman: `${roundTo(mu.external / 1024 / 1024 / 1024, 2)} GB`,
  }

}

/**
*
* Returns a total and free system memory, crude.
*
*/
export function systemMemoryUsage() {

  return {

    total: nodeOs.totalmem(),
    free: nodeOs.freemem(),
    used: nodeOs.totalmem() - nodeOs.freemem()

  }

}

/**
*
* Returns a total and free system memory, report.
*
*/
export function systemMemoryUsageReport() {

  const mu: any = systemMemoryUsage();

  return {
    totalBytes: mu.total,
    totalBytesHuman: `${mu.total} B`,
    freeBytes: mu.free,
    freeBytesHuman: `${mu.free} B`,
    usedBytes: mu.used,
    usedBytesHuman: `${mu.used} B`,

    totalKBytes: roundTo(mu.total / 1024, 2),
    totalKBytesHuman: `${roundTo(mu.total / 1024, 2)} KB`,
    freeKBytes: roundTo(mu.free / 1024, 2),
    freeKBytesHuman: `${roundTo(mu.free / 1024, 2)} KB`,
    usedKBytes: roundTo(mu.used / 1024, 2),
    usedKBytesHuman: `${roundTo(mu.used / 1024, 2)} KB`,

    totalMBytes: roundTo(mu.total / 1024 / 1024, 2),
    totalMBytesHuman: `${roundTo(mu.total / 1024 / 1024, 2)} MB`,
    freeMBytes: roundTo(mu.free / 1024 / 1024, 2),
    freeMBytesHuman: `${roundTo(mu.free / 1024 / 1024, 2)} MB`,
    usedMBytes: roundTo(mu.used / 1024 / 1024, 2),
    usedMBytesHuman: `${roundTo(mu.used / 1024 / 1024, 2)} MB`,

    totalGBytes: roundTo(mu.total / 1024 / 1024 / 1024, 2),
    totalGBytesHuman: `${roundTo(mu.total / 1024 / 1024 / 1024, 2)} GB`,
    freeGBytes: roundTo(mu.free / 1024 / 1024 / 1024, 2),
    freeGBytesHuman: `${roundTo(mu.free / 1024 / 1024 / 1024, 2)} GB`,
    usedGBytes: roundTo(mu.used / 1024 / 1024 / 1024, 2),
    usedGBytesHuman: `${roundTo(mu.used / 1024 / 1024 / 1024, 2)} GB`,
  }

}

/**
*
* Returns really crude and imprecise average CPU info, only for comparisson
* monitoring. No real units, no percentages, just a syntetic indicator of
* activity.
*
*/
export function cpuReport() {

  const c: any[] = nodeOs.cpus();

  // Some arrays to gather data
  const speeds: number[] = [];
  const userT: number[] = [];
  const niceT: number[] = [];
  const sysT: number[] = [];
  const idleT: number[] = [];

  c.map((x: any) => {

    speeds.push(x.speed);
    userT.push(x.times.user);
    niceT.push(x.times.nice);
    sysT.push(x.times.sys);
    idleT.push(x.times.idle);

  })

  // A little avg function
  const avg: (serie: number[]) => number = (serie: number[]): number => {

    let sum: number = 0;
    serie.map((x: number) => sum += x );
    return (sum / serie.length);

  }

  return {

    avgSpeeds: roundTo(avg(speeds), 1),
    avgUser: roundTo(avg(userT) / 100000, 2),
    avgNice: roundTo(avg(niceT) / 100000, 2),
    avgSys: roundTo(avg(sysT) / 100000, 2),
    avgIdle: roundTo(avg(idleT) / 100000, 2)

  }

}

}
