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

const fakeConfig: Config = {
  upper: true,
  lower: true,
  nums: true,
  symb: true,
  length: 12,
};

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
  return charset;
}

export default function PassGen(usrConfig: Config) {
  let charset = generateCharset(usrConfig);
  let password = "";

  for (let i = 0; i < usrConfig.length; i++) {
    charset = shuffleArr(charset);
    const rng = randInt(charset.length);
    password += charset[rng];
  }
  return password;
}

console.log(PassGen(fakeConfig));
