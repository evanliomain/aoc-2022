const day = 1;
const parse = require('./in');
const solve = require('./level2');
const readRaw = require('../../utils/read-raw');

describe('01-2', () => {
  it.each`
    sample | expected
    ${1}   | ${45000}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(null,readRaw(day)(sample)))).toEqual(expected);
  });
});
