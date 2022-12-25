const { updateBlizzards } = require('./update-blizzards');
const { memoize } = require('./memoize');
const { AStarSearch } = require('./a-star-search');

module.exports = function(valley) {
  const update = memoize(updateBlizzards);
  return AStarSearch(
    valley,
    [0, 1],
    [valley.length - 1, valley[0].length - 2],
    update
  ).cost;
};
