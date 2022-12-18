/**
 * Return a function that return always the same value
 * @param {any} value
 * @returns a function that return value
 */
module.exports = function constante(value) {
  return () => value;
};
