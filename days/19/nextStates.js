/**
 * @param { { nbOreCollectingRobot: number; nbClayCollectingRobot: number; nbObsidianCollectingRobot: number; nbGeodeCollectingRobot: number; nbOre: number; nbClay: number; nbObsidian: number; nbGeode: number; } } state
 * @param {{"id": number;"oreCostOre": number;"clayCostOre": number;"obsidianCostOre": number;"obsidianCostClay":number;"geodeCostOre": number;"geodeCostObsidian" number; }} blueprint
 */
function nextStates(state, blueprint) {
  const diffMineral = diffCollectMinerals(state);
  const diffsRobot = diffBuildRobot(state, blueprint);

  return diffsRobot.map(diffRobot => ({
    nbOreCollectingRobot:
      state.nbOreCollectingRobot + diffRobot.nbOreCollectingRobot,
    nbClayCollectingRobot:
      state.nbClayCollectingRobot + diffRobot.nbClayCollectingRobot,
    nbObsidianCollectingRobot:
      state.nbObsidianCollectingRobot + diffRobot.nbObsidianCollectingRobot,
    nbGeodeCollectingRobot:
      state.nbGeodeCollectingRobot + diffRobot.nbGeodeCollectingRobot,
    nbOre: state.nbOre + diffMineral.nbOre + diffRobot.nbOre,
    nbClay: state.nbClay + diffMineral.nbClay + diffRobot.nbClay,
    nbObsidian:
      state.nbObsidian + diffMineral.nbObsidian + diffRobot.nbObsidian,
    nbGeode: state.nbGeode + diffMineral.nbGeode + diffRobot.nbGeode
  }));
}
exports.nextStates = nextStates;
/**
 * @param { { nbOreCollectingRobot: number; nbClayCollectingRobot: number; nbObsidianCollectingRobot: number; nbGeodeCollectingRobot: number; nbOre: number; nbClay: number; nbObsidian: number; nbGeode: number; } } state
 * @param {{"id": number;"oreCostOre": number;"clayCostOre": number;"obsidianCostOre": number;"obsidianCostClay":number;"geodeCostOre": number;"geodeCostObsidian" number; }} blueprint
 */
function diffBuildRobot(state, blueprint) {
  const diff = {
    nbOreCollectingRobot: 0,
    nbClayCollectingRobot: 0,
    nbObsidianCollectingRobot: 0,
    nbGeodeCollectingRobot: 0,
    nbOre: 0,
    nbClay: 0,
    nbObsidian: 0,
    nbGeode: 0
  };
  const diffs = [{ ...diff }];
  let tmpDiff;
  if (canBuildGeodeRobot(state, blueprint)) {
    tmpDiff = { ...diff };
    tmpDiff.nbGeodeCollectingRobot = 1;
    tmpDiff.nbOre = -1 * blueprint.geodeCostOre;
    tmpDiff.nbObsidian = -1 * blueprint.geodeCostObsidian;
    diffs.push(tmpDiff);
  }
  if (canBuildObsidianRobot(state, blueprint)) {
    tmpDiff = { ...diff };
    tmpDiff.nbObsidianCollectingRobot = 1;
    tmpDiff.nbOre = -1 * blueprint.obsidianCostOre;
    tmpDiff.nbClay = -1 * blueprint.obsidianCostClay;
    diffs.push(tmpDiff);
  }
  if (canBuildClayRobot(state, blueprint)) {
    tmpDiff = { ...diff };
    tmpDiff.nbClayCollectingRobot = 1;
    tmpDiff.nbOre = -1 * blueprint.clayCostOre;
    diffs.push(tmpDiff);
  }
  if (canBuildOreRobot(state, blueprint)) {
    tmpDiff = { ...diff };
    tmpDiff.nbOreCollectingRobot = 1;
    tmpDiff.nbOre = -1 * blueprint.oreCostOre;
    diffs.push(tmpDiff);
  }
  return diffs;
}
/**
 * @param { { nbOreCollectingRobot: number; nbClayCollectingRobot: number; nbObsidianCollectingRobot: number; nbGeodeCollectingRobot: number; nbOre: number; nbClay: number; nbObsidian: number; nbGeode: number; } } state
 */
function diffCollectMinerals(state) {
  return {
    nbOre: state.nbOreCollectingRobot,
    nbClay: state.nbClayCollectingRobot,
    nbObsidian: state.nbObsidianCollectingRobot,
    nbGeode: state.nbGeodeCollectingRobot
  };
}
/**
 *
 * @param {{nbOreCollectingRobot: number;nbClayCollectingRobot: number;nbObsidianCollectingRobot: number;nbGeodeCollectingRobot: number;nbOre: number;nbClay: number;nbObsidian: number;nbGeode:number; }} state
 * @param {{"id": number;"oreCostOre": number;"clayCostOre": number;"obsidianCostOre": number;"obsidianCostClay":number;"geodeCostOre": number;"geodeCostObsidian" number; }} blueprint
 */
function canBuildOreRobot(state, blueprint) {
  return blueprint.oreCostOre <= state.nbOre;
}
/**
 *
 * @param {{nbOreCollectingRobot: number;nbClayCollectingRobot: number;nbObsidianCollectingRobot: number;nbGeodeCollectingRobot: number;nbOre: number;nbClay: number;nbObsidian: number;nbGeode:number; }} state
 * @param {{"id": number;"oreCostOre": number;"clayCostOre": number;"obsidianCostOre": number;"obsidianCostClay":number;"geodeCostOre": number;"geodeCostObsidian" number; }} blueprint
 */
function canBuildClayRobot(state, blueprint) {
  return blueprint.clayCostOre <= state.nbOre;
}
/**
 *
 * @param {{nbOreCollectingRobot: number;nbClayCollectingRobot: number;nbObsidianCollectingRobot: number;nbGeodeCollectingRobot: number;nbOre: number;nbClay: number;nbObsidian: number;nbGeode:number; }} state
 * @param {{"id": number;"oreCostOre": number;"clayCostOre": number;"obsidianCostOre": number;"obsidianCostClay":number;"geodeCostOre": number;"geodeCostObsidian" number; }} blueprint
 */
function canBuildObsidianRobot(state, blueprint) {
  return (
    blueprint.obsidianCostOre <= state.nbOre &&
    blueprint.obsidianCostClay <= state.nbClay
  );
}
/**
 *
 * @param {{nbOreCollectingRobot: number;nbClayCollectingRobot: number;nbObsidianCollectingRobot: number;nbGeodeCollectingRobot: number;nbOre: number;nbClay: number;nbObsidian: number;nbGeode:number; }} state
 * @param {{"id": number;"oreCostOre": number;"clayCostOre": number;"obsidianCostOre": number;"obsidianCostClay":number;"geodeCostOre": number;"geodeCostObsidian" number; }} blueprint
 */
function canBuildGeodeRobot(state, blueprint) {
  return (
    blueprint.geodeCostOre <= state.nbOre &&
    blueprint.geodeCostObsidian <= state.nbObsidian
  );
}
