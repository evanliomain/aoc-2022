/**
 * @param {any[]} array
 * @returns a function that pick an element in the array, and restart at begin
 */
function pickAt(array) {
  return i => array[i % array.length];
}
exports.pickAt = pickAt;
