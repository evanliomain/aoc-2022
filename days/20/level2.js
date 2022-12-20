const T = require('taninsam');
const { buildCircle } = require('./buildCircle');
const { buildSequence } = require('./buildSequence');
const { getId0 } = require('./getId0');
const { groove } = require('./groove');
const { mix } = require('./mix');

const DECRYPTION_KEY = 811589153;
/**
 *
 * @param {{id: number; value:number}[]} input
 * @returns
 */
module.exports = function(input) {
  const decryptedInput = input.map(({ id, value }) => ({
    id,
    value: value * DECRYPTION_KEY
  }));

  const NB_ELEMENT = decryptedInput.length;
  const sequence = buildSequence(decryptedInput);
  const id0 = getId0(decryptedInput);
  const circle = buildCircle(NB_ELEMENT, decryptedInput);

  for (let i = 1; i <= 10; i++) {
    mix(NB_ELEMENT, sequence, circle);
  }

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
