const { serialize, deserialize } = require('./serialize');
const { distance } = require('./distance');
const { getBounds } = require('./get-bounds');

let ROW_TO_INSPECT = 2000000;

const sensors = new Set();
const beacons = new Set();

/**
 *
 * @param {{ "sx": number, "sy": number, "bx": number, "by": number, "d": number}[]} input
 * @returns
 */
module.exports = function(input) {
  if (14 === input.length) {
    // pour l'exemple donné
    ROW_TO_INSPECT = 10;
  }

  for (const { sx, sy, bx, by } of input) {
    sensors.add(serialize({ x: sx, y: sy }));
    beacons.add(serialize({ x: bx, y: by }));
  }

  const { xMin, xMax } = getBounds(input);
  const y = ROW_TO_INSPECT;
  let coverage = 0;
  for (let x = xMin; x <= xMax; x++) {
    if (sensors.has(serialize({ x, y })) || beacons.has(serialize({ x, y }))) {
      continue;
    }
    const isCover = input.some(
      ({ sx, sy, d }) => distance({ x, y }, { x: sx, y: sy }) <= d
    );
    if (isCover) {
      coverage++;
    }
  }

  return coverage;
};
