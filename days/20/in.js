const T = require('taninsam');
const { parseNumber } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(parseNumber()))
    .chain(T.map((value, id)=>({id, value})))
    .value();
};
