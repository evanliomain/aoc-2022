const T = require('taninsam');
const { parseNumber } = require('../../tools');


module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(T.split()))
    .chain(T.map(T.map(parseNumber())))
    .value();
};
