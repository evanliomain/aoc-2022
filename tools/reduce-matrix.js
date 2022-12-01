module.exports = function reduceMatrix(reducer, start) {
  return matrix => {
    let accumulator = start;
    for (let y = 0; y < matrix.length; y++) {
      const row = matrix[y];
      for (let x = 0; x < row.length; x++) {
        const cell = row[x];
        accumulator = reducer(accumulator, cell, x, y, matrix);
      }
    }
    return accumulator;
  };
};
