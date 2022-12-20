const { moveRight, moveLeft } = require('./moves');

function mix(NB_ELEMENT, sequence, circle) {
  for (let id = 0; id < NB_ELEMENT; id++) {
    // console.log('--', id);
    const value = sequence.get(id);

    let movingTime = Math.abs(value);
    if (NB_ELEMENT <= movingTime) {
      movingTime %= NB_ELEMENT - 1;
    }

    if (1 === Math.sign(value)) {
      for (let i = 0; i < movingTime; i++) {
        moveRight(circle, id);
      }
    } else {
      for (let i = 0; i < movingTime; i++) {
        moveLeft(circle, id);
      }
    }
  }
}
exports.mix = mix;
