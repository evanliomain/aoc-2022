const T = require('taninsam');
const Graph = require('node-dijkstra');
const { parseNumber } = require('../../tools');
const { countAllFaces } = require('./count-all-faces');
const { getCubeSet } = require('./get-cube-set');

module.exports = function(input) {
  const cubeSet = getCubeSet(input);
  const allFaces = countAllFaces(input, cubeSet);

  const cubes = getCubes(input);

  const [[minX, minY, minZ], [maxX, maxY, maxZ]] = getBounds(cubes);
  const outerCubesSet = getOuterCubesSet(
    minX,
    maxX,
    minY,
    maxY,
    minZ,
    maxZ,
    cubeSet
  );

  const nodes = {};
  for (const outerCube of outerCubesSet) {
    const nearCubes = {};
    const [x, y, z] = outerCube.split(',').map(parseNumber());
    for (let i = 0; i < 3; i++) {
      const cubeLeft = [x, y, z];
      const cubeRight = [x, y, z];
      cubeLeft[i]--;
      cubeRight[i]++;
      if (outerCubesSet.has(cubeLeft.join(','))) {
        nearCubes[cubeLeft.join(',')] = 1;
      }
      if (outerCubesSet.has(cubeRight.join(','))) {
        nearCubes[cubeRight.join(',')] = 1;
      }
    }
    nodes[outerCube] = nearCubes;
  }
  const graph = new Graph(nodes);

  const EXIT = [minX, minY, minZ].join(',');

  const innerCubes = [];

  for (const node of outerCubesSet) {
    const [x, y, z] = node.split(',').map(parseNumber());
    if (
      x === minX ||
      x === maxX ||
      y === minY ||
      x === maxY ||
      z === minZ ||
      x === maxZ ||
      node === EXIT
    ) {
      continue;
    }
    if (null === graph.path(node, EXIT)) {
      innerCubes.push(node);
    }
  }

  const allInnerFaces = countAllFaces(innerCubes, getCubeSet(innerCubes));

  return allFaces - allInnerFaces;
};

function getOuterCubesSet(minX, maxX, minY, maxY, minZ, maxZ, cubeSet) {
  const outerCubesSet = new Set();
  for (let x = minX - 1; x < maxX + 1; x++) {
    for (let y = minY - 1; y < maxY + 1; y++) {
      for (let z = minZ - 1; z < maxZ + 1; z++) {
        if (!cubeSet.has([x, y, z].join(','))) {
          outerCubesSet.add([x, y, z].join(','));
        }
      }
    }
  }
  return outerCubesSet;
}

function getCubes(input) {
  return T.chain(input)
    .chain(T.map(T.split(',')))
    .chain(T.map(T.map(parseNumber())))
    .value();
}

function getBounds(cubes) {
  const maxX = T.chain(cubes)
    .chain(T.map(([x, y, z]) => x))
    .chain(T.max())
    .value();
  const maxY = T.chain(cubes)
    .chain(T.map(([x, y, z]) => y))
    .chain(T.max())
    .value();
  const maxZ = T.chain(cubes)
    .chain(T.map(([x, y, z]) => z))
    .chain(T.max())
    .value();

  const minX = T.chain(cubes)
    .chain(T.map(([x, y, z]) => x))
    .chain(T.min())
    .value();
  const minY = T.chain(cubes)
    .chain(T.map(([x, y, z]) => y))
    .chain(T.min())
    .value();
  const minZ = T.chain(cubes)
    .chain(T.map(([x, y, z]) => z))
    .chain(T.min())
    .value();

  return [
    [minX, minY, minZ],
    [maxX, maxY, maxZ]
  ];
}
