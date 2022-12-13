const T = require('taninsam');
const { pack } = require('../../tools');
const { isInRightOrder } = require('./is-in-right-order');

module.exports = function(input) {
  return T.chain(input)
    .chain(pack(2))
    .chain(
      T.map(([left, right], i) => (isInRightOrder(left, right) ? 1 + i : 0))
    )
    .chain(T.sum())
    .value();
};
