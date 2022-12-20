const { serialize } = require('./serialize');

/**
 *
 * @param {number} top
 * @param {{x: number; y:number}[]} rock
 */
function start(top, rock) {
  return rock.map(({ x, y }) => ({ x, y: y + top + 4 }));
}
exports.start = start;
/**
 * @param {{x: number; y:number}[]} rock
 */
function fall(rock) {
  return rock.map(({ x, y }) => ({ x, y: y - 1 }));
}
exports.fall = fall;
/**
 * @param {-1|1} wind
 * @param {{x: number; y:number}[]} rock
 */
function side(wind, rock) {
  return rock.map(({ x, y }) => ({ x: x + wind, y }));
}
exports.side = side;
/**
 * @param {Set<string>} set
 * @param {{x:number, y: number}[]} coordinates
 */
function addCoordsToSet(set, coordinates) {
  for (const coordinate of coordinates) {
    set.add(serialize(coordinate));
  }
}
exports.addCoordsToSet = addCoordsToSet;
