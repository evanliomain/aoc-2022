const T = require('taninsam');
const {
  getPointsOfPath,
  eq,
  fallDown,
  fallLeft,
  fallRight
} = require('./utils');
const { serialize, deserialize } = require('./serialize');

const START = { x: 500, y: 0 };
const rocks = new Set();
const sands = new Set();

/**
 *
 * @param {{x:number, y:number}[][]} input
 * @returns
 */
module.exports = function(input) {
  const lines = T.chain(input)
    .chain(T.map(getPointsOfPath))
    .chain(T.flat())
    .value();

  lines.forEach(point => {
    rocks.add(serialize(point));
  });

  let deep = 0;

  for (const rock of rocks) {
    const { y } = deserialize(rock);
    deep = Math.max(deep, y + 2);
  }

  while (true) {
    let sand = { ...START };
    let oldSand;
    do {
      oldSand = { ...sand };
      sand = nextPosition(sand, deep);
    } while (!eq(oldSand, sand) && sand.y <= deep);

    sands.add(serialize(sand));
    if (sands.has('500,0')) {
      break;
    }
  }
  return sands.size;
};

/**
 * @param {{x:number, y:number}} point
 */
function isBlocked(point, deep) {
  return (
    rocks.has(serialize(point)) ||
    sands.has(serialize(point)) ||
    point.y === deep
  );
}

/**
 * @param {{x:number, y:number}} point
 */
function nextPosition(point, deep) {
  if (!isBlocked(fallDown(point), deep)) {
    return fallDown(point);
  }
  if (!isBlocked(fallLeft(point), deep)) {
    return fallLeft(point);
  }
  if (!isBlocked(fallRight(point), deep)) {
    return fallRight(point);
  }
  return point;
}
