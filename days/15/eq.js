/**
 *
 * @param {{x:number, y:number}} p1
 * @param {{x:number, y:number}} p2
 * @returns {x:number, y:number} p1 == p2
 */
function eq(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

exports.eq = eq;