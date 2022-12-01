const T = require('taninsam');
const mapMatrix = require('./map-matrix');
const fs = require('fs');
const svgToPng = require('../utils/svg-to-png');

/**
 * matrix can be a matrix, or a simple dimension object {height,width}
 */
module.exports = function printMatrixToFile(printCell) {
  return (filename, coeff = 1, printSvg = false) => async matrix => {
    let height;
    let width;
    let toLayer;
    if (T.isArray(matrix) && T.isArray(matrix[0])) {
      // It's a regular 2D matrix
      height = matrix.length;
      width = matrix[0].length;
      toLayer = toLayerMatrix;
    } else if (!T.isNil(matrix.height) && !T.isNil(matrix.width)) {
      // It's a dimension object {height, width}
      height = matrix.height;
      width = matrix.width;
      toLayer = toLayerDimension;
    }

    const finalHeight = coeff * height;
    const finalWidth = coeff * width;

    const svg = T.chain(printCell)
      .chain(T.unless(T.isArray, p => [p]))
      .chain(T.map(toLayer(matrix)))
      .chain(mergeLayers({ height, width, coeff }))
      .value();

    fs.mkdirSync('output', { recursive: true });
    if (printSvg) {
      await Promise.resolve(svg)
        .then(svg => fs.writeFileSync(`output/${filename}.svg`, svg))
        .then(() => matrix);
    }

    return await svgToPng({ width: finalWidth, height: finalHeight })(svg)
      .then(png => fs.writeFileSync(`output/${filename}.png`, png))
      .then(() => matrix);
  };
};

function toLayerMatrix(matrix) {
  return printer =>
    T.chain(matrix)
      .chain(mapMatrix((cell, x, y) => renderToSvg(printer(cell, x, y), x, y)))
      .chain(T.map(T.join('\n')))
      .chain(T.join('\n'))
      .value();
}
function toLayerDimension({ height, width }) {
  return printer => {
    const finalPrint = [];
    for (let y = 0; y < height; y++) {
      const line = [];
      for (let x = 0; x < width; x++) {
        line.push(renderToSvg(printer({ x, y }), x, y));
      }

      finalPrint.push(line.join(''));
    }
    return finalPrint.join('\n');
  };
}

function renderToSvg(render, x, y) {
  if (T.isNil(render) || '' === render) {
    return '';
  }
  if (T.isString(render)) {
    return `<rect width="1" height="1" x="${x}" y="${y}" fill="${render}" />`;
  }
  if (T.isObject(render)) {
    let printed = '';
    if (!T.isNil(render.background)) {
      printed += `<rect width="1" height="1" x="${x}" y="${y}" fill="${render.background}"/>`;
    }
    let stroke = '';
    if (!T.isNil(render.stroke)) {
      stroke = `stroke="${render.stroke}" stroke-width="0.05"`;
    }
    let opacity = '';
    if (!T.isNil(render.opacity)) {
      opacity = `opacity="${render.opacity}"`;
    }

    if ('rect' === render.shape) {
      let scale = 1;

      if (!T.isNil(render.scale)) {
        scale = render.scale;
      }

      printed += `<rect width="1" height="1" x="${x}" y="${y}"`;
      printed += ` transform="scale(${scale}) translate(${x + 0.5}, ${y +
        0.5})"`;
    }

    if ('circle' === render.shape) {
      let scale = 1;
      if (!T.isNil(render.scale)) {
        scale = render.scale;
      }
      printed += `<circle cx="${x + 0.5}" cy="${y + 0.5}" r="${0.5 * scale}"`;
    }

    if ('triangle-up' === render.shape) {
      printed += `<path d="M${x + 0.5},${y} l-0.5,1 h1z"`;

      // transform = 'scale(0.8) translate(0.1, 0.1)';
    }
    if ('triangle-down' === render.shape) {
      printed += `<path d="M${x + 0.5},${y + 1} l-0.5,-1 h1z"`;
    }
    if ('triangle-left' === render.shape) {
      printed += `<path d="M${x},${y + 0.5} l1,0.5 v-1z"`;
    }
    if ('triangle-right' === render.shape) {
      printed += `<path d="M${x + 1},${y + 0.5} l-1,0.5 v-1z"`;
    }

    if (
      [
        'rect',
        'circle',
        'triangle-up',
        'triangle-down',
        'triangle-left',
        'triangle-right'
      ].includes(render.shape)
    ) {
      printed += ` fill="${render.fill}"`;
      printed += ` ${stroke}`;
      printed += ` ${opacity}`;
      printed += ' />';
    }

    if ('text' === render.shape) {
      printed += `
        <g transform="translate(${x}, ${y})">
          <text x="0"  y="0" fill="${render.fill}" ${opacity} transform="scale(0.07) translate(2, 12)">${render.text}</text>
        </g>
      `;
    }

    if ('key' === render.shape) {
      printed += `
      <g transform="translate(${x}, ${y}) scale(0.1) ">
        <path
          transform="scale(0.45) translate(-1, -3)"
          d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
          fill="${render.fill}"
        />
      `;

      if (!T.isNil(render.text)) {
        printed += `<text x="0"  y="0" fill="${render.fill}" transform="scale(0.3) translate(15,32)">${render.text}</text>`;
      }

      printed += `</g>`;
    }

    if ('door' === render.shape) {
      printed += `
        <g transform="translate(${x}, ${y})">
          <path transform="scale(0.055) translate(-3, -3)"
            d="M8 3c-1.11 0-2 .89-2 2v16h12V5c0-1.11-.89-2-2-2H8m0 2h8v14H8V5m5 6v2h2v-2h-2z" fill="${render.fill}" />
        `;

      if (!T.isNil(render.text)) {
        printed += `<text x="0"  y="10" fill="${render.fill}" transform="scale(0.025) translate(12, 23)">${render.text}</text>`;
      }
      printed += `</g>`;
    }

    return printed;
  }
}

function mergeLayers({ height, width, coeff }) {
  return layers => {
    const finalHeight = coeff * height;
    const finalWidth = coeff * width;

    return `
      <svg viewBox="0 0 ${width} ${height}" width="${finalWidth}" height="${finalHeight}">

        <rect width="${width}" height="${height}" x="0" y="0" fill="black"/>
        ${T.chain(layers)
          .chain(T.map(layer => `<g>${layer}</g>`))
          .chain(T.join('\n'))
          .value()}
      </svg>
    `;
  };
}
