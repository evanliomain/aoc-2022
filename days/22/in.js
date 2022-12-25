const T = require('taninsam');
const { parseNumber, mapMatrix } = require('../../tools');

/**
 * Parse input of the day
 * @param {string[]} input
 * @returns
 */
module.exports = function(input) {
  const dirs = input.splice(input.length - 1, 1)[0];

  return {
    map: parseMap(input),
    directions: parseDirections(dirs)
  };
};
function parseMap(input) {
  return T.chain(input)
    .chain(T.map(T.split('')))
    .chain(mapMatrix((c, x, y) => ({ c, x, y })))
    .chain(T.map(T.filter(({ c }) => ' ' !== c)))
    .value();
}

function parseDirections(directions) {
  const parseDirections = [];
  let currentCharacter = '';

  for (const direction of directions) {
    if (/\d/.test(direction)) {
      currentCharacter += direction;
    } else {
      parseDirections.push(parseNumber()(currentCharacter), direction);
      currentCharacter = '';
    }
  }
  if ('' !== currentCharacter) {
    parseDirections.push(parseNumber()(currentCharacter));
  }
  return parseDirections;
}
