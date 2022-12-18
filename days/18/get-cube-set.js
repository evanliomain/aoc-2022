function getCubeSet(input) {
  const cubesSet = new Set();
  for (const cube of input) {
    cubesSet.add(cube);
  }
  return cubesSet;
}
exports.getCubeSet = getCubeSet;
