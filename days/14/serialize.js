const { parseNumber } = require('../../tools');

function serialize({ x, y }) {
  return `${x},${y}`;
}
function deserialize(str) {
  const [x, y] = str.split(',').map(parseNumber());
  return { x, y };
}
exports.serialize = serialize;
exports.deserialize = deserialize;
