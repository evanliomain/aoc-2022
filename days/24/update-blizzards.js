const { mapMatrix } = require('../../tools');

function updateBlizzards(valley) {
  // Create a copy of the valley map
  const newValley = valley.map(row => row.slice());
  const bottom = valley.length - 2;

  // Iterate over the rows and columns of the valley map
  for (let i = 1; i < valley.length - 1; i++) {
    const right = valley[i].length - 2;
    for (let j = 1; j < valley[i].length - 1; j++) {
      const cell = valley[i][j];

      // If the current position is a blizzard
      if (!/\>|v|\^|\</.test(cell)) {
        continue;
      }
      for (const c of cell) {
        // Calculate the new position of the blizzard
        let x = i;
        let y = j;

        switch (c) {
          case '>':
            y = y === right ? 1 : y + 1;
            break;
          case '<':
            y = y === 1 ? right : y - 1;
            break;
          case 'v':
            x = x === bottom ? 1 : x + 1;
            break;
          case '^':
            x = x === 1 ? bottom : x - 1;
            break;
        }
        // Replace the blizzard with a new one
        newValley[i][j] = newValley[i][j].replace(c, '');
        newValley[x][y] = newValley[x][y].replace('.', '');
        newValley[x][y] += c;
      }
    }
  }
  return mapMatrix(c => (0 === c.length ? '.' : c))(newValley);
}
exports.updateBlizzards = updateBlizzards;
