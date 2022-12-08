const T = require('taninsam');
const { mapMatrix, atMatrix, reduceMatrix } = require('../../tools');

module.exports = function(input) {
  const dimY = input.length;
  const dimX = input[0].length;
  const at = atMatrix(input);

  return T.chain(input)
    .chain(
      mapMatrix((height, x, y) => {
        if ([0, dimX - 1].includes(x) || [0, dimY - 1].includes(y)) {
          return 1;
        }
        let isCover = false;
        for (let i = 0; i < x; i++) {
          if (height <= at({ y, x: i })) {
            isCover = true;
          }
        }
        if (!isCover) {
          return 1;
        }
        isCover = false;

        for (let i = x + 1; i < dimX; i++) {
          if (height <= at({ y, x: i })) {
            isCover = true;
          }
        }
        if (!isCover) {
          return 1;
        }
        isCover = false;

        for (let i = 0; i < y; i++) {
          if (height <= at({ x, y: i })) {
            isCover = true;
          }
        }
        if (!isCover) {
          return 1;
        }
        isCover = false;
        for (let i = y + 1; i < dimY; i++) {
          if (height <= at({ x, y: i })) {
            isCover = true;
          }
        }
        if (!isCover) {
          return 1;
        }
        return 0;
      })
    )
    .chain(reduceMatrix((a, b) => a + b, 0))
    .value();
};
