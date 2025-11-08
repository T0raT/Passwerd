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

const renderToField = (config: Config) => {
  if (!outputField) return;
  outputField.textContent = PassGen(config);
};

genPassBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  renderToField(fakeConfig);
});
