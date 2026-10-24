export const colors = {
  // Original palette, used by Home, Projects, Contact and NavBar.
  black: "#000000",
  navy: "#161751",
  green: "#174730",
  teal: "#227081",
  gray: "#5c5c5c",
  white: "#ffffff",

  // Tokens from the Profile redesign. The blog imports these rather than
  // hardcoding hex values, so the later site rework is a single-file change.
  text: "#e5e2e3", // primary text
  muted: "#bdc9c8", // body copy
  mutedDim: "#aacdcc", // metadata
  faint: "#879392", // footers, de-emphasized text
  accent: "#76d6d5", // links and accents
  accentDeep: "#008080", // gradient end only, never a flat fill
  onAccent: "#003737", // text on the teal gradient
  warm: "#ffb692", // uppercase micro-labels
  surface: "#1c1b1c", // card surface
  surfaceAlt: "#201f20", // nested card, steps lighter
  well: "rgba(14, 14, 15, 0.6)", // content well, steps darker
  border: "rgba(62, 73, 73, 0.55)",
  borderSoft: "rgba(62, 73, 73, 0.45)", // nested, steps weaker
  glow: "rgba(118, 214, 213, 0.25)",
};
