const T = require('taninsam');
const { makeGraph } = require('./make-graph');

/**
 *
 * @param {*} input A matrix with cell: { elevation: 0, name: 'S' }
 * @returns
 */

module.exports = function(input) {
  return T.chain(input)
    .chain(makeGraph)
    .chain(route => route.path('S', 'E'))
    .chain(T.length())
    .chain(x => x - 1)
    .value();
};
