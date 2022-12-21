const T = require('taninsam');

const monkeys = new Map();

module.exports = function(input) {
  for (const { monkey, left, operator, right, n } of input) {
    monkeys.set(monkey, { left, operator, right, n });
  }
  return getMonkeyNumber('root');
};

function getMonkeyNumber(monkey) {
  const { left, operator, right, n } = monkeys.get(monkey);
  if (!T.isNil(n)) {
    return n;
  }

  const nLeft = getMonkeyNumber(left);
  const nRight = getMonkeyNumber(right);
  const result = operate(operator, nLeft, nRight);
  monkeys.set(monkey, { left, operator, right, n: result });
  return result;
}
function operate(operator, nLeft, nRight) {
  switch (operator) {
    case '+':
      return nLeft + nRight;
    case '/':
      return nLeft / nRight;
    case '-':
      return nLeft - nRight;
    case '*':
      return nLeft * nRight;
  }
  throw new Error(
    `Unkown operator ${operator}: ${nLeft} ${operator} ${nRight}`
  );
}
