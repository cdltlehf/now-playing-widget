export const style = {
  userSelect: "none",
  cursor: "default",
  fontFamily: "sans-serif",
  pointerEvents: "none",
  "#wrapper": {
    position: "absolute",
    align: "center",
    width: "100vw",
    height: "100vh",
    opacity: 1,
    transition: "opacity ease-in-out 0.2s",
    boxSizing: "border-box",
    backgroundColor: "#1c1c1e",
    margin: "auto",
    padding: "0px"
  },
  ".dim": {
    position: "absolute",
    left: "0px",
    top: "0px",
    height: "100%",
    width: "100%",
    backgroundColor: "#1c1c1e",
    opacity: 0.4
  },
  "#wrapper > img": {
    filter: "saturate(300%) blur(100px)",
    top: "50%",
    left: "50%",
    minHeight: "100vh",
    minWidth: "100vw",
    position: "fixed",
    transform: "translate(-50%,-50%) translateZ(0)"
  },
  "#container": {
    display: "inline-block",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    color: "white",
    pointerEvents: "auto"
  },
  "#thumbnail": {
    margin: "auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "50vw",
    maxHeight: "50vh",
    overflow: "hidden",
    boxShadow: "0px 0px 10px 0px #1c1c1e",
    borderRadius: "10px",
    transition: "scale ease-in-out 0.2s"
  },
  "#thumbnail:hover": { scale: "1.01" },
  ".hidden #thumbnail": { cursor: "default", scale: "0.5" },
  "@keyframes spin": { "100%": { transform: "rotate(360deg)" } },
  "#subcontainer": {
    backgroundColor: "#1c1c1eC0",
    display: "inline-block",
    padding: "20px 60px",
    margin: "30px",
    borderRadius: "15px",
    transition: "width 0.2s ease-in-out",
    maxWidth: "80vw"
  },
  "#title-wrapper": { width: "100%", overflow: "hidden", textAlign: "center" },
  "#title": {
    color: "rgb(229, 229, 234)",
    display: "inline-block",
    fontSize: "20px",
    fontWeight: "bold",
    whiteSpace: "nowrap"
  },
  ".overflow-animation": { position: "relative" },
  "@keyframes move": {
    "0%": { transform: "translateX(0%)", left: "0%" },
    "100%": { transform: "translateX(-100%)", left: "100%" }
  },
  "#subtitle": {
    fontSize: "18px",
    margin: "0.2em",
    color: "rgb(199, 199, 204)"
  },
  "#progress-wrapper": { fontsize: "18px", opacity: 0.5 },
  "#progress": {
    backgroundColor: "#BBBBBB",
    borderRadius: "0.15em",
    display: "inline-block",
    height: "0.3em",
    width: "10em",
    margin: "0em 0.8em",
    overflow: "hidden",
    position: "relative",
    verticalAlign: "0.14em",
    "> div": {
      position: "absolute",
      left: "0%",
      width: "200%",
      height: "100%",
      background:
        "repeating-linear-gradient(\n        45deg,\n        rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 2.5%,\n        rgba(255, 255, 255, 0) 2.5%, rgba(255, 255, 255, 0) 5%\n      )",
      animation: "10s linear 0s infinite progress"
    }
  },
  "@keyframes progress": { "0%": { left: "0%" }, "100%": { left: "-100%" } },
  "#controller": {
    fontFamily: "monospace",
    fontSize: "30px",
    letterSpacing: "-0.2em",
    marginBottom: "-0.5em",
    opacity: 0.5,
    "> span": {
      fontSize: "40px",
      verticalAlign: "-0.15em",
      display: "inline-block",
      margin: "0px 1em 0px 1em"
    }
  },
  "#small-widget-wrapper": {
    transition: "opacity ease-in-out 0.2s",
    padding: "16px",
    color: "white",
    pointerEvents: "auto"
  },
  "#small-widget": {
    backgroundColor: "#1c1c1e",
    borderRadius: "14px",
    border: "1px solid #eeeeee30",
    boxSizing: "border",
    transition: ["scale ease-in-out 0.2s", "scale ease-in-out 0.2s"],
    overflow: "hidden",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "140px",
    height: "140px"
  },
  "#small-widget:hover": { scale: "1.05" },
  ".hide #small-widget": { cursor: "default", scale: "0.5" },
  "#small-widget > img:first-child": {
    filter: "blur(20px)",
    transform: "translateZ(0)",
    height: "inherit",
    width: "inherit",
    objectFit: "cover",
    position: "absolute"
  },
  "#small-thumbnail-img": { display: "block", objectFit: "contain", zIndex: 1 },
  "#small-title": {
    marginLeft: "80px",
    fontSize: "12px",
    textShadow:
      "0px 0px 5px #1c1c1e,\n"
      + "0px 0px 5px #1c1c1e,\n"
      + "0px 0px 5px #1c1c1e"
  },
  ".hide": { opacity: "0 !important" },
  ".hide *": { pointerEvents: "none !important" }
}
