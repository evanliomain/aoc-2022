const T = require('taninsam');
const { stringToArray } = require('./string-to-array');

const rocks = T.chain([
  `
..####
`,
  `
...#.
..###
...#.
`,
  `
....#
....#
..###
`,
  `
..#
..#
..#
..#
`,
  `
..##
..##
`
])
  .chain(T.map(stringToArray))
  .value();
exports.rocks = rocks;
