const { serialize } = require('./serialize');

const WALLS = [-1, 7];
/**
 *
 * @param {Set<string>} set
 * @param {{x: number; y:number}[]} rock
 */
function isCollide(set, rock) {
  return rock.some(r => WALLS.includes(r.x) || set.has(serialize(r)));
}
exports.isCollide = isCollide;
