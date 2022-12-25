/**
 * This function takes in another function as an argument and returns a new function that wraps the original function. The new function maintains an internal cache of results and checks the cache before calling the original function. If the result for a given set of arguments is found in the cache, it is returned immediately. Otherwise, the original function is called, the result is cached, and then returned.
 * @param {Function} func
 * @returns
 * @example ```
 * function add(a, b) {
 *   console.log('Computing the result');
 *   return a + b;
 * }
 *
 * const memoizedAdd = memoize(add);
 *
 * console.log(memoizedAdd(1, 2)); // prints "Computing the result" and returns 3
 * console.log(memoizedAdd(1, 2)); // returns 3 without computing the result again
 * ```
 */
function memoize(func) {
  const cache = {};

  return function(...args) {
    const key = JSON.stringify(args, null, 2);
    if (cache[key]) {
      return cache[key];
    }

    const result = func(...args);
    cache[key] = result;
    return result;
  };
}
exports.memoize = memoize;
