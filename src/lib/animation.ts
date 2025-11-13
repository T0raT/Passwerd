import { animate, splitText, stagger, spring } from "animejs";
export default function animatePage() {
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
      bounce: 0.25,
      duration: 500,
    }),
    translateY: { from: "100%" },
  });
}
