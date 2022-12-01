const T = require('taninsam');
const { parseNumber } = require('../../tools');

module.exports = function(input, raw) {
  return T.chain(raw)
    .chain(rawToArray)
    .chain(T.map(T.map(parseNumber())))
    .value();
};

function rawToArray(raw) {
  const array = [];
  let current = [];
  for (const line of raw) {
    if ('' === line) {
      array.push(current);
      current = [];
    } else {
      current.push(line);
    }
  }
  array.push(current);
  return array;
}
