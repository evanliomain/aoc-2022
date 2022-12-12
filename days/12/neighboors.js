const T = require('taninsam');
const { atMatrix } = require('../../tools');

function neighboors(matrix) {
  const at = atMatrix(matrix);
  return ({ x, y }) =>
    [
      at({ x: x - 1, y }),
      at({ x: x + 1, y }),
      at({ x, y: y - 1 }),
      at({ x, y: y + 1 })
    ].filter(T.not(T.isUndefined));
}
exports.neighboors = neighboors;
