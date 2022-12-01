const day = 1;
const parse = require('./in');
const solve = require('./level1');
const readRaw = require('../../utils/read-raw');

describe('01-1', () => {
  it.each`
    sample | expected
    ${1}   | ${24000}
  `('returns $expected for sample $sample', ({ sample, expected }) => {
    expect(solve(parse(null,readRaw(day)(sample)))).toEqual(expected);
  });
});
