const Heap = require('heap');

function AStarSearch(startValley, start, goal, update) {
  // Create a set to store the visited positions
  const visited = new Set();

  // Create a priority queue to store the positions to be explored,
  // with the cost as the priority
  const queue = new Heap((a, b) => a.cost - b.cost);

  // Add the starting position to the queue
  queue.push({ position: start, cost: 0, valley: startValley });

  // Set of directions to move
  const directions = [
    [0, 0],
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0] // you can move down
  ];

  // While the queue is not empty
  while (!queue.empty()) {
    // Get the next position to be explored
    const { position, cost, valley } = queue.pop();

    // If the position is the goal, return the path
    if (position[0] === goal[0] && position[1] === goal[1]) {
      return { cost, valley };
    }

    const positionStr = position.toString() + ',' + cost;
    // If the position has already been visited, continue
    if (visited.has(positionStr)) {
      continue;
    }

    // Add the position to the visited set
    visited.add(positionStr);

    // Update the valley map to reflect the movement of the blizzards
    const newValley = update(valley);

    // Iterate over the directions
    for (const [dx, dy] of directions) {
      // Calculate the new position
      const x = position[0] + dx;
      const y = position[1] + dy;

      if (x < 0 || valley.length <= x) {
        continue;
      }
      if (y < 0 || valley[0].length < y) {
        continue;
      }

      // Check if the new position is valid and not blocked by a blizzard
      if (newValley[x][y] !== '.') {
        continue;
      }
      // Add the new position to the queue with the updated cost
      queue.push({ position: [x, y], cost: cost + 1, valley: newValley });
    }
  }

  // Return -1 if the goal was not reached
  return -1;
}
exports.AStarSearch = AStarSearch;
