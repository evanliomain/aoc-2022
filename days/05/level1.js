const T = require('taninsam');

module.exports = function ({ moves, stacks }) {
  return T.chain(moves)
    .chain(
      T.reduce((s, { nb, from, to }) => {
        const removed = s[from].splice(s[from].length - nb, nb);
        s[to].push(...T.reverse()(removed));
        return s;
      }, stacks)
  )
    .chain(T.map(T.last()))
    .chain(T.join(''))
    .value();
};
