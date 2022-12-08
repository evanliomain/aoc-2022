const T = require('taninsam');

/**
 * Apply a function to each cell of a matrix
 * @param {(cell: any, x: number, y: number, matrix: any[][])=>any} iteree the function to apply to each cell, take cell, x, y and matrix in arguments
 * @returns a new matrix
 */
module.exports = function mapMatrix(iteree) {
  return matrix => {
    return T.chain(matrix)
      .chain(
        T.map((row, y) =>
          T.chain(row)
            .chain(T.map((cell, x) => iteree(cell, x, y, matrix)))
            .value()
        )
      )
      .value();
  };
};
