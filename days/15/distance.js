/**
 *
 * @param {{x: number, y: number}} p1
 * @param {{x: number, y: number}} p2
 * @returns
 */
function distance(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}
exports.distance = distance;
