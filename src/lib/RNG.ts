/**
 * Generates a random float between (0, 1].
 */
export function atomicEntropy() {
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
  return Math.floor(atomicEntropy() * n);
}

/**
 * Shuffles an array using the Fisher–Yates algorithm.
 * Uses the safer Crypto inferface.
 * @param {string[]} arr - An array of string
 * @returns {string[]} a shuffled array of strings
 * */
export function shuffleArr(arr: string[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(atomicEntropy() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
