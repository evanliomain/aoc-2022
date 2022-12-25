const T = require('taninsam');
const { snafuToDecimal, decimalToSnafu } = require('./utils');

module.exports = function (input) {
  return T.chain(input)
    .chain(T.map(snafuToDecimal))
    .chain(T.sum())
    .chain(decimalToSnafu)
    .value();
};
