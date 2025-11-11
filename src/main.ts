import PassGen, { type Config } from "./lib/entropy";

const usrConfig = {
  upper: true,
  lower: true,
  nums: false,
  symb: false,
  length: 16,
};

const usrConfigForm =
  document.querySelector<HTMLFormElement>("#usr-config-form");
usrConfigForm?.reset(); // Reset form on load, should later allow user to keep configuration

const genPassBtn = document.getElementById("gen-btn");
const passLenOutput =
  document.querySelector<HTMLSpanElement>("#pass-len-output");
const passLen = document.querySelector<HTMLInputElement>("#pass-len-slider");
const symbolsCheckBox = document.querySelector<HTMLInputElement>("#symbols");
const numbersCheckBox = document.querySelector<HTMLInputElement>("#numbers");
const outputField = document.querySelector<HTMLElement>(".output");

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
