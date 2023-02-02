const day = 24;
const parse = require('./in');
const solve = require('./level1');
const read = require('../../utils/read');

describe('24-1', () => {
  it.each`
    sample | expected
    ${1}   | ${18}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
