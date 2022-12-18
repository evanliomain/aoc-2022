const T = require('taninsam');
const { patternMatching, constante } = require('../../tools');

module.exports = function(input) {
  return T.chain(input[0])
    .chain(T.split(''))
    .chain(T.map(patternMatching(['>', constante(1)], ['<', constante(-1)])))
    .value();
};
