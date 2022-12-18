const { serialize } = require('./serialize');

/**
 *
 * @param {{x:number, y: number}[]} coordinates
 */
function coordsToSet(coordinates) {
  const set = new Set();
  for (const coordinate of coordinates) {
    set.add(serialize(coordinate));
  }
  return set;
}
exports.coordsToSet = coordsToSet;
