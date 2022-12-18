const { deserialize } = require('./serialize');

function setToCoords(set) {
  return [...set].map(deserialize);
}
exports.setToCoords = setToCoords;
