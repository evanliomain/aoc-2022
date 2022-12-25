const { snafuToDecimal, decimalToSnafu } = require('./utils');

describe('utils', () => {
  describe('snafuToDecimal', () => {
    it.each`
      Decimal      | SNAFU
      ${1}         | ${'1'}
      ${2}         | ${'2'}
      ${3}         | ${'1='}
      ${4}         | ${'1-'}
      ${5}         | ${'10'}
      ${6}         | ${'11'}
      ${7}         | ${'12'}
      ${8}         | ${'2='}
      ${9}         | ${'2-'}
      ${10}        | ${'20'}
      ${15}        | ${'1=0'}
      ${20}        | ${'1-0'}
      ${2022}      | ${'1=11-2'}
      ${12345}     | ${'1-0---0'}
      ${314159265} | ${'1121-1110-1=0'}
      ${4890}      | ${'2=-1=0'}
    `('$Decimal <==> $SNAFU', ({ Decimal, SNAFU }) => {
      expect(snafuToDecimal(SNAFU)).toEqual(Decimal);
    });
  });

  describe('decimalToSnafu', () => {
    it.each`
      Decimal      | SNAFU
      ${1}         | ${'1'}
      ${2}         | ${'2'}
      ${3}         | ${'1='}
      ${4}         | ${'1-'}
      ${5}         | ${'10'}
      ${6}         | ${'11'}
      ${7}         | ${'12'}
      ${8}         | ${'2='}
      ${9}         | ${'2-'}
      ${10}        | ${'20'}
      ${15}        | ${'1=0'}
      ${20}        | ${'1-0'}
      ${2022}      | ${'1=11-2'}
      ${12345}     | ${'1-0---0'}
      ${314159265} | ${'1121-1110-1=0'}
      ${4890}      | ${'2=-1=0'}
    `('$Decimal <==> $SNAFU', ({ Decimal, SNAFU }) => {
      expect(decimalToSnafu(Decimal)).toEqual(SNAFU);
    });
  });
});
