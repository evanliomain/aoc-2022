const T = require('taninsam');
const chalk = require('chalk');
const { pack, printMatrix } = require('../../tools');

const lineLength = 40;
const hasSprite = ([cycle, position]) =>
  [0, 1, 2].map(i => i + position).includes(cycle % lineLength);

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(hasSprite))
    .chain(pack(lineLength))
    .chain(printMatrix(x => (x ? chalk.bgBlack(' ') : chalk.bgWhite(' '))))
    .value();
};
