const T = require('taninsam');
const { captureGroups, autoConvert } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(captureGroups(/(?<direction>\D) (?<step>\d+)/)))
    .chain(T.map(autoConvert()))
    .value();
};
