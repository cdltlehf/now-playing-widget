import { run } from "uebersicht";
import { React } from "uebersicht";
import { style } from "./lib/style.js";

const useState = React.useState;
const useEffect = React.useEffect;
export const className = style;

const useRainbowWall = true;

const binHome = "YoutubeNowPlaying.widget/bin";
const reset = () => run(`${binHome}/reset`);
const callback = (src) => run(`${binHome}/callback ${src}`);

export const command = `${binHome}/get-url`;
export const refreshFrequency = 1000;

const AsyncImage = (props) => {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    setSrc(null);
    if (props.src === null) { return; }
    const image = new Image();
    const load = () => { setSrc(props.src); }
    image.onload = load;
    image.src = props.src;
    callback(props.src);
    return () => { image.removeEventListener('load', load); }
  }, [props.src]);
  if (src === props.src && src != null) {
    return <img {...props} />;
  }
  return null;
};

const LargeWidget = (props) => {
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

const getThumbnailFromId = async (id) => {
  const filenames = [
    'maxresdefault.jpg',
    'sddefault.jpg',
    'hqdefault.jpg',
    'mqdefault.jpg',
    'default.jpg'
  ];

  for (const filename of filenames) {
    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => { resolve(img); }
      img.onerror = reject;
      img.src = `https://img.youtube.com/vi/${id}/${filename}`;
    });
    const img = await promise;
    if (img == null) { continue; }
    if (img.width > 120) {
      return img.src;
    }
  }
  return null;
}

const getIdFromUrl = (url) => {
  try {
    return url.split('?', 2)[1]
      .split('&').findLast(s => s.includes('v=')).split('=')[1].trim();
  } catch (e) {
    return null;
  }
}

const Widget = (props) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [minimized, setMinimized] = useState(false);

  if (props.url == null) {
    return null;
    reset();
  };

  const id = getIdFromUrl(props.url);
  if (id == null) {
    console.debug("Url is errornous.");
    console.debug("Url: ", props.url);
    return null;
  }

  getThumbnailFromId(id).then((thumbnail) => {
    if (thumbnail == null) {
      console.debug("Thumbnail is null.");
      console.debug("Id: ", id);
      return null;
    }
    setThumbnail(thumbnail);
  });

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
