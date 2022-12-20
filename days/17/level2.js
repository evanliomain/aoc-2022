const T = require('taninsam');
const { coordsToSet } = require('./coords-to-set');
const { setToCoords } = require('./set-to-coords');
const { stringToArray } = require('./string-to-array');
const { pickAt } = require('./pick-at');
const { isCollide } = require('./is-collide');
const { rocks } = require('./rocks');
const { chamber } = require('./chamber');
const { start, side, fall, addCoordsToSet } = require('./utils');

const chamberSet = coordsToSet(stringToArray(chamber));

const NB_ROCKS = 1000000000000;
let tetris = [];
const tetrisMap = new Map();
let nbGas;

/**
 *
 * @param {(-1|1)[]} jetOfGas
 * @returns
 */
module.exports = function(jetOfGas) {
  nbGas = jetOfGas.length;
  const faller = falling(pickAt(jetOfGas), pickAt(rocks));

  let state = { top: 0, gasCount: 0, stop: false };
  let rockCount = 0;
  while (!state.stop) {
    state = faller({ ...state, rockCount });
    rockCount++;
  }
  const { top, rockCount: end, start } = state;

  tetris = tetris.slice(start);

  const patternSum = T.sum()(tetris);
  const patternSize = end - start;
  const remainingTurn = NB_ROCKS - end;
  const quotient = Math.floor(remainingTurn / patternSize);
  const modulo = remainingTurn - quotient * patternSize;

  return top + quotient * patternSum + T.sum()(tetris.slice(0, modulo));
};

function falling(pickGas, pickRock) {
  return ({ top, gasCount, rockCount }) => {
    let r = start(top, pickRock(rockCount));

    while (true) {
      const jetId = gasCount % nbGas;
      const jet = pickGas(gasCount);
      let rNext = side(jet, r);
      gasCount++;

      if (!isCollide(chamberSet, rNext)) {
        r = rNext;
      }
      let rFall = fall(r);
      if (isCollide(chamberSet, rFall)) {
        addCoordsToSet(chamberSet, r);
        let newTop = T.chain(chamberSet)
          .chain(setToCoords)
          .chain(T.map(({ y }) => y))
          .chain(T.max())
          .value();

        const nr = rockCount % rocks.length;
        const left = T.chain(r)
          .chain(T.map(({ x }) => x))
          .chain(T.min())
          .value();
        const diffTop = newTop - top;
        const key = `${jetId},${nr},${left},${diffTop}`;

        if (tetrisMap.has(key)) {
          console.log(rockCount, '<=>', tetrisMap.get(key));
          return { top, rockCount, stop: true, start: tetrisMap.get(key) };
        } else {
          tetrisMap.set(key, rockCount);
          tetris.push(diffTop);
        }
        return { gasCount, top: newTop, stop: false };
      }
      r = rFall;
    }
  };
}
