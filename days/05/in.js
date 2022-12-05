const T = require('taninsam');
const { captureGroups, autoConvert } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.partition(line => /^move/.test(line)))
    .chain(([stacks, moves]) => ({
      stacks: T.chain(stacks)
        .chain(T.reverse())
        .chain(([head, ...crates]) => ({
          nbStack: T.chain(head)
            .chain(captureGroups(/(?<nb>\d+)\s*$/))
            .chain(autoConvert())
            .chain(({ nb }) => nb)
            .value(),
          crates
        }))
        .value(),
      moves: moves
        .map(captureGroups(/^move (?<nb>\d+) from (?<from>\d+) to (?<to>\d+)$/))
        .map(autoConvert())
        .map(({ nb, from, to }) => ({ nb, from: from - 1, to: to - 1 }))
    }))
    .chain(({ stacks, moves }) => ({
      moves,
      stacks: T.chain(stacks.crates)
        .chain(T.map(splitLine(stacks.nbStack)))
        .chain(arrange)
        .value()
    }))
    .value();
};

function splitLine(nb) {
  return line => {
    const result = [];
    for (let i = 1; i < 4 * nb - 1; i += 4) {
      const element = line[i];
      if (undefined !== element && ' ' !== element) {
        result.push(element);
      } else {
        result.push(null);
      }
    }
    return result;
  };
}

function arrange(stacks) {
  const [head, ...tail] = stacks;
  const columns = head.map(h => [h]);
  tail.forEach(line => {
    for (let i = 0; i < line.length; i++) {
      const element = line[i];
      if (null !== element) {
        columns[i].push(element);
      }
    }
  });

  return columns;
}
