const { updateBlizzards } = require('./update-blizzards');
const { memoize } = require('./memoize');
const { AStarSearch } = require('./a-star-search');

module.exports = function(valley) {
  const update = memoize(updateBlizzards);
  const start = [0, 1];
  const goal = [valley.length - 1, valley[0].length - 2];

  const { cost: cost1, valley: valley1 } = AStarSearch(
    valley,
    start,
    goal,
    update
  );
  const { cost: cost2, valley: valley2 } = AStarSearch(
    valley1,
    goal,
    start,
    update
  );

  const { cost: cost3 } = AStarSearch(valley2, start, goal, update);

  return cost1 + cost2 + cost3;
};
