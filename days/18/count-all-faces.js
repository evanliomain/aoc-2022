const T = require('taninsam');
const { parseNumber } = require('../../tools');

function countAllFaces(input, cubesSet) {
  return T.chain(input)
    .chain(T.map(T.split(',')))
    .chain(T.map(T.map(parseNumber())))
    .chain(
      T.map(coords => {
        let nbFace = 6;
        for (let i = 0; i < coords.length; i++) {
          const cmp1 = [...coords];
          const cmp2 = [...coords];
          cmp1[i]--;
          cmp2[i]++;
          if (cubesSet.has(cmp1.join(','))) {
            nbFace--;
          }
          if (cubesSet.has(cmp2.join(','))) {
            nbFace--;
          }
        }
        return nbFace;
      })
    )
    .chain(T.sum())
    .value();
}
exports.countAllFaces = countAllFaces;
