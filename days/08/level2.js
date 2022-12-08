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
          return 0;
        }
        let count1 = 0;
        for (let i = x - 1; 0 <= i; i--) {
          count1++;
          if (height <= at({ y, x: i })) {
            break;
          }
        }
        let count2 = 0;
        for (let i = x + 1; i < dimX; i++) {
          count2++;
          if (height <= at({ y, x: i })) {
            break;
          }
        }

        let count3 = 0;
        for (let i = y - 1; 0 <= i; i--) {
          count3++;
          if (height <= at({ x, y: i })) {
            break;
          }
        }
        let count4 = 0;
        for (let i = y + 1; i < dimY; i++) {
          count4++;
          if (height <= at({ x, y: i })) {
            break;
          }
        }
        return count1 * count2 * count3 * count4;
      })
    )
    .chain(reduceMatrix((a, b) => Math.max(a, b), 0))
    .value();
};
