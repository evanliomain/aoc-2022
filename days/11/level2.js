const T = require('taninsam');
const { parseNumber } = require('../../tools');

/**
 *
 * @param {*} input
 * {
  "0": {
    "items": [
      79,
      98
    ],
    "operation": "old * 19",
    "test": 23,
    "goToTrue": 2,
    "goToFalse": 3
  },
 */

module.exports = function(input) {
  let nbRound = 10000;
  const nbMonkeys = T.chain(input)
    .chain(T.keys())
    .chain(T.map(parseNumber()))
    .chain(T.max())
    .value();
  const nbInspections = new Map(
    T.chain(input)
      .chain(T.keys())
      .chain(T.map(parseNumber()))
      .chain(T.map(m => [m, 0]))
      .value()
  );
  const modulus = T.chain(input)
    .chain(T.values())
    .chain(T.map(({ test }) => test))
    .chain(T.reduce((a, b) => a * b, 1))
    .value();

  for (let round = 1; round <= nbRound; round++) {
    for (let m = 0; m <= nbMonkeys; m++) {
      const { operation, test, goToTrue, goToFalse } = input[m];

      while (0 !== input[m].items.length) {
        increaseInspection(m);
        const item = input[m].items.shift();
        const worryLevel = eval(operation.replaceAll('old', item)) % modulus;
        if (0 === worryLevel % test) {
          input[goToTrue].items.push(worryLevel);
        } else {
          input[goToFalse].items.push(worryLevel);
        }
      }
    }
  }

  return T.chain(Array.from(nbInspections.values()))
    .chain(T.sortBy(x => x))
    .chain(T.reverse())
    .chain(T.take(2))
    .chain(([a, b]) => a * b)
    .value();

  function increaseInspection(m) {
    nbInspections.set(m, 1 + nbInspections.get(m));
  }
};
