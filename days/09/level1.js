const { moveH, moveT } = require('./movements');
const { serialize } = require('./serialize');

const visitedPositions = new Set();

module.exports = function(movements) {
  let positionH = { x: 0, y: 0 };
  let positionT = { x: 0, y: 0 };
  record(positionT);

  for (const { direction, step } of movements) {
    for (let i = 1; i <= step; i++) {
      positionH = moveH(direction, positionH);
      positionT = moveT(positionH, positionT);
      record(positionT);
    }
  }

  return visitedPositions.size;
};

function record(position) {
  visitedPositions.add(serialize(position));
}
