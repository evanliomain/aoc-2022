const T = require('taninsam');

module.exports = function (input) {
  const n = 4;
  return (
    n +
    input.findIndex((_, i, array) => n === new Set(array.slice(i, i + n)).size)
  );
};
