const T = require('taninsam');
const { captureGroups, autoConvert } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.map(
        captureGroups(/^(?<min1>\d+)-(?<max1>\d+),(?<min2>\d+)-(?<max2>\d+)$/)
      )
    )
    .chain(T.map(autoConvert()))
    .value();
};
