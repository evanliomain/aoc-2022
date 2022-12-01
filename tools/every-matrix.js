module.exports = function everyMatrix(predicat) {
  return matrix => {
    for (let y = 0; y < matrix.length; y++) {
      const row = matrix[y];
      for (let x = 0; x < row.length; x++) {
        const cell = row[x];
        if (!predicat(cell, x, y, matrix)) {
          return false;
        }
      }
    }
    return true;
  };
};
