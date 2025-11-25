import animatePage from "./lib/animation";
import initListeners from "./lib/listeners";
import { inject } from "@vercel/analytics";

inject();

const usrConfig = {
  upper: true,
  lower: true,
  nums: true,
  symb: true,
  similarChar: true,
  length: 16,
  numPass: 1, // Should default to 1, never below 1
};

initListeners(usrConfig);
animatePage();
