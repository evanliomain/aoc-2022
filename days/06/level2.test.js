const day = 6;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('06-2', () => {
  it.each`
    sample | expected
    ${1}   | ${19}
    ${2}   | ${23}
    ${3}   | ${23}
    ${4}   | ${29}
    ${5}   | ${26}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
