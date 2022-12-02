const T = require('taninsam');

const CHALLENGER = { A: 'R', B: 'P', C: 'S' };

const SCORE = { R: 1, P: 2, S: 3 };

const END = { X: 0, Y: 3, Z: 6 };

const YOU = {
  R: { 0: 'S', 3: 'R', 6: 'P' },
  P: { 0: 'R', 3: 'P', 6: 'S' },
  S: { 0: 'P', 3: 'S', 6: 'R' }
};

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(([challenger, end]) => [CHALLENGER[challenger], END[end]]))
    .chain(
      T.map(([challenger, score]) => SCORE[YOU[challenger][score]] + score)
    )
    .chain(T.sum())
    .value();
};
