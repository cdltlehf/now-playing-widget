import "uebersicht";
import { React } from "uebersicht";
import { style } from "./lib/style.jsx";

const useState = React.useState;
export const className = style;

const rainbowWalPlugin =
    "bash ./YoutubeNowPlaying.widget/lib/rainbow_wal_plugin.sh";
const useRainbowWall = true;
const resetRainbowWall = (src) => { return uebersicht.run(`rainbow-wal`); }
const callRainbowWall = (src) => {
  return uebersicht.run(`rainbow-wal ${src}`);
}
const reloadKittyConfig = () => {
  return uebersicht.run('kill -SIGUSR1 "$(pgrep kitty)" > /dev/null 2>&1;');
}

export const command = "osascript YoutubeNowPlaying.widget/lib/get_url.scpt";
export const refreshFrequency = 1000;

const AsyncImage = (props) => {
  const [src, setSrc] = useState(null);
  React.useEffect(() => {
    setSrc(null);
    if (props.src === null) { return; }
    const image = new Image();
    const load = () => { setSrc(props.src); }
    image.onload = load;
    image.src = props.src;
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

const getThumbnail = (url) => {
  try {
    const id = url.split('?', 2)[1]
      .split('&')
      .findLast(s => s.includes('v='))
      .split('=')[1].trim();
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  } catch (e) {
    console.debug("Url is errornous.");
    return null;
  }
};

const LargeWidget = (props) => {
  const thumbnail = getThumbnail(props.url);
  console.debug(thumbnail);
  return (
    <div id='wrapper'>
      <AsyncImage alt='background' draggable='false' src={thumbnail}/>
      <div className='dim'></div>
      <div id='container'>
        <div id='thumbnail' onClick={props.minimize}>
        <AsyncImage alt='thumbnail' draggable='false' src={thumbnail}/>
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

const Widget = (props) => {
  const [minimized, setMinimized] = useState(null);
  const minimize = () => { setMinimized(true); }
  const thumbnail = getThumbnail(props.url);
  return (
    !minimized ?
    <LargeWidget title={props.title} url={props.url} minimize={minimize}/> :
    <div id='small-widget-wrapper' onClick={() => setMinimized(false)}>
      <div id='small-widget'>
        <AsyncImage alt='small-widget' draggable='false' src={thumbnail}/>
        <div className='dim'></div>
        <AsyncImage
          id='small-thumbnail-img' alt='small thumbnail' draggable='false'
          src={thumbnail}
        />
      </div>
    </div>
  );
};

export const render = ({title, url}) => <Widget title={title} url={url}/>;

export const initialState = {};
export const updateState = (event, { title, url }) => {
  const { output } = event;
  if (output.trim().length == 0) {
    title = null;
    url = null;
    return { title, url };
  }
  [title, url] = output.split('\n');
  return { title, url };
}
