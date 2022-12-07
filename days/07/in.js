const T = require('taninsam');
const { parseNumber } = require('../../tools');

module.exports = function(input) {
  const stack = [];
  const dirs = new Map();
  let currentDir;

  input
    .filter(log => !/^\$ ls/.test(log))
    .forEach(log => {
      if (/^\$ cd/.test(log)) {
        currentDir = log.slice(5);
        if ('..' === currentDir) {
          stack.pop();
        } else {
          stack.push(currentDir);
          dirs.set(stack.join('/'), { files: [], subdirs: [] });
        }
      } else {
        const { files, subdirs } = dirs.get(stack.join('/'));
        if (/^dir /.test(log)) {
          subdirs.push(`${stack.join('/')}/${log.slice(4)}`);
        } else {
          const [size, name] = log.split(' ');
          files.push({ size: parseNumber()(size), name });
        }
        dirs.set(stack.join('/'), { files, subdirs });
      }
    });

  getSizeOf('/');

  return dirs;

  function getSizeOf(dirName) {
    const { files, subdirs } = dirs.get(dirName);
    const filesSizes = T.sumBy(({ size }) => size)(files);
    const dirsSizes = T.sumBy(getSizeOf)(subdirs);
    const totalSize = filesSizes + dirsSizes;
    dirs.set(dirName, { files, subdirs, totalSize });
    return totalSize;
  }
};
