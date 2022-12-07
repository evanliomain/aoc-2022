module.exports = function (dirs) {
  let total = 0;
  const threshold = 100000;

  for (const [, { totalSize }] of dirs) {
    if (totalSize <= threshold) {
      total += totalSize;
    }
  }

  return total;

};
