const T = require('taninsam');
const { printMatrix } = require('../../tools');
const { updateBlizzards } = require('./update-blizzards');

describe('updateBlizzards', () => {
  const state = [
    ['#E######', '#>>.<^<#', '#.<..<<#', '#>v.><>#', '#<^v^^>#', '######.#'],
    ['#.######', '#E>3.<.#', '#<..<<.#', '#>2.22.#', '#>v..^<#', '######.#'],
    ['#.######', '#.2>2..#', '#E^22^<#', '#.>2.^>#', '#.>..<.#', '######.#'],
    ['#.######', '#<^<22.#', '#E2<.2.#', '#><2>..#', '#..><..#', '######.#'],
    ['#.######', '#E<..22#', '#<<.<..#', '#<2.>>.#', '#.^22^.#', '######.#'],
    ['#.######', '#2Ev.<>#', '#<.<..<#', '#.^>^22#', '#.2..2.#', '######.#'],
    ['#.######', '#>2E<.<#', '#.2v^2<#', '#>..>2>#', '#<....>#', '######.#'],
    ['#.######', '#.22^2.#', '#<vE<2.#', '#>>v<>.#', '#>....<#', '######.#'],
    ['#.######', '#.<>2^.#', '#.E<<.<#', '#.22..>#', '#.2v^2.#', '######.#'],
    ['#.######', '#<E2>>.#', '#.<<.<.#', '#>2>2^.#', '#.v><^.#', '######.#'],
    ['#.######', '#.2E.>2#', '#<2v2^.#', '#<>.>2.#', '#..<>..#', '######.#'],
    ['#.######', '#2^E^2>#', '#<v<.^<#', '#..2.>2#', '#.<..>.#', '######.#'],
    ['#.######', '#>>.<^<#', '#.<E.<<#', '#>v.><>#', '#<^v^^>#', '######.#'],
    ['#.######', '#.>3.<.#', '#<..<<.#', '#>2E22.#', '#>v..^<#', '######.#'],
    ['#.######', '#.2>2..#', '#.^22^<#', '#.>2E^>#', '#.>..<.#', '######.#'],
    ['#.######', '#<^<22.#', '#.2<.2.#', '#><2>E.#', '#..><..#', '######.#'],
    ['#.######', '#.<..22#', '#<<.<..#', '#<2.>>E#', '#.^22^.#', '######.#'],
    ['#.######', '#2.v.<>#', '#<.<..<#', '#.^>^22#', '#.2..2E#', '######.#'],
    ['#.######', '#>2.<.<#', '#.2v^2<#', '#>..>2>#', '#<....>#', '######E#']
  ];
  const input = format(state[0]);

  for (let i = 1; i < state.length; i++) {
    let result = input.map(row => row.slice());
    const expected = format(state[i]);
    it(`expect state ${i} become state ${i + 1}`, () => {
      for (let k = 1; k <= i; k++) {
        result = updateBlizzards(result);
      }
      expect(serialise(result)).toEqual(serialise(expected));
    });
  }
});

function format(state) {
  return T.chain(state)
    .chain(T.map(line => line.replace('E', '.')))
    .chain(T.map(T.split('')))
    .value();
}
function serialise(state) {
  return T.chain(state)
    .chain(printMatrix(c => (1 === c.length ? c : c.length)))
    .value();
}