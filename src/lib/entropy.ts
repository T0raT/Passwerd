import { UPPERCASE, LOWERCASE, NUMBERS, SYMBOLS } from "./constants.ts";
import * as rng from "./rng.ts";

/**
 * 1. Generate user defined charset, lowercase should ALWAYS be included.
 * 2. Shuffle charset
 * 3. Generate a random number between 0 and length of charset
 * 4. Shuffle charset each time randomly choosing for password
 * TODO: Check nbp for common password
 * TODO: pipeline for sanitization checking
 * */

export interface Config {
  upper: boolean;
  lower: boolean;
  nums: boolean;
  symb: boolean;
  similarChar: boolean;
  length: number;
}

function avoidSimilarChar(charset: string[]) {
  /**
   * Very font dependent,
   * with departure mono it's easy to identify.
   * But with more common fonts,
   * definately harder to distinguish between them.
   *
   * Or you know, I probably can just remove all of it.
   * Also adding integer/character/symbol character color later will help
   */

  const toRemove: string[] = [];
  toRemove.push(rng.atomicEntropy() < 0.5 ? "0" : "O");
  toRemove.push(rng.atomicEntropy() < 0.5 ? "1" : "i");
  toRemove.push(rng.atomicEntropy() < 0.5 ? "l" : "I");
  charset.filter((item) => {
    toRemove.includes(item);
  });
  return charset;
}

function generateCharset(usrConfig: Config) {
  // There is probably a more elegant way of doing this :(
  let charset = LOWERCASE;
  if (usrConfig.upper) charset = charset.concat(UPPERCASE);
  if (usrConfig.nums) charset = charset.concat(NUMBERS);
  if (usrConfig.symb) charset = charset.concat(SYMBOLS);
  if (usrConfig.similarChar) charset = avoidSimilarChar(charset);
  return charset;
}

export default function PassGen(usrConfig: Config) {
  let charset = generateCharset(usrConfig);
  let password = "";

  for (let i = 0; i < usrConfig.length; i++) {
    const randNum = rng.randInt(charset.length);
    password += charset[randNum];

    if (i % 2 === 0) charset = rng.shuffleArr(charset); // Shuffle only on even loops
  }
  return password;
}
