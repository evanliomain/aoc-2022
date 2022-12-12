const T = require('taninsam');
const { mapMatrix } = require('../../tools');
const Graph = require('node-dijkstra');
const { neighboors } = require('./neighboors');

function makeGraph(input) {
  const next = neighboors(input);
  return T.chain(input)
    .chain(mapMatrix((node, x, y) => ({ ...node, near: next({ x, y }) })))
    .chain(
      mapMatrix(node => ({
        ...node,
        near: node.near.filter(
          ({ elevation }) => elevation <= node.elevation + 1
        )
      }))
    )
    .chain(
      mapMatrix(({ name, near }) => [
        name,
        T.chain(near)
          .chain(T.map(n => [n.name, 1]))
          .chain(T.fromEntries())
          .value()
      ])
    )
    .chain(T.flat())
    .chain(T.fromEntries())
    .chain(x => new Graph(x))
    .value();
}
exports.makeGraph = makeGraph;
