/**
 * Retour la couleur située sur le gradient entre startColor et endColor
 * Position déterminé par value situé entre 0 et total
 * 0 aura la couleur startColor
 * total aura la couleur endColor
 *
 * @param {color en hexa} startColor
 * @param {color en hexa} endColor
 * @param {number} total
 * @param {number} value
 * @returns
 */
module.exports = function gradient(
  startColor = '#ffffbf',
  endColor = '#a50026'
) {
  const start = hexToRGB(startColor);
  const end = hexToRGB(endColor);

  return (total, value) => {
    const color = j =>
      Math.floor(start[j] + (value / total) * (end[j] - start[j]));

    return colorToHex({ red: color('r'), green: color('g'), blue: color('b') });
  };
};

function colorToHex({ red, green, blue }) {
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}
function toHex(n) {
  return Number(n)
    .toString(16)
    .padStart(2, '0');
}
function hexToRGB(color) {
  if (4 === color.length) {
    return {
      r: parseInt(color[1] + color[1], 16),
      g: parseInt(color[2] + color[2], 16),
      b: parseInt(color[3] + color[3], 16)
    };
  }
  if (7 === color.length) {
    return {
      r: parseInt(color[1] + color[2], 16),
      g: parseInt(color[3] + color[4], 16),
      b: parseInt(color[5] + color[6], 16)
    };
  }
  throw `Unsupported color ${color}`;
}
