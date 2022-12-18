const { countAllFaces } = require('./count-all-faces');
const { getCubeSet } = require('./get-cube-set');

module.exports = function(input) {
  return countAllFaces(input, getCubeSet(input));
};
