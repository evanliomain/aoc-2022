function buildCircle(NB_ELEMENT, input) {
  const circle = new Map();
  for (let i = 0; i < NB_ELEMENT; i++) {
    const item = input.at(i);
    const next = input.at((i + 1) % NB_ELEMENT);
    const previous = input.at(i - 1);
    circle.set(item.id, {
      value: item.value,
      next: next.id,
      previous: previous.id
    });
  }
  return circle;
}
exports.buildCircle = buildCircle;
