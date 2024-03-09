export const style = `
  user-select: none;
  cursor: default;
  font-family: sans-serif;
  pointer-events: none;

  #wrapper {
    position: absolute;
    align: center;
    width: 100vw;
    height: 100vh;

    opacity: 1;
    transition: opacity ease-in-out 0.2s;
    box-sizing: border-box;
    background-color: #1c1c1e;
    margin: auto;
    padding: 0px;
  }

  .dim {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    width: 100%;
    background-color: #1c1c1e;
    opacity: 0.4;
  }

  #wrapper > img {
    filter: saturate(300%) blur(100px);
    top: 50%;
    left: 50%;
    min-height: 100vh;
    min-width: 100vw;
    position: fixed;
    transform: translate(-50%,-50%) translateZ(0);
  }

  #container {
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    color: white;
    pointer-events: auto;
  }

  #thumbnail {
    margin: auto;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;

    max-width: 50vw;
    max-height: 50vh;
    overflow: hidden;
    box-shadow: 0px 0px 10px 0px #1c1c1e;
    border-radius: 10px;
    transition: scale ease-in-out 0.2s;
  }

  #thumbnail:hover {
    scale: 1.01;
  }

  .hidden #thumbnail {
    cursor: default;
    scale: 0.5;
  }

  @keyframes spin {
      100%{ transform: rotate(360deg); }
  }

  #subcontainer {
    background-color: #1c1c1eC0;
    display: inline-block;
    padding: 20px 60px;
    margin: 30px;
    border-radius: 15px;
    transition: width 0.2s ease-in-out;
    max-width: 80vw;
  }

  #title-wrapper {
    width: 100%;
    overflow: hidden;
    text-align: center;
  }

  #title {
    color: rgb(229, 229, 234);
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
  }

  .overflow-animation {
    position: relative;
    /* animation: move 3s infinite alternate ease-in-out; */
  }

  @keyframes move {
    0%   { transform: translateX(0%); left: 0%; }
    100% { transform: translateX(-100%); left: 100%; }
  }

  #subtitle {
    font-size: 18px;
    margin: 0.2em;
    color: rgb(199, 199, 204);
  }

  #progress-wrapper {
    fontSize: 18px;
    opacity: 0.5;
  }

  #progress {
    background-color: #BBBBBB;
    border-radius: 0.15em;
    display: inline-block;
    height: 0.3em;
    width: 10em;
    margin: 0em 0.8em;
    overflow: hidden;
    position: relative;
    vertical-align: 0.14em;
    > div {
      position: absolute;
      left: 0%;
      width: 200%;
      height: 100%;
      background: repeating-linear-gradient(
        45deg,
        rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 2.5%,
        rgba(255, 255, 255, 0) 2.5%, rgba(255, 255, 255, 0) 5%
      );
      animation: 10s linear 0s infinite progress;
    }
  }

  @keyframes progress {
    0% {
      left: 0%;
    }
    100% {
      left: -100%;
    }
  }

  #controller {
    font-family: monospace;
    font-size: 30px;
    letter-spacing: -0.2em;
    margin-bottom: -0.5em;
    opacity: 0.5;
    > span {
      font-size: 40px;
      vertical-align: -0.15em;
      display: inline-block;
      margin: 0px 1em 0px 1em;
    }
  }

  #small-widget-wrapper {
    transition: opacity ease-in-out 0.2s;
    padding: 16px;
    color: white;
    pointer-events: auto;
  }

  #small-widget {
    background-color: #1c1c1e;
    border-radius: 14px;
    border: 1px solid #eeeeee30;
    box-sizing: border;
    transition: scale ease-in-out 0.2s;
    overflow: hidden;

    position: fixed;

    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 140px;
    height: 140px;

    transition: scale ease-in-out 0.2s;
  }

  #small-widget:hover {
    scale: 1.05;
  }

  .hide #small-widget {
    cursor: default;
    scale: 0.5;
  }

  #small-widget > img:first-child {
    filter: blur(20px);
    transform: translateZ(0);
    height: inherit;
    width: inherit;
    object-fit: cover;
    position: absolute;
  }

  #small-thumbnail-img {
    display: block;
    object-fit: contain;
    z-index: 1;
  }

  #small-title {
    margin-left: 80px;
    font-size: 12px;
    text-shadow:
      0px 0px 5px #1c1c1e,
      0px 0px 5px #1c1c1e,
      0px 0px 5px #1c1c1e;
  }

  .hide {
    opacity: 0 !important;
  }

  .hide * {
    pointer-events: none !important;
  }
`

