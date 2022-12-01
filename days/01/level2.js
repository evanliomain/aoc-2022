const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(T.sum()))
    .chain(T.sortBy(x => x))
    .chain(T.reverse())
    .chain(T.take(3))
    .chain(T.sum())
    .value();
};
