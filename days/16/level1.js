const T = require('taninsam');
const Graph = require('node-dijkstra');

/**
 *
 * @param {{[string]: {rate:number, valves:string[]}}} input
 * @returns
 */
module.exports = function(input) {
  const rates = T.chain(input)
    .chain(T.entries())
    .chain(T.map(([key, { rate }]) => [key, rate]))
    .chain(T.fromEntries())
    .value();
  const route = T.chain(input)
    .chain(T.entries())
    .chain(
      T.map(([key, { valves }]) => [
        key,
        T.chain(valves)
          .chain(T.map(valve => [valve, 1]))
          .chain(T.fromEntries())
          .value()
      ])
    )
    .chain(T.fromEntries())
    .chain(g => new Graph(g))
    .value();

  const next = nexter(route, rates);

  const nodes = T.chain(input)
    .chain(T.keys())
    .chain(T.filter(n => 0 !== rates[n]))
    .value();

  const nbTurns = nodes.length;

  return T.chain([{ root: 'AA', countDown: 30, total: 0, nodes }])
    .chain(
      T.loopFor(nbTurns, P =>
        T.chain(P)
          .chain(T.map(next))
          .chain(T.flat())
          .chain(T.sortBy(({ total }) => -1 * total))
          .chain(T.take(100))
          .value()
      )
    )
    .chain(T.take(1))
    .chain(T.map(({ total }) => total))
    .chain(T.head())
    .value();
};
function nexter(route, rates) {
  return ({ root, countDown, total, nodes }) =>
    T.chain(nodes)
      .chain(T.filter(n => n !== root))
      .chain(T.filter(n => 0 !== rates[n]))
      .chain(T.map(node => ({ node })))
      .chain(T.map(p => ({ ...p, rate: rates[p.node] })))
      .chain(T.map(p => ({ ...p, nodes: nodes.filter(n => n !== p.node) })))
      .chain(T.map(p => ({ ...p, path: route.path(root, p.node) })))
      .chain(T.map(p => ({ ...p, len: p.path.length })))
      .chain(T.map(p => ({ ...p, countDown: countDown - p.len })))
      .chain(T.map(p => ({ ...p, countDown: Math.max(0, p.countDown) })))
      .chain(T.map(p => ({ ...p, p: p.rate * p.countDown })))
      .chain(T.map(p => ({ ...p, total: total + p.p })))
      .chain(T.map(p => ({ ...p, root: p.node })))
      .chain(T.sortBy(({ p }) => -1 * p))
      .value();
}
