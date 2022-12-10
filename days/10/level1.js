const T = require('taninsam');
const { pickByIndex } = require('../../tools');

const cycles = T.arrayFromValue(6)(1).map((_, i) => 20 + i * 40);

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(([cycle, x]) => cycle * x))
    .chain(pickByIndex(...cycles.map(i => i - 1)))
    .chain(T.sum())
    .value();
};
