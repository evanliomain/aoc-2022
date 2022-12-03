const T = require('taninsam');
const { score } = require('./score');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.map(items => [
        items.slice(0, items.length / 2),
        items.slice(items.length / 2)
      ])
    )
    .chain(T.map(([left, right]) => [new Set(left), right]))
    .chain(T.map(([left, right]) => right.find(item => left.has(item))))
    .chain(T.map(score))
    .chain(T.sum())
    .value();
};
