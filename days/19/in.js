const T = require('taninsam');
const { captureGroups, autoConvert } = require('../../tools');

const parseRegExp = /Blueprint (?<id>\d+): Each ore robot costs (?<oreCostOre>\d+) ore\. Each clay robot costs (?<clayCostOre>\d+) ore\. Each obsidian robot costs (?<obsidianCostOre>\d+) ore and (?<obsidianCostClay>\d+) clay\. Each geode robot costs (?<geodeCostOre>\d+) ore and (?<geodeCostObsidian>\d+) obsidian\./;

module.exports = function (input) {
  return T.chain(input)
    .chain(T.map(captureGroups(parseRegExp)))
    .chain(T.map(autoConvert()))
    .value();
};
