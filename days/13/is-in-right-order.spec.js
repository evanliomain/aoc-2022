const { isInRightOrder } = require('./is-in-right-order');

const left20 = [
  [],
  [[9, [10, 4, 7, 0], 1]],
  [9, 2],
  [[[8, 6, 10, 6, 8]], [9], [[8], [1]]],
  [6, 9, 2, [], [[4, 3]]]
];
const right20 = [
  [],
  [[], [[8, 6, 1]], 0, 1, 0],
  [[[2], [6, 10, 10], 9, 2], 0],
  [8, [[10]], 4]
];

describe('13-isInRightOrder', () => {
  it.each`
    left                                   | right                                  | expected
    ${[1, 1, 3, 1, 1]}                     | ${[1, 1, 5, 1, 1]}                     | ${true}
    ${[[1], [2, 3, 4]]}                    | ${[[1], 4]}                            | ${true}
    ${[9]}                                 | ${[[8, 7, 6]]}                         | ${false}
    ${[[4, 4], 4, 4]}                      | ${[[4, 4], 4, 4, 4]}                   | ${true}
    ${[7, 7, 7, 7]}                        | ${[7, 7, 7]}                           | ${false}
    ${[]}                                  | ${[3]}                                 | ${true}
    ${[[[]]]}                              | ${[[]]}                                | ${false}
    ${[1, [2, [3, [4, [5, 6, 7]]]], 8, 9]} | ${[1, [2, [3, [4, [5, 6, 0]]]], 8, 9]} | ${false}
    ${left20}                              | ${right20}                             | ${false}
  `(
    '#$# returns $expected for $left VS $right',
    ({ left, right, expected }) => {
      expect(isInRightOrder(left, right)).toEqual(expected);
    }
  );
});
