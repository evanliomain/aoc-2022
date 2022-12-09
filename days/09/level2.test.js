const day = 9;
const parse = require('./in');
const solve = require('./level2');
const read = require('../../utils/read');

describe('09-2', () => {
  it.each`
    sample | expected
    ${1}   | ${1}
    ${2}   | ${36}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(read(day)(sample)))).toEqual(expected);
  });
});
