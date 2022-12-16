const T = require('taninsam');
/**
 *
 * @param {{ "sx": number, "sy": number, "bx": number, "by": number, "d": number}[]} input
 * @returns
 */
function getBounds(input) {
  const xCoords = T.chain(input)
    .chain(T.map(({ sx, bx, d }) => [sx, bx, sx - d, sx + d]))
    .chain(T.flat())
    .value();
  const xMin = Math.min(...xCoords);
  const xMax = Math.max(...xCoords);
  const yCoords = T.chain(input)
    .chain(T.map(({ sy, by }) => [sy, by]))
    .chain(T.flat())
    .value();
  const yMin = Math.min(...yCoords);
  const yMax = Math.max(...yCoords);

  return { xMin, xMax, yMin, yMax };
}
exports.getBounds = getBounds;
