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

const NB_ROCKS = 2022;

/**
 *
 * @param {(-1|1)[]} jetOfGas
 * @returns
 */
module.exports = function(jetOfGas) {
  const faller = falling(pickAt(jetOfGas), pickAt(rocks));

  const result = T.chain({ top: 0, gasCount: 0 })
    .chain(
      T.loopFor(NB_ROCKS, ({ top, gasCount }, rockCount) =>
        faller({ top, gasCount, rockCount })
      )
    )
    .chain(({ top }) => top)
    .value();
  return result;
};

function falling(pickGas, pickRock) {
  return ({ top, gasCount, rockCount }) => {
    let r = start(top, pickRock(rockCount));

    while (true) {
      let rNext = side(pickGas(gasCount), r);
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
        return { gasCount, top: newTop };
      }
      r = rFall;
    }
  };
}
