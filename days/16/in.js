const T = require('taninsam');
const { captureGroups, autoConvert } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.map(
        captureGroups(
          /^Valve (?<valve>\D+) has flow rate=(?<rate>\d+); tunnels? leads? to valves? (?<connect>.*)$/
        )
      )
    )
    .chain(T.map(autoConvert()))
    .chain(T.map(line => ({ ...line, connect: line.connect.split(', ') })))
    .chain(
      T.map(({ valve, rate, connect }) => [valve, { rate, valves: connect }])
    )
    .chain(T.fromEntries())
    .value();
};
