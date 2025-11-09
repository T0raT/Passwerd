import PassGen, { type Config } from "./lib/entropy";

const fakeConfig = {
  upper: true,
  lower: true,
  nums: true,
  symb: true,
  length: 16,
};

const genPassBtn = document.getElementById("gen-btn");
const outputField = document.querySelector<HTMLElement>(".output");

// Takes user config and renders result password to field
const renderToField = (config: Config) => {
  if (!outputField) return;
  outputField.textContent = PassGen(config);
};

// Assign function to button
genPassBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  renderToField(fakeConfig);
});
