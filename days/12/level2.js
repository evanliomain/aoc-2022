const T = require('taninsam');
const { makeGraph } = require('./make-graph');

/**
 *
 * @param {*} input A matrix with cell: { elevation: 0, name: 'S' }
 * @returns
 */

module.exports = function(input) {
  const graph = makeGraph(input);

  return T.chain(input)
    .chain(T.flat())
    .chain(T.filter(({ elevation }) => 0 === elevation))
    .chain(T.map(({ name }) => name))
    .chain(
      T.map(name => {
        const route = graph.path(name, 'E');
        if (Array.isArray(route)) {
          return route.length - 1;
        }
        return 999;
      })
    )
    .chain(T.min())
    .value();
};
