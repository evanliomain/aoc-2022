const day = 18;
const parse = require('./in');
const solve = require('./level1');
const read = require('../../utils/read');

describe('18-1', () => {
  it.each`
    sample | expected
    ${1}   | ${10}
    ${2}   | ${64}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
