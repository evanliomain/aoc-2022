const T = require('taninsam');
const { atMatrix, reduceMatrix, parseNumber, equal } = require('../../tools');
const { wrapMatrixBy } = require('./wrap-matrix-by');
const { getElves, deserialize, serialize, nextRules } = require('./utils');

const MAX_ROUND = 10;

const moves = {
  N: ({ x, y }) => ({ x, y: y - 1 }),
  S: ({ x, y }) => ({ x, y: y + 1 }),
  E: ({ x, y }) => ({ x: x + 1, y }),
  W: ({ x, y }) => ({ x: x - 1, y })
};

let rules = [
  ['N', 'NE', 'NW'],
  ['S', 'SE', 'SW'],
  ['W', 'NW', 'SW'],
  ['E', 'NE', 'SE']
];

module.exports = function(input) {
  let world = input;

  for (let round = 1; round <= MAX_ROUND; round++) {
    world = wrapMatrixBy('.')(world);

    const elves = new Set(getElves(world));
    const futurPositions = new Map();
    const nextElves = new Map();

    // first valid direction
    for (const elf of elves) {
      const { x, y } = deserialize(elf);
      const neighboors = getNeighboors(world, x, y);
      let shouldMove = false;
      let moveTo = '';
      const hasNeighboors = T.chain(neighboors)
        .chain(T.values())
        .chain(T.some(equal('#')))
        .value();
      if (hasNeighboors) {
        for (const rule of rules) {
          if (rule.every(d => '.' === neighboors[d])) {
            shouldMove = true;
            moveTo = serialize(moves[rule[0]]({ x, y }));
            const nbAtPosition = futurPositions.has(moveTo)
              ? futurPositions.get(moveTo)
              : 0;
            futurPositions.set(moveTo, 1 + nbAtPosition);

            break;
          }
        }
      }

      if (shouldMove) {
        nextElves.set(elf, moveTo);
      }
    }

    // second half of the round can begin
    for (const [current, next] of nextElves) {
      // if they were the only Elf to propose moving to that position
      if (1 === futurPositions.get(next)) {
        const { x, y } = deserialize(current);
        const { x: nx, y: ny } = deserialize(next);
        world[y][x] = '.';
        world[ny][nx] = '#';
      }
    }
    rules = nextRules(rules);
  }

  return T.chain(world)
    .chain(resize)
    .chain(countEmptyGround)
    .value();
};

function getNeighboors(matrix, x, y) {
  const at = atMatrix(matrix);
  const { N, S, E, W } = moves;
  const p = { x, y };
  return {
    N: at(N(p)),
    S: at(S(p)),
    E: at(E(p)),
    W: at(W(p)),
    NE: at(N(E(p))),
    NW: at(N(W(p))),
    SE: at(S(E(p))),
    SW: at(S(W(p)))
  };
}
function resize(matrix) {
  const at = atMatrix(matrix);
  const xmin = T.chain(matrix)
    .chain(
      reduceMatrix(
        (min, c, x, y) => ('#' === c ? Math.min(min, x) : min),
        1000000000000000
      )
    )
    .value();
  const xmax = T.chain(matrix)
    .chain(
      reduceMatrix(
        (max, c, x, y) => ('#' === c ? Math.max(max, x) : max),
        -1000000000000000
      )
    )
    .value();
  const ymin = T.chain(matrix)
    .chain(
      reduceMatrix(
        (min, c, x, y) => ('#' === c ? Math.min(min, y) : min),
        1000000000000000
      )
    )
    .value();
  const ymax = T.chain(matrix)
    .chain(
      reduceMatrix(
        (max, c, x, y) => ('#' === c ? Math.max(max, y) : max),
        -1000000000000000
      )
    )
    .value();

  const newMatrix = [];

  for (let y = ymin; y <= ymax; y++) {
    const line = [];
    for (let x = xmin; x <= xmax; x++) {
      line.push(at({ x, y }));
    }
    newMatrix.push(line);
  }
  return newMatrix;
}
function countEmptyGround(matrix) {
  return reduceMatrix(
    (count, cell) => count + ('.' === cell ? 1 : 0),
    0
  )(matrix);
}
