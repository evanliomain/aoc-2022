const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input[0])
    .chain(T.split())
    .value();
};
