const T = require('taninsam');
const { captureGroups, autoConvert } = require('../../tools');
const { distance } = require('./distance');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.map(
        captureGroups(
          /Sensor at x=(?<sx>-?\d+), y=(?<sy>-?\d+): closest beacon is at x=(?<bx>-?\d+), y=(?<by>-?\d+)/
        )
      )
    )
    .chain(T.map(autoConvert()))
    .chain(
      T.map(({ sx, sy, bx, by }) => ({
        sx,
        sy,
        bx,
        by,
        d: distance({ x: sx, y: sy }, { x: bx, y: by })
      }))
    )
    .value();
};
