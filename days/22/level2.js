const T = require('taninsam');
const { mapMatrix, parseNumber } = require('../../tools');
const { solve } = require('./solve');

const BLOCKS = {
  1: { qx: 1, qy: 0 },
  2: { qx: 2, qy: 0 },
  3: { qx: 1, qy: 1 },
  4: { qx: 0, qy: 2 },
  5: { qx: 1, qy: 2 },
  6: { qx: 0, qy: 3 }
};
const INVERSE_BLOCK = T.chain(BLOCKS)
  .chain(T.entries())
  .chain(T.map(([bn, { qx, qy }]) => [`${qx},${qy}`, parseNumber()(bn)]))
  .chain(T.fromEntries())
  .value();

const NEXT_BLOCK = {
  1: {
    '^': { d: '>', b: 6, m: ({ mx }) => ({ mx: 0, my: mx }) },
    '<': { d: '>', b: 4, m: ({ my, n }) => ({ mx: 0, my: n - 1 - my }) }
  },
  2: {
    '^': { d: '^', b: 6, m: ({ mx, n }) => ({ mx, my: n - 1 }) },
    '>': { d: '<', b: 5, m: ({ my, n }) => ({ mx: n - 1, my: n - 1 - my }) },
    v: { d: '<', b: 3, m: ({ mx, n }) => ({ mx: n - 1, my: mx }) }
  },
  3: {
    '>': { d: '^', b: 2, m: ({ my, n }) => ({ mx: my, my: n - 1 }) },
    '<': { d: 'v', b: 4, m: ({ my }) => ({ mx: my, my: 0 }) }
  },
  4: {
    '<': { d: '>', b: 1, m: ({ my, n }) => ({ mx: 0, my: n - 1 - my }) },
    '^': { d: '>', b: 3, m: ({ mx }) => ({ mx: 0, my: mx }) }
  },
  5: {
    '>': { d: '<', b: 2, m: ({ my, n }) => ({ mx: n - 1, my: n - 1 - my }) },
    v: { d: '<', b: 6, m: ({ mx, n }) => ({ mx: n - 1, my: mx }) }
  },
  6: {
    v: { d: 'v', b: 2, m: ({ mx }) => ({ mx, my: 0 }) },
    '>': { d: '^', b: 5, m: ({ my, n }) => ({ mx: my, my: n - 1 }) },
    '<': { d: 'v', b: 1, m: ({ my }) => ({ mx: my, my: 0 }) }
  }
};

const NEXT = {
  '>': { dx: 1, dy: 0 },
  '<': { dx: -1, dy: 0 },
  v: { dx: 0, dy: 1 },
  '^': { dx: 0, dy: -1 }
};

module.exports = solve(makeBigMap);

function makeBigMap(map) {
  const X_MAX = T.chain(map)
    .chain(T.flat())
    .chain(T.map(({ x }) => x))
    .chain(T.max())
    .value();
  const n = (X_MAX + 1) / 3;
  const bigMap = new Map();

  mapMatrix(({ c, x, y }) => {
    bigMap.set(`${x},${y}`, { c, x, y });
  })(map);

  for (const [, { c, x, y }] of bigMap) {
    const next = {};

    const qx = Math.floor(x / n);
    const mx = x % n;
    const qy = Math.floor(y / n);
    const my = y % n;

    const bn = qToBlockNumber(qx, qy);
    next.b = bn;

    for (const [d, { dx, dy }] of T.entries()(NEXT)) {
      const newPosition = `${x + dx},${y + dy}`;
      if (bigMap.has(newPosition)) {
        next[d] = { p: newPosition, d, nb: bn };
        continue;
      }
      const { d: nd, b, m } = NEXT_BLOCK[bn][d];
      const { qx: nqx, qy: nqy } = blockNumberToQ(b);
      const { mx: nmx, my: nmy } = m({ mx, my, n });

      let nx = n * nqx + nmx;
      let ny = n * nqy + nmy;
      const otherPosition = `${nx},${ny}`;
      next[d] = { p: otherPosition, d: nd, nb: b };
    }

    bigMap.set(`${x},${y}`, { c, x, y, ...next });
  }

  return bigMap;
}

function qToBlockNumber(qx, qy) {
  const bn = INVERSE_BLOCK[`${qx},${qy}`];
  if (T.isNil(bn)) {
    throw new Error(`Unknown square for ${qx} x ${qy}`);
  }
  return bn;
}
function blockNumberToQ(bn) {
  const q = BLOCKS[bn];
  if (T.isNil(q)) {
    throw new Error(`Unknown square for ${bn}`);
  }
  return q;
}
