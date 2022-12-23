const T = require('taninsam');

/**
 * Parse input of the day
 * @param {string[]} input
 * @returns
 */
module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(T.split('')))
    .value();
};
