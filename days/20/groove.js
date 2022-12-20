function groove(startId, circle) {
  const groovies = [];
  let currentId = startId;
  const stack = [];

  for (let nth = 0; nth <= 3000; nth++) {
    const { next, value } = circle.get(currentId);
    currentId = next;

    if ([1000, 2000, 3000].includes(nth)) {
      groovies.push(value);
    }
  }
  return groovies;
}
exports.groove = groove;
