const T = require('taninsam');
const { mapMatrix } = require('../../tools');

function stringToArray(s) {
  return T.chain(s)
    .chain(T.split('\n'))
    .chain(T.filter(T.not(T.isEmpty)))
    .chain(T.reverse())
    .chain(T.map(T.split('')))
    .chain(mapMatrix((c, x, y) => ({ c, x, y })))
    .chain(T.flat())
    .chain(T.filter(({ c }) => '.' !== c))
    .chain(T.map(({ x, y }) => ({ x, y })))
    .value();
}
exports.stringToArray = stringToArray;
