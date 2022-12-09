
// Distance en X
function dX(x1, x2) {
  return Math.abs(x1 - x2);
}
// Distance en Y
function dY(y1, y2) {
  return Math.abs(y1 - y2);
}
// Move en X
function mX(xH, xT) {
  return xT + Math.sign(xH - xT);
}
// Move en Y
function mY(yH, yT) {
  return yT + Math.sign(yH - yT);
}
function shouldMoveTail({ x: xH, y: yH }, { x: xT, y: yT }) {
  return 1 < dX(xH, xT) || 1 < dY(yH, yT);
}
function moveH(direction, { x, y }) {
  switch (direction) {
    case 'R':
      return { x: x + 1, y };
    case 'L':
      return { x: x - 1, y };
    case 'U':
      return { x, y: y - 1 };
    case 'D':
      return { x, y: y + 1 };
  }
  throw new Error(`Unknown direction ${direction}`);
}
function moveT(positionH, positionT) {
  if (shouldMoveTail(positionH, positionT)) {
    return { x: mX(positionH.x, positionT.x), y: mY(positionH.y, positionT.y) };
  }
  return positionT;
}

exports.moveT = moveT;
exports.moveH = moveH;
