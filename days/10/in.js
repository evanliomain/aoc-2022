const T = require('taninsam');
const { captureGroups, autoConvert } = require('../../tools');
const R = require('ramda');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(captureGroups(/(?<command>[a-z]+) ?(?<nb>-?\d+)?/)))
    .chain(T.map(autoConvert()))
    .chain(T.map(({ command, nb }) => ('noop' === command ? [0] : [0, nb])))
    .chain(T.flat())
    .chain(R.scan((a, b) => a + b, 1))
    .chain(T.map((value, i) => [i + 1, value]))
    .value();
};
