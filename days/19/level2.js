const T = require('taninsam');
const { nextStates } = require('./nextStates');

const NB_MINUTES = 32;

/**
 *
 * @param {{"id": number;"oreCostOre": number;"clayCostOre": number;"obsidianCostOre": number;"obsidianCostClay":number;"geodeCostOre": number;"geodeCostObsidian" number; }[]} input
 * @returns
 */
module.exports = function(input) {
  return T.chain(input)
    .chain(T.take(3))
    .chain(T.map(findBestProcess))
    .chain(T.reduce((a, b) => a * b, 1))
    .value();
};

/**
 *
 *  "oreCostOre": number;
 *  "clayCostOre": number;
 *  "obsidianCostOre": number;
 *  "obsidianCostClay": number;
 *  "geodeCostOre": number;
 *  "geodeCostObsidian": number;
 *
 *
 * @param {{"id": number;"oreCostOre": number;"clayCostOre": number;"obsidianCostOre": number;"obsidianCostClay":number;"geodeCostOre": number;"geodeCostObsidian" number; }} blueprint
 * @returns number of geodes of the best process for the blueprint
 */
function findBestProcess(blueprint) {
  let states = [
    {
      nbOreCollectingRobot: 1,
      nbClayCollectingRobot: 0,
      nbObsidianCollectingRobot: 0,
      nbGeodeCollectingRobot: 0,
      nbOre: 0,
      nbClay: 0,
      nbObsidian: 0,
      nbGeode: 0
    }
  ];
  for (let minute = 1; minute <= NB_MINUTES; minute++) {
    console.log(`minute ${minute} - ${states.length} states`);
    states = states.map(state => nextStates(state, blueprint)).flat();

    if (15 <= minute) {
      states = T.chain(states)
        .chain(
          T.sortBy(
            ({ nbObsidianCollectingRobot, nbGeodeCollectingRobot }) =>
              -1 * (nbObsidianCollectingRobot + nbGeodeCollectingRobot)
          )
        )
        .chain(T.take(100000))
        .value();
    }
    if (21 <= minute) {
      states = T.chain(states)
        .chain(T.sortBy(({ nbGeode }) => -1 * nbGeode))
        .chain(T.take(100000))
        .value();
    }
  }
  const result = T.chain(states)
    .chain(T.map(({ nbGeode }) => nbGeode))
    .chain(T.max())
    .value();

  return result;
}
