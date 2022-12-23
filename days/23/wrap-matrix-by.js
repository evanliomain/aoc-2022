const T = require('taninsam');

function wrapMatrixBy(element) {
  return (matrix)=>{
  const xmax = matrix[0].length;
  const newMatrix = [
    T.arrayFromValue(xmax)(element),
    ...matrix,
    T.arrayFromValue(xmax)(element)
  ];
  newMatrix.forEach(line => {
    line.unshift('.');
    line.push('.');
  });
  return newMatrix;}
}
exports.wrapMatrixBy = wrapMatrixBy;
