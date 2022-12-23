const T = require('taninsam');
const { reduceMatrix, parseNumber } = require('../../tools');

function serialize({ x, y }) {
  return `${x},${y}`;
}
exports.serialize = serialize;
function deserialize(str) {
  const [x, y] = str.split(',').map(parseNumber());
  return { x, y };
}
exports.deserialize = deserialize;
function nextRules(r) {
  const [first, ...tail] = r;
  return [...tail, first];
}
exports.nextRules = nextRules;
function getElves(matrix) {
  return T.chain(matrix)
    .chain(
      reduceMatrix(
        (elves, c, x, y) => ('#' === c ? [...elves, { x, y }] : elves),
        []
      )
    )
    .chain(T.map(({ x, y }) => `${x},${y}`))
    .value();
}
exports.getElves = getElves;
