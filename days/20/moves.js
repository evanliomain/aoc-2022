function moveRight(circle, id) {
  const { previous, next, value } = circle.get(id);
  const nextnext = circle.get(next).next;

  setNext(circle, id, nextnext);
  setPrevious(circle, id, next);

  setNext(circle, next, id);
  setPrevious(circle, next, previous);

  setPrevious(circle, nextnext, id);

  setNext(circle, previous, next);
}
exports.moveRight = moveRight;
function moveLeft(circle, id) {
  const { previous, next } = circle.get(id);
  const previousprevious = circle.get(previous).previous;

  setNext(circle, id, previous);
  setPrevious(circle, id, previousprevious);

  setNext(circle, previousprevious, id);

  setNext(circle, previous, next);
  setPrevious(circle, previous, id);

  setPrevious(circle, next, previous);
}
exports.moveLeft = moveLeft;
function setNext(circle, id, next) {
  const { previous, value } = circle.get(id);
  circle.set(id, { value, previous, next });
}
function setPrevious(circle, id, previous) {
  const { next, value } = circle.get(id);
  circle.set(id, { value, previous, next });
}
