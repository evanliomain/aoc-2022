const T = require('taninsam');
const { lag } = require('../../tools');
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
      sand = nextPosition(sand);
    } while (!eq(oldSand, sand) && sand.y <= deep);

    if (sand.y <= deep) {
      sands.add(serialize(sand));
    } else {
      break
    }
  }
  return sands.size;
};

/**
 *
 * @param {{x:number, y:number}[]} points
 * @returns points forming a path
 */
function getPointsOfPath(points) {
  return T.chain(points)
    .chain(
      lag((startPoint, endPoint) => {
        const path = [{ ...startPoint }];
        const delta = diff(endPoint, startPoint);
        const epsilon = { x: Math.sign(delta.x), y: Math.sign(delta.y) };
        let cursor = { ...startPoint };
        while (!eq(cursor, endPoint)) {
          cursor = add(cursor, epsilon);
          path.push({ ...cursor });
        }
        return path;
      })
    )
    .chain(T.flat())
    .value();
}

/**
 *
 * @param {{x:number, y:number}} p1
 * @param {{x:number, y:number}} p2
 * @returns {x:number, y:number} p1 - p2
 */
function diff(p1, p2) {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}

/**
 *
 * @param {{x:number, y:number}} p1
 * @param {{x:number, y:number}} p2
 * @returns {x:number, y:number} p1 + p2
 */
function add(p1, p2) {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
}
/**
 *
 * @param {{x:number, y:number}} p1
 * @param {{x:number, y:number}} p2
 * @returns {x:number, y:number} p1 == p2
 */
function eq(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

/**
 * @param {{x:number, y:number}} point
 */
function fallDown({ x, y }) {
  return { x, y: y + 1 };
}

/**
 * @param {{x:number, y:number}} point
 */
function fallLeft({ x, y }) {
  return { x: x - 1, y: y + 1 };
}

/**
 * @param {{x:number, y:number}} point
 */
function fallRight({ x, y }) {
  return { x: x + 1, y: y + 1 };
}

/**
 * @param {{x:number, y:number}} point
 */
function isBlocked(point) {
  return rocks.has(serialize(point)) || sands.has(serialize(point));
}

/**
 * @param {{x:number, y:number}} point
 */
function nextPosition(point) {
  if (!isBlocked(fallDown(point))) {
    return fallDown(point);
  }
  if (!isBlocked(fallLeft(point))) {
    return fallLeft(point);
  }
  if (!isBlocked(fallRight(point))) {
    return fallRight(point);
  }
  return point;
}
