const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.filter(
        ({ min1, min2, max1, max2 }) =>
          (min1 <= min2 && min2 <= max1) || (min2 <= min1 && min1 <= max2)
      )
    )
    .chain(T.length())
    .value();
};
