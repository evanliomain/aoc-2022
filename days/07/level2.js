module.exports = function(dirs) {
  const totalDiskSpaceAvailable = 70000000;
  const needUnusedSpace = 30000000;
  const totalSize = dirs.get('/').totalSize;
  const sizeOfTheUnusedSpace = totalDiskSpaceAvailable - totalSize;
  const totalSizeToFree = needUnusedSpace - sizeOfTheUnusedSpace;

  let result = totalDiskSpaceAvailable;

  for (const [, { totalSize }] of dirs) {
    if (totalSizeToFree <= totalSize) {
      result = Math.min(result, totalSize);
    }
  }

  return result;
};
