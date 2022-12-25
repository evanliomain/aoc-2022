const T = require('taninsam');
const { captureGroups, autoConvert } = require('../../tools');

/**
 * Parse input of the day
 * @param {string[]} input
 * @returns
 */
module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(T.split('')))
    // .chain(
    //   T.map(
    //     T.map(cell => (['>', '<', '^', 'v'].includes(cell) ? [cell] : cell))
    //   )
    // )
    .value();
};
