const T = require('taninsam');
const { turn } = require('./turn');

const directionScore = {
  '>': 0,
  v: 1,
  '<': 2,
  '^': 3
};

function solve(makeBigMapFn) {
  return ({ map, directions }) => {
    const move = moveFn(makeBigMapFn(map));
    let position = { ...map[0][0], d: '>' };

    directions.forEach(direction => {
      if (!T.isNumber(direction)) {
        position.d = turn(position.d, direction);
      } else {
        position = move(position, direction);
      }
    });
    let { x, y, d } = position;
    x++;
    y++;

    return 1000 * y + 4 * x + directionScore[d];
  };
}

function moveFn(bigMap) {
  return ({ x, y, d }, nbSteps) => {
    let pos = `${x},${y}`;
    for (let step = 0; step < nbSteps; step++) {
      const nextPos = bigMap.get(pos)[d].p;
      const nextD = bigMap.get(pos)[d].d;
      if (!bigMap.has(nextPos)) {
        throw new Error(`Position ${nextPos} from ${pos} does not exist`);
      }

      if ('#' === bigMap.get(nextPos).c) {
        break;
      }
      pos = nextPos;
      d = nextD;
    }
    const [nextX, nextY] = pos.split(',');
    return { x: nextX, y: nextY, d };
  };
}

exports.solve = solve;
