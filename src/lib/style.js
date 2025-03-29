export const style = {
  "userSelect": "none",
  "cursor": "default",
  "fontFamily": "sans-serif",
  "progress": {
    "borderRadius": "3px",
    "margin": "9px 0px 10px 0px",
    "height": "6px",
    "width": "100%",
  },
  "pointerEvents": "none",
  "progress[value]::-webkit-progress-bar": {
    "borderRadius": "4px",
    "backgroundColor": "rgba(255, 229, 234, 0.2)",
  },
  "progress[value]::-webkit-progress-value": {
    "borderRadius": "4px",
    "backgroundColor": "rgba(255, 229, 234, 0.6)",
  },
  "progress:not([value])::-webkit-progress-bar": {
    "borderRadius": "4px",
    "backgroundColor": "rgba(255, 229, 234, 0.2)",
  },
  "--blur": 0,
  "--brightness": 1,
  "--saturate": 1,
  ".filter": {
    "filter": `
      blur(var(--blur))
      brightness(var(--brightness))
      contrast(var(--contrast))
      grayscale(var(--grayscale))
      sepia(var(--sepia))
      hue-rotate(var(--hue-rotate))
    `,
  },
  ".pointer-events-none": { "pointerEvents": "none" },
  ".pointer-events-auto": { "pointerEvents": "auto" },
  ".justify-between": { "justifyContent": "space-between" },
  ".aspect-square": { "aspectRatio": "1 / 1" },
  ".h-full": { "height": "100%" },
  ".h-fit": { "height": "fit-content" },
  ".w-full": { "width": "100%" },
  ".w-60vh": { "width": "60vh" },
  ".w-2": { "width": "4.0rrem" },
  ".w-20px": { "width": "20px" },
  ".h-20px": { "height": "20px" },
  ".h-screen": { "height": "100vh" },
  ".w-screen": { "width": "100vw" },
  ".bg-black": { "backgroundColor": "black" },
  ".bg-grey": { "backgroundColor": "grey" },
  ".bg-white": { "backgroundColor": "white" },
  ".relative": { "position": "relative" },
  ".absolute": { "position": "absolute" },
  ".object-cover": { "objectFit": "cover" },
  ".object-contain": { "objectFit": "contain" },
  ".flex": { "display": "flex" },
  ".block": { "display": "block" },
  ".fixed": { "position": "fixed" },
  ".flex-col": { "flexDirection": "column" },
  ".flex-none": { "flex": "none" },
  ".flex-1": { "flex": "1 1 0%" },
  ".none": { "display": "none" },
  ".top-0": { "top": "0px" },
  ".bottom-0": { "bottom": "0px" },
  ".left-0": { "left": "0px" },
  ".right-0": { "right": "0px" },
  ".opacity-80": { "opacity": 0.8 },
  ".opacity-95": { "opacity": 0.95 },
  ".opacity-60": { "opacity": 0.6 },
  ".opacity-30": { "opacity": 0.3 },
  ".opacity-0": { "opacity": 0 },
  ".hover-opacity-30: hover": { "opacity": 0.3 },
  ".hover-opacity-80: hover": { "opacity": 0.8 },
  ".place-content-center": { "placeContent": "center center" },
  ".brightness-pulse": {
    "animation": "2s ease-in-out 0s infinite alternate brightness-pulse",
    "transition": "filter ease-in-out 2s",
  },
  ".backdrop-blur-100": {
    "backdropFilter": "blur(100px)",
  },
  ".z-10": { "zIndex": 10 },
  ".z-20": { "zIndex": 20 },
  ".saturate-450": { "--saturate": 4.5 },
  "@keyframes brightness-pulse": {
    "from": {
      "filter": `
        blur(var(--blur))
        brightness(0.5)
        saturate(var(--saturate))
      `,
    },
    "to": {
      "filter": `
        blur(var(--blur))
        brightness(1.0)
        saturate(var(--saturate))
      `,
    },
  },
  ".box-border": { "boxSizing": "border-box" },
  ".shadow": { "boxShadow": "0px 0px 10px 0px rgba(0, 0, 0, 0.3)" },
  ".radius-10": { "borderRadius": "10px" },
  ".radius-5": { "borderRadius": "5px" },
  ".border": { "border": "1px solid #eeeeee30" },
  "@keyframes progress": {
    "0%": { "left": "0%" },
    "100%": { "left": "-100%" },
  },
  ".hover-bg-white-20: hover": {
    "backgroundColor": "rgba(255, 255, 255, 0.2)",
  },
  ".hover-filter-brightness-50: hover": {
    "filter": "brightness(0.5)",
  },
  "@keyframes spin": { "100%": { "transform": "rotate(360deg)" } },
  ".text-ellipsis": { "textOverflow": "ellipsis" },
  ".text-4xl": { "fontSize": "3rem", "lineHeight": 1 },
  ".text-1-5em": { "fontSize": "1.5em", "lineHeight": "2em" },
  ".text-sm": { "fontSize": "0.875rem", "lineHeight": "1.25rem" },
  ".leading-none": { "lineHeight": 1.2 },
  ".font-bold": { "fontWeight": 700 },
  ".font-mono": { "fontFamily": "monospace" },
  ".tracking-tightest": { "letterSpacing": "-0.25rem" },
  ".overflow-animation": { "position": "relative" },
  "@keyframes move": {
    "0%": { "transform": "translateX(0%)", "left": "0%" },
    "100%": { "transform": "translateX(-100%)", "left": "100%" },
  },
  ".align-center": { "textAlign": "center" },
  ".no-wrap": { "whiteSpace": "nowrap" },
  ".color-white": { "color": "white" },
  ".color-grey": { "color": "grey" },
  ".overflow-hidden": { "overflow": "hidden" },
  ".px-1": { "paddingLeft": "0.25rem", "paddingRight": "0.25rem" },
  ".px-8": { "paddingLeft": "2rem", "paddingRight": "2rem" },
  ".py-1": { "paddingTop": "0.25rem", "paddingBottom": "0.25rem" },
  ".py-4": { "paddingTop": "1rem", "paddingBottom": "1rem" },
  ".pt-12": { "paddingTop": "3rem" },
  ".cursor-resize:hover": { "cursor": "nwse-resize" },
};
