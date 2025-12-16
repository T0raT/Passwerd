import PassGen, { type Config } from "./entropy";

export default function initListeners(usrConfig: Config) {
  // Array to store all password output fields
  let allOutputFields: HTMLElement[] = [];

  // Grabbing user config form element
  const usrConfigForm =
    document.querySelector<HTMLFormElement>("#usr-config-form");
  usrConfigForm?.reset(); // Reset form on load, should later allow user to keep configuration

  // A bunch of other HTML elements
  const genPassBtn = document.getElementById("gen-btn");

  const upperCaseCheckBox =
    document.querySelector<HTMLInputElement>("#upper-case");

  const lowerCaseCheckBox =
    document.querySelector<HTMLInputElement>("#lower-case");

  const symbolsCheckBox = document.querySelector<HTMLInputElement>("#symbols");

  const numbersCheckBox = document.querySelector<HTMLInputElement>("#numbers");

  const similarCharCheckBox =
    document.querySelector<HTMLInputElement>("#similar-char");

  const passLen = document.querySelector<HTMLInputElement>("#pass-len-slider");
  const passLenOutput =
    document.querySelector<HTMLSpanElement>("#pass-len-output");

  const numPass = document.querySelector<HTMLInputElement>("#num-pass-slider");
  const numPassOutput =
    document.querySelector<HTMLSpanElement>("#num-pass-output");

  /* Event listeners for checkboxes */
  upperCaseCheckBox?.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement; // To resolve ts error Property 'value' does not exist on type 'EventTarget'. (ts 2339)

    // conditinal to enforce at least 1 character set
    if (!usrConfig.lower && !usrConfig.nums && !usrConfig.symb) {
      target.checked = true;
    } else {
      usrConfig.upper = target.checked;
      renderToField(usrConfig);
    }
  });

  lowerCaseCheckBox?.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    if (!usrConfig.upper && !usrConfig.nums && !usrConfig.symb) {
      target.checked = true;
    } else {
      usrConfig.lower = target.checked;
      renderToField(usrConfig);
    }
  });

  numbersCheckBox?.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    if (!usrConfig.upper && !usrConfig.lower && !usrConfig.symb) {
      target.checked = true;
    } else {
      usrConfig.nums = target.checked;
      renderToField(usrConfig);
    }
  });

  symbolsCheckBox?.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    if (!usrConfig.upper && !usrConfig.lower && !usrConfig.nums) {
      target.checked = true;
    } else {
      usrConfig.symb = target.checked;
      renderToField(usrConfig);
    }
  });

  similarCharCheckBox?.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    usrConfig.similarChar = target.checked;
    renderToField(usrConfig);
  });

  /* Attach listener to sliders */
  passLen?.addEventListener("input", (e) => {
    if (passLenOutput && e.target) {
      const target = e.target as HTMLInputElement;
      // Incase of limit tempering
      target.max = "100";
      passLenOutput.textContent =
        Number(target.value) > 100 ? "16" : target.value;
      usrConfig.length = Number(target.value) > 100 ? 16 : Number(target.value); // Apparently better than parseInt for pure number strings
      renderToField(usrConfig);
    }
  });

  numPass?.addEventListener("input", (e) => {
    if (numPassOutput && e.target) {
      const target = e.target as HTMLInputElement;
      target.max = "100";
      numPassOutput.textContent =
        Number(target.value) > 100 ? "1" : target.value;
      usrConfig.numPass = Number(target.value) > 100 ? 1 : Number(target.value);
      renderToField(usrConfig);
    }
  });

  // Assign render function to button
  genPassBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    renderToField(usrConfig);
  });

  /*
   * Section contains:
   *
   * 1. Logic to render multiple password fields
   * 2. Rendering passwords to said fields
   * */
  const pass1 = document.querySelector<HTMLElement>("#pass1");
  if (!pass1) throw new Error("defualt password output field does not exist");

  // Function to render all necessary password fields
  const renderAllFields = (usrConfig: Config) => {
    for (let i = 1; i < usrConfig.numPass; i++) {
      continue;
    }
    return false;
  };

  // Function takes user config and renders password to page
  const renderToField = (usrConfig: Config) => {
    throw new Error("Function not implemented yet");
  };
}
