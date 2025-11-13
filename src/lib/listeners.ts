import PassGen, { type Config } from "./entropy";

export default function initListeners(usrConfig: Config) {
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

  const passLenOutput =
    document.querySelector<HTMLSpanElement>("#pass-len-output");
  const passLen = document.querySelector<HTMLInputElement>("#pass-len-slider");

  const outputField = document.querySelector<HTMLElement>(".output");

  // Function takes user config and renders password to page
  const renderToField = (config: Config) => {
    if (!outputField) return;
    outputField.textContent = PassGen(config);
  };

  // Event listeners for checkboxes

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

  // Attach listener to password length slider
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

  // Assign function to button
  genPassBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    renderToField(usrConfig);
  });
}
