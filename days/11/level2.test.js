const day = 11;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('11-2', () => {
  it.each`
    sample | expected
    ${1}   | ${2713310158}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
