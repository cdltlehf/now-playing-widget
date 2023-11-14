export const command = "osascript youtube-now-playing.widget/lib/get_url.scpt";
export const refreshFrequency = 200;

export const className = `
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  cursor: default;
  font-family: sans-serif;

  .hide {
    opacity: 0 !important;
  }

  #wrapper {
    top: 50%;
    left: 50%;
    position: absolute;
    align: center;
    width: 100vw;
    height: 100vh;

    opacity: 1;
    transition: opacity ease-in-out 0.2s;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    background-color: #1c1c1e;
    margin: auto;
    padding: 0px;

    > #dim {
      position: fixed;
      left: 0px;
      top: 0px;
      height: 100vh;
      width: 100vw;
      background-color: #1c1c1e;
      opacity: 0.4;
      /* animation: pulse 4s infinite ease-in-out alternate; */
    }
  }

  #wrapper > img {
    position: fixed;
    left: 50%;
    top: 50%;
    min-height: 100vh;
    min-width: 100vw;
    transform: translate(-50%,-50%) translateZ(0);
    filter: saturate(300%) blur(100px);
  }

  @keyframes pulse {
      0% { opacity: 0.4; }
      100% { opacity: 0.7; }
  }

  #container {
    display: inline-block;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    color: white;
  }

  #thumbnail {
    max-width: 640px;
    max-height: 640px;
    margin: auto;
    position: relative;
    cursor: pointer;
    transition: scale ease-in-out 0.2s;

    > img {
      border-radius: 10px;
      left: 50%;
      top: 50%;
      height: auto;
      width: 100%;
      box-shadow: 0px 0px 10px 0px #1c1c1e;
    }
  }

  #thumbnail:hover {
    scale: 1.01;
    transition: scale ease-in-out 0.2s;
  }

  .hide #thumbnail {
    scale: 0.5;
    cursor: default;
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
      background: linear-gradient(
        45deg,
        rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 5%,
        rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 10%,
        rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 1) 15%,
        rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 0) 20%,
        rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 1) 25%,
        rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 30%,
        rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 1) 35%,
        rgba(255, 255, 255, 0) 35%, rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 1) 45%,
        rgba(255, 255, 255, 0) 45%, rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 55%,
        rgba(255, 255, 255, 0) 55%, rgba(255, 255, 255, 0) 60%,
        rgba(255, 255, 255, 1) 60%, rgba(255, 255, 255, 1) 65%,
        rgba(255, 255, 255, 0) 65%, rgba(255, 255, 255, 0) 70%,
        rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 1) 75%,
        rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0) 80%,
        rgba(255, 255, 255, 1) 80%, rgba(255, 255, 255, 1) 85%,
        rgba(255, 255, 255, 0) 85%, rgba(255, 255, 255, 0) 90%,
        rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 1) 95%,
        rgba(255, 255, 255, 0) 95%, rgba(255, 255, 255, 0) 100%
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
`

export const render = (_) => {
  return (
    <span id='wrapper' className='hide' url=''>
      <img alt='background' draggable='false'/>
      <div id='dim'></div>
      <div id='container'>
        <div id='thumbnail'>
          <img alt='thumbnail' draggable='false'/>
        </div>
        <div id='subcontainer'>
          <div id='title-wrapper'><div id='title'>title</div></div>
          <div id='subtitle'>Youtube</div>
          <div style={{fontSize: 18 + 'px', 'opacity': 0.5}}>
            <span>--:--</span>
            <span id='progress'><div></div></span>
            <span>--:--</span>
          </div>
          <div id='controller'>
            &#x25C2;&#x25C2;<span>&#x23f8;</span>&#x25B8;&#x25B8;
          </div>
        </div>
      </div>
    </span>
  );
};

export const updateState = (event, _) => {
  const wrapper = document.getElementById('wrapper');
  const hide = () => { wrapper.classList.add('hide'); };
  const show = () => { wrapper.classList.remove('hide'); };

  const output = event.output;
  if (output.trim().length == 0) { hide(); return; }

  const [title, url] = output.split('\n');
  if (window.url === url) { return; }
  window.url = url;
  if (!url.includes('youtube.com')) { return; }

  let id = null;
  try {
    id = (
      url.split('?', 2)[1]
      .split('&')
      .findLast(s => s.includes('v='))
      .split('=')[1].trim()
    );
  }
  catch (e) {
    hide()
    return;
  }
  show();

  const wrapper_img = wrapper.querySelector("img");
  const thumbnail = document.getElementById('thumbnail');
  thumbnail.onclick = hide;
  const thumbnail_img = thumbnail.querySelector("img");
  const title_dom = document.getElementById('title');
  const title_wrapper = document.getElementById('title-wrapper');

  const image = new Image();
  image.onload = (e) => {
    const fallback_src = `https://img.youtube.com/vi/${id}/0.jpg`;
    if (0 < e.target.naturalWidth && e.target.naturalWidth < 240) {
      if (e.target.src !== fallback_src) {
        image.src = `https://img.youtube.com/vi/${id}/0.jpg`;
        return;
      }
    }
    const src = e.target.src;
    wrapper_img.setAttribute('src', src);
    thumbnail_img.setAttribute('src', src);
  };
  image.onerror = (e) => {
    const fallback_src = `https://img.youtube.com/vi/${id}/0.jpg`;
    if (src !== e.target.src) { image.src = fallback_src; }
  };
  image.src = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  const title_split = title.split(' - ');
  const title_prefix = (
    title_split.slice(0, title_split.length - 1)).join(' - ')
  title_dom.innerHTML = title_prefix;
  if (title_wrapper.clientWidth < title_dom.clientWidth) {
    title_dom.classList.add("overflow-animation");
  } else {
    title_dom.classList.remove("overflow-animation");
  }
}
