const day = 15;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('15-2', () => {
  it.each`
    sample | expected
    ${1}   | ${56000011}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
