const T = require('taninsam');
const { lag } = require('../../tools');
const { eq } = require('./eq');

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
exports.getPointsOfPath = getPointsOfPath;
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
 * @param {{x:number, y:number}} point
 */
function fallDown({ x, y }) {
  return { x, y: y + 1 };
}
exports.fallDown = fallDown;
/**
 * @param {{x:number, y:number}} point
 */
function fallLeft({ x, y }) {
  return { x: x - 1, y: y + 1 };
}
exports.fallLeft = fallLeft;
/**
 * @param {{x:number, y:number}} point
 */
function fallRight({ x, y }) {
  return { x: x + 1, y: y + 1 };
}
exports.fallRight = fallRight;
