const { parseNumber } = require('../../tools');

/**
 * @param {{x:number, y: number}} coordinates
 */
function serialize({ x, y }) {
  return `${x},${y}`;
}

/**
 *
 * @param {string} str
 */
function deserialize(str) {
  const [x, y] = str.split(',').map(parseNumber());
  return { x, y };
}
exports.serialize = serialize;
exports.deserialize = deserialize;
