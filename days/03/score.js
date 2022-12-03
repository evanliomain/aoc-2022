function score(letter) {
  const ascii = letter.charCodeAt(0);
  if (97 <= ascii) {
    // Lowercase letter
    return ascii - 96;
  }
  // Uppercase letter
  return ascii - 38;
}
exports.score = score;
