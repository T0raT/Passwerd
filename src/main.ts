import animatePage from "./lib/animation";
import initListeners from "./lib/listeners";
import initCRTShader from "./lib/crtshader";

const usrConfig = {
  upper: true,
  lower: true,
  nums: true,
  symb: true,
  similarChar: true,
  length: 16,
};

// Should let users toggle between all charset options,
// but enforces 1 charset minimum

initListeners(usrConfig);
animatePage();
initCRTShader();
