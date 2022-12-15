const T = require('taninsam');
const { captureGroups, autoConvert } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(T.split(' -> ')))
    .chain(T.map(T.map(captureGroups(/(?<x>-?\d+),(?<y>-?\d+)/))))
    .chain(T.map(T.map(autoConvert())))
    .value();
};
