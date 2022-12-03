/**
 * Pack elements of an array by n.
 * For example, [A, B, C, D, E, F] with pack(3) become:
 * [[A, B, C], [D, E, F]]
 * @param n the number of items to pack together.
 */
module.exports = function pack(n) {
  return array => {
    if (!Array.isArray(array)) {
      throw new Exception('Attempt to use pack on a non array ' + typeof array);
    }
    if (0 !== array.length % n) {
      throw new Exception(
        `Attempt pack an array by ${n}, but the array has a length of ${array.length}`
      );
    }
    const result = [];
    for (let i = 0; i < array.length; i += n) {
      const paquet = [];
      for (let j = 0; j < n; j++) {
        paquet.push(array[i + j]);
      }
      result.push(paquet);
    }
    return result;
  };
};
