const T = require('taninsam');

const CHALLENGER = { A: 'R', B: 'P', C: 'S' };

const YOU = { X: 'R', Y: 'P', Z: 'S' };

const SCORE = { R: 1, P: 2, S: 3 };

const PLAY = {
  R:{ R: 3, P: 0, S: 6 },
  P:{ R: 6, P: 3, S:0  },
  S:{ R: 0, P: 6, S: 3 },
}

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(([challenger, you]) => [CHALLENGER[challenger], YOU[you]]))
    .chain(T.map(([challenger, you]) => PLAY[you][challenger] + SCORE[you]))
    .chain(T.sum())
    .value();
};
