const T = require('taninsam');
const { captureGroups, autoConvert } = require('../../tools');

const parsingRegExp=/(?<monkey>[a-z]+): (?<n>\d+)?((?<left>[a-z]+) (?<operator>[+/*-]) (?<right>[a-z]+))?/

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(captureGroups(parsingRegExp)))
    .chain(T.map(autoConvert()))
    .value();
};
