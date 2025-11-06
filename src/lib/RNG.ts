/**
 * Generates a random float between (0, 1].
 */
export function AtomicEntropy() {
  const buf = new Uint32Array(1);
  let value: number;
  do {
    // Purely for on the off chance it generates the max.
    // Which should be so unlikely
    crypto.getRandomValues(buf);
    value = buf[0];
  } while (value === 0xffffffff);
  return value / 4294967295;
}

/**
 * Generates a random integer between (0, n]
 * @param {number} n - Maximum number, exclusive
 * @returns {number} a integer between (0, n]
 * */
export function randInt(n: number) {
  // Return a integer from [0,n)
  return Math.floor(AtomicEntropy() * n);
}
