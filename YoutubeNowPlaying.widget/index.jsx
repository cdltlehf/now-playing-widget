import { run } from "uebersicht";
import { React } from "uebersicht";
import { style } from "./lib/style.jsx";

const useState = React.useState;
const useEffect = React.useEffect;
export const className = style;

const useRainbowWall = true;
const resetRainbowWall = (src) => {
  return run(
    `rainbow-wal`
    + 'kill -SIGUSR1 "$(pgrep kitty)" > /dev/null 2>&1;'
  );
}
const callRainbowWall = (src) => {
  return run(
    `rainbow-wal ${src};`
    + 'kill -SIGUSR1 "$(pgrep kitty)" > /dev/null 2>&1;'
  );
}
const reloadKittyConfig = () => {
  return run();
}

export const command = "osascript YoutubeNowPlaying.widget/lib/get_url.scpt";
export const refreshFrequency = 1000;

const AsyncImage = (props) => {
  const [src, setSrc] = useState(false);
  React.useEffect(() => {
    setSrc(null);
    if (props.src === null) { return; }
    const image = new Image();
    const load = () => { setSrc(props.src); }
    image.onload = load;
    image.src = props.src;
    callRainbowWall(props.src);
    reloadKittyConfig();
    return () => { image.removeEventListener('load', load); }
  }, [props.src]);
  if (src === props.src) {
    return <img {...props} />;
  }
  return null;
};

const getId = (url) => {
  return url.split('?', 2)[1]
    .split('&').findLast(s => s.includes('v=')).split('=')[1].trim();
};

const LargeWidget = (props) => {
  console.debug(props);
  return (
    <div id='wrapper'>
      <AsyncImage alt='background' draggable='false' src={props.thumbnail}/>
      <div className='dim'></div>
      <div id='container'>
        <div id='thumbnail' onClick={props.minimize}>
        <AsyncImage alt='thumbnail' draggable='false' src={props.thumbnail}/>
        </div>
            <div id='subcontainer'>
            <div id='title-wrapper'><div id='title'>{props.title}</div></div>
            <div id='subtitle'>Youtube</div>
            <div id='progress-wrapper'>
              <span>--:--</span>
              <span id='progress'><div></div></span>
              <span>--:--</span>
            </div>
            <div id='controller'>
              &#x25C2;&#x25C2;<span>&#x23f8;</span>&#x25B8;&#x25B8;
            </div>
        </div>
      </div>
    </div>
  );
};

const SmallWidget = (props) => {
  return <div id='small-widget-wrapper' onClick={props.maximize}>
    <div id='small-widget'>
      <AsyncImage alt='small-widget' draggable='false' src={props.thumbnail}/>
      <div className='dim'></div>
      <AsyncImage
        id='small-thumbnail-img' alt='small thumbnail' draggable='false'
        src={props.thumbnail}
      />
    </div>
  </div>
};

const Widget = (props) => {
  if (props.url == null) { return null; };
  const getThumbnail = (url) => {
    try {
      const id = url.split('?', 2)[1]
        .split('&')
        .findLast(s => s.includes('v='))
        .split('=')[1].trim();
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    } catch (e) {
      console.debug("Url is errornous.");
      console.debug("Url: ", url);
      return null;
    };
  };
  const thumbnail = getThumbnail(props.url);
  const [minimized, setMinimized] = useState(false);
  const sleep = async (ms) => new Promise(res => setTimeout(res, ms));
  const minimize = () => { setMinimized(true); };
  const maximize = () => { setMinimized(false); };
  const largeWidget = <LargeWidget
    title={props.title} thumbnail={thumbnail}
    minimize={minimize} className={minimized ? 'hide' : ''}
  />
  const smallWidget = <SmallWidget
    thumbnail={thumbnail} maximize={maximize}
    className={minimized ? 'hide' : ''}
  />;
  return !minimized ? largeWidget : smallWidget;
};

export const render = ({title, url}) => <Widget title={title} url={url}/>;
export const initialState = {};
export const updateState = (event, { title, url }) => {
  const { output } = event;
  if (output === null) { return; }
  if (output.trim().length == 0) {
    title = null;
    url = null;
    return { title, url };
  }
  [title, url] = output.split('\n');
  return { title, url };
}
