export const style = {
  "userSelect": "none",
  "cursor": "default",
  "fontFamily": "sans-serif",
  "progress": {
    "borderRadius": "4px",
    "margin": "9px 0px 10px 0px",
    "height": "4px",
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
  // ".progress-container": {
  //   height: "4px",
  // },
  // ".progress-container > div": {
  //   position: "absolute",
  //   left: "0%",
  //   width: "200%",
  //   height: "100%",
  //   background:
  //     "repeating-linear-gradient(\n        45deg,\n        rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 2.5%,\n        rgba(255, 255, 255, 0) 2.5%, rgba(255, 255, 255, 0) 5%\n      )",
  //   animation: "10s linear 0s infinite progress"
  // },
  "#wrapper": { "fontSize": "0.75vw" },
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
  ".w-40p": { "width": "40%" },
  ".w-2": { "width": "4.0em" },
  ".w-10": { "width": "20.0em" },
  ".h-10": { "height": "20.0em" },
  ".h-screen": { "height": "100vh" },
  ".w-screen": { "width": "100vw" },
  ".bg-black": { "backgroundColor": "black" },
  ".relative": { "position": "relative" },
  ".absolute": { "position": "absolute" },
  ".object-cover": { "objectFit": "cover" },
  ".object-contain": { "objectFit": "contain" },
  ".flex": { "display": "flex" },
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
  ".place-content-center": { "placeContent": "center center" },
  ".brightness-pulse": {
    "animation": "2s ease-in-out 0s infinite alternate brightness-pulse",
    "transition": "filter ease-in-out 2s",
  },
  ".backdrop-blur-100": {
    "backdropFilter": "blur(100px)",
  },
  ".z-10": { "zIndex": 10 },
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
  ".hidden #thumbnail": { "cursor": "default", "scale": "0.5" },
  "@keyframes spin": { "100%": { "transform": "rotate(360deg)" } },
  ".text-ellipsis": { "textOverflow": "ellipsis" },
  ".text-4xl": { "fontSize": "3em", "lineHeight": 1 },
  ".text-2xl": { "fontSize": "1.5em", "lineHeight": "2em" },
  ".text-sm": { "fontSize": "0.875rem", "lineHeight": "1.25rem" },
  ".leading-none": { "lineHeight": 1 },
  ".font-bold": { "fontWeight": 700 },
  ".font-mono": { "fontFamily": "monospace" },
  ".tracking-tightest": { "letterSpacing": "-0.25em" },
  ".overflow-animation": { "position": "relative" },
  "@keyframes move": {
    "0%": { "transform": "translateX(0%)", "left": "0%" },
    "100%": { "transform": "translateX(-100%)", "left": "100%" },
  },
  ".align-center": { "textAlign": "center" },
  ".no-wrap": { "whiteSpace": "nowrap" },
  ".color-white": { "color": "white" },
  ".overflow-hidden": { "overflow": "hidden" },
  ".px-1": { "paddingLeft": "0.25em", "paddingRight": "0.25em" },
  ".px-8": { "paddingLeft": "2em", "paddingRight": "2em" },
  ".py-4": { "paddingTop": "1em", "paddingBottom": "1em" },
  ".py-12": { "paddingTop": "3em", "paddingBottom": "3em" },
};
