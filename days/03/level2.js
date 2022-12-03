const T = require('taninsam');
const { pack } = require('../../tools');
const { score } = require('./score');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(items => new Set(items)))
    .chain(pack(3))
    .chain(
      T.map(([_1, _2, _3]) => {
        for (const item1 of _1) {
          if (_2.has(item1) && _3.has(item1)) {
            return item1;
          }
        }
      })
    )
    .chain(T.map(score))
    .chain(T.sum())
    .value();
};
