const T = require('taninsam');

function isInRightOrder(left, right) {
  if (0 === left.length && 0 === right.length) {
    // indecision
    return null;
  }
  if (0 === left.length && 0 !== right.length) {
    return true;
  }
  if (0 !== left.length && 0 === right.length) {
    return false;
  }
  let [firstLeft, ...tailLeft] = left;
  let [firstRight, ...tailRight] = right;

  if (T.isNumber(firstLeft) && T.isNumber(firstRight)) {
    if (firstLeft !== firstRight) {
      return firstLeft < firstRight;
    } else {
      if (0 === tailLeft.length && 0 === tailRight.length) {
        // indecision
        return null;
      }
      return isInRightOrder(tailLeft, tailRight);
    }
  }
  firstLeft = T.isNumber(firstLeft) ? [firstLeft] : firstLeft;
  firstRight = T.isNumber(firstRight) ? [firstRight] : firstRight;
  const decision = isInRightOrder(firstLeft, firstRight);
  if (null !== decision) {
    return decision;
  }
  if (0 === tailLeft.length && 0 === tailRight.length) {
    // indecision
    return null;
  }
  return isInRightOrder(tailLeft, tailRight);
}
exports.isInRightOrder = isInRightOrder;
