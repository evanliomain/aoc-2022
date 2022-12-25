const T = require('taninsam');
const { parseNumber } = require('../../tools');

function snafuToDecimal(snafu) {
  return T.chain(snafu)
    .chain(T.reverse())
    .chain(T.split())
    .chain(T.map(digit => ('-' === digit ? '-1' : digit)))
    .chain(T.map(digit => ('=' === digit ? '-2' : digit)))
    .chain(T.map(parseNumber()))
    .chain(
      T.reduce(
        ({ power, decimal }, digit) => ({
          power: 5 * power,
          decimal: decimal + digit * power
        }),
        { power: 1, decimal: 0 }
      )
    )
    .chain(({ decimal }) => decimal)
    .value();
}
exports.snafuToDecimal = snafuToDecimal;

function decimalToSnafu(n) {
  let exponent = 0;
  let power = 1;

  while (0 <= n - 5 * power) {
    exponent++;
    power *= 5;
  }
  let reminder = n;
  let decomposition = [];
  for (let i = exponent; 0 <= i; i--) {
    const q = Math.floor(reminder / power);
    reminder -= q * power;
    power /= 5;
    decomposition.push({ exponent: i, q });
  }

  while (has4Or3(decomposition)) {
    decomposition = T.chain(decomposition)
      .chain(T.map(explode4N3))
      .chain(T.flat())
      .chain(T.partition(({ exponent }) => exponent))
      .chain(
        T.map(
          T.reduce(({ exponent, q }, current) => ({
            exponent,
            q: q + current.q
          }))
        )
      )
      .value();
  }

  return T.chain(decomposition)
    .chain(T.sortBy(({ exponent }) => -1 * exponent))
    .chain(T.map(({ q }) => q))
    .chain(T.map(digit => (-1 === digit ? '-' : digit)))
    .chain(T.map(digit => (-2 === digit ? '=' : digit)))
    .chain(T.join(''))
    .value();
}
exports.decimalToSnafu = decimalToSnafu;

function has4Or3(decomposition) {
  return decomposition.some(({ q }) => 4 === q || 3 === q);
}

function explode4N3({ exponent, q }) {
  if (4 === q) {
    return [
      { exponent: 1 + exponent, q: 1 },
      { exponent, q: -1 }
    ];
  }
  if (3 === q) {
    return [
      { exponent: 1 + exponent, q: 1 },
      { exponent, q: -2 }
    ];
  }
  return [{ exponent, q }];
}
