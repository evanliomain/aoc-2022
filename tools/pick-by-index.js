module.exports = function pickByIndex(...indexes) {
  return array => indexes.map(index => array[index]);
};
