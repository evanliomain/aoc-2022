function buildSequence(input) {
  const sequence = new Map();
  input.forEach(({ id, value }) => {
    sequence.set(id, value);
  });
  return sequence;
}
exports.buildSequence = buildSequence;
