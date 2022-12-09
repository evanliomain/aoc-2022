const T = require('taninsam');
const { moveH, moveT } = require('./movements');
const { serialize } = require('./serialize');

const visitedPositions = new Set();

module.exports = function(movements) {
  let positionH = { x: 0, y: 0 };
  let positionT = T.arrayFromValue(9)({ x: 0, y: 0 });
  record(positionT);

  for (const { direction, step } of movements) {
    for (let i = 1; i <= step; i++) {
      positionH = moveH(direction, positionH);
      positionT[0] = moveT(positionH, positionT[0]);

      for (let i = 1; i < positionT.length; i++) {
        positionT[i] = moveT(positionT[i - 1], positionT[i]);
      }

      record(positionT);
    }
  }

  return visitedPositions.size;
};

function record(positions) {
  visitedPositions.add(serialize(T.last()(positions)));
}
