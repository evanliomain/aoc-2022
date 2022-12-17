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
  const findPath = finderPath(next);

  const nodes = T.chain(input)
    .chain(T.keys())
    .chain(T.filter(n => 0 !== rates[n]))
    .value();

  // On essai d'optimiser le nombre de combinaison minimum
  const minCombi = nodes.length <= 7 ? 3 : 7;
  const combinaisons = divide2(nodes).filter(
    ([p1, p2]) => minCombi <= p1.length && minCombi <= p2.length
  );

  return T.chain(combinaisons)
    .chain(T.map(([part1, part2], i) => [findPath(part1), findPath(part2)]))
    .chain(T.map(([total1, total2], i) => total1 + total2))
    .chain(T.max())
    .value();
};

function finderPath(next) {
  return nodes => {
    const nbTurns = nodes.length;
    return T.chain([{ root: 'AA', countDown: 26, total: 0, nodes }])
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
}

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

function divide2(n) {
  const uni = new Set();
  return divide2Rec(n);

  function divide2Rec(nodes) {
    let combi = [];
    for (let i = 1; i < nodes.length; i++) {
      const other = nodes.slice();
      const element = other.splice(i, 1);

      const elstr = element.sort().join(',');
      // const element = nodes[i];
      // const other = nodes.filter((_, j) => i !== j);

      if (!uni.has(elstr)) {
        uni.add(elstr);
        combi.push([element, other]);
        // combi.push([[element], other]);
        otherCombi = divide2Rec(other);
        combi.push(
          ...otherCombi
            .map(([p1, p2]) => [
              [[...element, ...p1], p2],
              [[...element, ...p2], p1]
            ])
            .flat()
        );
      }
      // combi = T.chain(combi)
      //   .chain(T.map(([p1, p2]) => [p1.sort(), p2.sort()]))
      //   .chain(
      //     T.uniq(([p1, p2]) => {
      //       const p1s = p1.join(',');
      //       const p2s = p2.join(',');
      //       return p1s < p2s ? p1s + '-' + p2s : p2s + '-' + p1s;
      //     })
      //   )
      //   .value();
    }
    return combi;
  }
}
