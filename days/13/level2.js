const T = require('taninsam');
const { isInRightOrder } = require('./is-in-right-order');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.push([[2]]))
    .chain(T.push([[6]]))
    .chain(T.sort((a, b) => (isInRightOrder(a, b) ? -1 : 1)))
    .chain(T.map(x => JSON.stringify(x, null, 0)))
    .chain(
      T.map((line, i) => ('[[2]]' === line || '[[6]]' === line ? 1 + i : 1))
    )
    .chain(T.reduce((a, b) => a * b, 1))
    .value();
};
