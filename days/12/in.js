const T = require('taninsam');
const { mapMatrix } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(T.split('')))
    .chain(
      mapMatrix((letter, x, y) => {
        if ('S' === letter) {
          return { elevation: 0, name: 'S' };
        }
        if ('E' === letter) {
          return { elevation: 25, name: 'E' };
        }
        return {
          elevation: letter.charCodeAt(0) - 'a'.charCodeAt(0),
          name: `${x},${y}`
        };
      })
    )
    .value();
};
