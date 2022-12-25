const T = require('taninsam');
const { mapMatrix } = require('../../tools');
const { solve } = require('./solve');

module.exports = solve(makeBigMap);

function makeBigMap(map) {
  const X_MAX = T.chain(map)
    .chain(T.flat())
    .chain(T.map(({ x }) => x))
    .chain(T.max())
    .value();
  const Y_MAX = T.chain(map)
    .chain(T.flat())
    .chain(T.map(({ y }) => y))
    .chain(T.max())
    .value();
  const bigMap = new Map();
  mapMatrix(({ c, x, y }) => {
    bigMap.set(`${x},${y}`, { c, x, y });
  })(map);

  for (const [, { c, x, y }] of bigMap) {
    const next = {};
    // >
    if (bigMap.has(`${x + 1},${y}`)) {
      next['>'] = { p: `${x + 1},${y}`, d: '>' };
    } else {
      for (let xi = 0; xi !== x; xi++) {
        if (bigMap.has(`${xi},${y}`)) {
          next['>'] = { p: `${xi},${y}`, d: '>' };
          break;
        }
      }
    }
    // <
    if (bigMap.has(`${x - 1},${y}`)) {
      next['<'] = { p: `${x - 1},${y}`, d: '<' };
    } else {
      for (let xi = X_MAX + 1; xi !== x; xi--) {
        if (bigMap.has(`${xi},${y}`)) {
          next['<'] = { p: `${xi},${y}`, d: '<' };
          break;
        }
      }
    }
    // ^
    if (bigMap.has(`${x},${y - 1}`)) {
      next['^'] = { p: `${x},${y - 1}`, d: '^' };
    } else {
      for (let yi = Y_MAX + 1; yi !== y; yi--) {
        if (bigMap.has(`${x},${yi}`)) {
          next['^'] = { p: `${x},${yi}`, d: '^' };
          break;
        }
      }
    }
    // v
    if (bigMap.has(`${x},${y + 1}`)) {
      next['v'] = { p: `${x},${y + 1}`, d: 'v' };
    } else {
      for (let yi = 0; yi !== y; yi++) {
        if (bigMap.has(`${x},${yi}`)) {
          next['v'] = { p: `${x},${yi}`, d: 'v' };
          break;
        }
      }
    }

    bigMap.set(`${x},${y}`, { c, x, y, ...next });
  }
  return bigMap;
}
