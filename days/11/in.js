const T = require('taninsam');
const YAML = require('yaml');
const { parseNumber } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.map(s => {
        if (!/Test/.test(s)) {
          return [s];
        }
        return [s, '  Rules:'];
      })
    )
    .chain(T.flat())
    .chain(T.join('\n'))
    .chain(s => YAML.parse(s))
    .chain(T.entries())
    .chain(
      T.map(([key, values]) => [
        key.slice(7),
        {
          items: T.chain(values['Starting items'])
            .chain(x => String(x))
            .chain(T.split(', '))
            .chain(T.map(parseNumber()))
            .value(),
          operation: T.chain(values['Operation'])
            .chain(x => String(x))
            .chain(x => x.slice(6))
            .value(),
          test: T.chain(values['Test'])
            .chain(x => String(x))
            .chain(x => x.slice(13))
            .chain(parseNumber())
            .value(),
          goToTrue: T.chain(values['Rules']['If true'])
            .chain(x => String(x))
            .chain(x => x.slice(16))
            .chain(parseNumber())
            .value(),
          goToFalse: T.chain(values['Rules']['If false'])
            .chain(x => String(x))
            .chain(x => x.slice(16))
            .chain(parseNumber())
            .value()
        }
      ])
    )
    .chain(
      T.map(([key, values]) => [
        key,
        {
          ...values,
          op: parseOperation(values.operation)
        }
      ])
    )
    .chain(T.fromEntries())
    .value();
};

function parseOperation(opStr) {
  if (opStr === 'old * old') {
    return old => old * old;
  }
  if (opStr.startsWith('old * ')) {
    const m = operand(opStr);
    return old => old * m;
  }
  if (opStr.startsWith('old + ')) {
    const m = operand(opStr);
    return old => old + m;
  }
  throw new Error('Unparseable op ' + opStr);
}
function operand(opStr) {
  return T.chain(opStr)
    .chain(s => s.slice(6))
    .chain(parseNumber())
    .value();
}
