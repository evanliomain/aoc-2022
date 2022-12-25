function turn(currentDirection, direction) {
  return {
    '>': { R: 'v', L: '^' },
    v: { R: '<', L: '>' },
    '<': { R: '^', L: 'v' },
    '^': { R: '>', L: '<' }
  }[currentDirection][direction];
}
exports.turn = turn;
