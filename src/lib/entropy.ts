import { UPPERCASE, LOWERCASE, NUMBERS, SYMBOLS } from "./constants.ts";
import { AtomicEntropy, randInt } from "./RNG.ts";

/**
 * 1. Generate user defined charset, lowercase should ALWAYS be included.
 * 2. Shuffle charset
 * 3. Generate a random number between 0 and length of charset
 * 4. Shuffle charset each time randomly choosing for password
 * 5. TODO: Check nbp for common password
 * 6. TODO: pipeline for sanitization checking
 * */

export interface Config {
  upper: boolean;
  lower: boolean;
  nums: boolean;
  symb: boolean;
  length: number;
}

/**
 * Shuffles an array using the Fisher–Yates algorithm.
 * Uses the safer Crypto inferface.
 * @param {string[]} arr - An array of string
 * @returns {string[]} a shuffled array of strings
 * */
function shuffleArr(arr: string[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(AtomicEntropy() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateCharset(usrConfig: Config) {
  let charset = LOWERCASE;
  if (usrConfig.upper) charset = charset.concat(UPPERCASE);
  if (usrConfig.nums) charset = charset.concat(NUMBERS);
  if (usrConfig.symb) charset = charset.concat(SYMBOLS);
  return charset;
}

export default function PassGen(usrConfig: Config) {
  let charset = generateCharset(usrConfig);
  let password = "";

  for (let i = 0; i < usrConfig.length; i++) {
    const rng = randInt(charset.length);
    password += charset[rng];

    if (i % 2 === 0) charset = shuffleArr(charset); // Shuffle only on even loops
  }
  return password;
}
