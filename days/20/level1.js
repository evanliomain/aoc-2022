const T = require('taninsam');
const { buildCircle } = require('./buildCircle');
const { buildSequence } = require('./buildSequence');
const { getId0 } = require('./getId0');
const { groove } = require('./groove');
const { mix } = require('./mix');

/**
 *
 * @param {{id: number; value:number}[]} input
 * @returns
 */
module.exports = function(input) {
  const NB_ELEMENT = input.length;
  const sequence = buildSequence(input);
  const id0 = getId0(input);
  const circle = buildCircle(NB_ELEMENT, input);

  mix(NB_ELEMENT, sequence, circle);

  return T.chain(groove(id0, circle))
    .chain(T.sum())
    .value();
};

function logCircle(id0, circle) {
  let currentId = id0;
  const stack = [];
  do {
    const { next, value } = circle.get(currentId);
    stack.push(value);
    currentId = next;
  } while (currentId !== id0);
  console.log(stack.join(', '));
}
