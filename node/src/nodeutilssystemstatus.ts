import * as nodeProcess from "process";

import * as nodeOs from "os";

/**
 *
 * System status utils.
 *
 */

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
    rssKBytes: Math.round(mu.rss / 1024),
    rssKBytesHuman: `${Math.round(mu.rss / 1024)} KB`,
    rssMBytes: Math.round(mu.rss / 1024 / 1024),
    rssMBytesHuman: `${Math.round(mu.rss / 1024 / 1024)} MB`,
    rssGBytes: Math.round(mu.rss / 1024 / 1024 / 1024),
    rssGBytesHuman: `${Math.round(mu.rss / 1024 / 1024 / 1024)} GB`,

    heapTotalBytes: mu.heapTotal,
    heapTotalBytesHuman: `${mu.heapTotal} B`,
    heapTotalKBytes: Math.round(mu.heapTotal / 1024),
    heapTotalKBytesHuman: `${Math.round(mu.heapTotal / 1024)} KB`,
    heapTotalMBytes: Math.round(mu.heapTotal / 1024 / 1024),
    heapTotalMBytesHuman: `${Math.round(mu.heapTotal / 1024 / 1024)} MB`,
    heapTotalGBytes: Math.round(mu.heapTotal / 1024 / 1024 / 1024),
    heapTotalGBytesHuman: `${Math.round(mu.heapTotal / 1024 / 1024 / 1024)} GB`,

    heapUsedBytes: mu.heapUsed,
    heapUsedBytesHuman: `${mu.heapUsed} B`,
    heapUsedKBytes: Math.round(mu.heapUsed / 1024),
    heapUsedKBytesHuman: `${Math.round(mu.heapUsed / 1024)} KB`,
    heapUsedMBytes: Math.round(mu.heapUsed / 1024 / 1024),
    heapUsedMBytesHuman: `${Math.round(mu.heapUsed / 1024 / 1024)} MB`,
    heapUsedGBytes: Math.round(mu.heapUsed / 1024 / 1024 / 1024),
    heapUsedGBytesHuman: `${Math.round(mu.heapUsed / 1024 / 1024 / 1024)} GB`,

    externalBytes: mu.external,
    externalBytesHuman: `${mu.external} B`,
    externalKBytes: Math.round(mu.external / 1024),
    externalKBytesHuman: `${Math.round(mu.external / 1024)} KB`,
    externalMBytes: Math.round(mu.external / 1024 / 1024),
    externalMBytesHuman: `${Math.round(mu.external / 1024 / 1024)} MB`,
    externalGBytes: Math.round(mu.external / 1024 / 1024 / 1024),
    externalGBytesHuman: `${Math.round(mu.external / 1024 / 1024 / 1024)} GB`,
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

    totalKBytes: Math.round(mu.total / 1024),
    totalKBytesHuman: `${Math.round(mu.total / 1024)} KB`,
    freeKBytes: Math.round(mu.free / 1024),
    freeKBytesHuman: `${Math.round(mu.free / 1024)} KB`,
    usedKBytes: Math.round(mu.used / 1024),
    usedKBytesHuman: `${Math.round(mu.used / 1024)} KB`,

    totalMBytes: Math.round(mu.total / 1024 / 1024),
    totalMBytesHuman: `${Math.round(mu.total / 1024 / 1024)} MB`,
    freeMBytes: Math.round(mu.free / 1024 / 1024),
    freeMBytesHuman: `${Math.round(mu.free / 1024 / 1024)} MB`,
    usedMBytes: Math.round(mu.used / 1024 / 1024),
    usedMBytesHuman: `${Math.round(mu.used / 1024 / 1024)} MB`,

    totalGBytes: Math.round(mu.total / 1024 / 1024 / 1024),
    totalGBytesHuman: `${Math.round(mu.total / 1024 / 1024 / 1024)} GB`,
    freeGBytes: Math.round(mu.free / 1024 / 1024 / 1024),
    freeGBytesHuman: `${Math.round(mu.free / 1024 / 1024 / 1024)} GB`,
    usedGBytes: Math.round(mu.used / 1024 / 1024 / 1024),
    usedGBytesHuman: `${Math.round(mu.used / 1024 / 1024 / 1024)} GB`,
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

    avgSpeeds: Math.round(avg(speeds)),
    avgUser: Math.round(avg(userT) / 100000),
    avgNice: Math.round(avg(niceT) / 100000),
    avgSys: Math.round(avg(sysT) / 100000),
    avgIdle: Math.round(avg(idleT) / 100000)

  }

}
