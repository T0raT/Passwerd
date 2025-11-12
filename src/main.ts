import * as THREE from "three";
import PassGen, { type Config } from "./lib/entropy";
import { animate, splitText, stagger, spring } from "animejs";
const usrConfig = {
  upper: true,
  lower: true,
  nums: false,
  symb: false,
  length: 16,
};

// Grabbing user config form element
const usrConfigForm =
  document.querySelector<HTMLFormElement>("#usr-config-form");
usrConfigForm?.reset(); // Reset form on load, should later allow user to keep configuration

// A bunch of other HTML elements
const genPassBtn = document.getElementById("gen-btn");
const passLenOutput =
  document.querySelector<HTMLSpanElement>("#pass-len-output");
const passLen = document.querySelector<HTMLInputElement>("#pass-len-slider");
const symbolsCheckBox = document.querySelector<HTMLInputElement>("#symbols");
const numbersCheckBox = document.querySelector<HTMLInputElement>("#numbers");
const outputField = document.querySelector<HTMLElement>(".output");

// Event listeners for checkboxes
numbersCheckBox?.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement; // To resolve ts error Property 'value' does not exist on type 'EventTarget'. (ts 2339)
  usrConfig.nums = target.checked;
});
symbolsCheckBox?.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  usrConfig.symb = target.checked;
});

// Attach listener to password length slider
passLen?.addEventListener("input", (e) => {
  if (passLenOutput && e.target) {
    const target = e.target as HTMLInputElement;
    passLenOutput.textContent = target.value;
    usrConfig.length = Number(target.value); // Apparently better than parseInt for pure number strings
  }
});

// Assign function to button
genPassBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  renderToField(usrConfig);
});

// Function takes user config and renders result password to field
const renderToField = (config: Config) => {
  if (!outputField) return;
  outputField.textContent = PassGen(config);
};

// Text animation

const { chars } = splitText("section", {
  chars: { wrap: "clip" },
});

animate(chars, {
  y: [{ to: ["100%", "0%"] }, { delay: 0, ease: "in(3)" }],
  duration: 50,
  ease: "out(3)",
  delay: stagger(30),
});

animate(".app-section", {
  opacity: { from: 0 },
  duration: 1000,
  delay: 750,
  ease: spring({
    bounce: 0.35,
    duration: 500,
  }),
  translateY: { from: "100%" },
});
