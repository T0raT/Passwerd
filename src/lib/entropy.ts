import { UPPERCASE, LOWERCASE, NUMBERS, SYMBOLS } from "./constants.ts";

// Lowercase should ALWAYS be included.

interface Config {
  upper: boolean;
  lower: boolean;
  nums: boolean;
  symb: boolean;
  length: number;
}

const fakeConfig: Config = {
  upper: true,
  lower: true,
  nums: true,
  symb: true,
  length: 12,
};

function AtomicEntropy() {
  // Generates a random value betwen 0~1, meant to mimick Math.random
  const arr = new Uint32Array(1);
  self.crypto.getRandomValues(arr);
  return arr[0] / 4294967295;
}

function shuffleArr(arr: string[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(AtomicEntropy() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateCharset(usrConfig: Config) {
  let charset = LOWERCASE;
  AtomicEntropy();
  if (usrConfig.upper) charset = charset.concat(UPPERCASE);
  if (usrConfig.nums) charset = charset.concat(NUMBERS);
  if (usrConfig.symb) charset = charset.concat(SYMBOLS);
  const finalset = shuffleArr(charset); // Shuffle the array for extra randomness.
  return finalset;
}

export function PassGen(usrConfig: Config) {
  const charset = generateCharset(usrConfig);
  return false;
}

generateCharset(fakeConfig);
