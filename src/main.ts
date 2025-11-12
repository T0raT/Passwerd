import * as THREE from "three";
import animatePage from "./lib/animation";
import initListeners from "./lib/listeners";

const usrConfig = {
  upper: true,
  lower: true,
  nums: true,
  symb: true,
  similarChar: true,
  length: 16,
};

initListeners(usrConfig);
animatePage();
