const T = require('taninsam');

const monkeys = new Map();

const ME = 'humn';

module.exports = function(input) {
  for (const { monkey, left, operator, right, n } of input) {
    if (ME === monkey) {
      continue;
    }
    monkeys.set(monkey, { left, operator, right, n });
  }
  const { left, right } = monkeys.get('root');
  return solve(getMonkeyNumber(right), getMonkeyNumber(left));
};

function getMonkeyNumber(monkey) {
  if (ME === monkey) {
    return 'x';
  }

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
function operate(operator, left, right) {
  if (T.isString(left) || T.isString(right)) {
    return { left, operator, right };
  }
  if (T.isObject(left) || T.isObject(right)) {
    return { left, operator, right };
  }

  switch (operator) {
    case '+':
      return left + right;
    case '/':
      return left / right;
    case '-':
      return left - right;
    case '*':
      return left * right;
  }
  throw new Error(`Unkown operator ${operator}: ${left} ${operator} ${right}`);
}

/**
x + right = a  // idem * => /
x = a - right

x - right = a
x = a + right

left - x = a
x = left - a

x / right = a
x = a * right

left / x = a
x = left / a

 */
function solve(a, tree) {
  if ('x' === tree) {
    return a;
  }
  const recPart = T.isNumber(tree.left) ? tree.right : tree.left;
  return solve(partialSolve(tree.operator, a, tree.left, tree.right), recPart);
}
function partialSolve(operator, a, left, right) {
  const nPart = T.isNumber(left) ? left : right;
  if (['+', '*'].includes(operator)) {
    if ('+' === operator) {
      return a - nPart;
    }
    if ('*' === operator) {
      return a / nPart;
    }
  }
  if (['/', '-'].includes(operator)) {
    if (T.isNumber(right)) {
      if ('-' === operator) {
        return a + nPart;
      }
      if ('/' === operator) {
        return a * nPart;
      }
    }
    if (T.isNumber(left)) {
      if ('-' === operator) {
        return nPart - a;
      }
      if ('/' === operator) {
        return nPart / a;
      }
    }
  }
}
