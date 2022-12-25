const T = require('taninsam');
const { captureGroups, autoConvert } = require('../../tools');

/**
 * Parse input of the day
 * @param {string[]} input
 * @returns
 */
module.exports = function(input) {
  return T.chain(input)
    .value();
};
