import { run } from "uebersicht";
import { React } from "uebersicht";
import { style } from "./lib/style.js";

const useState = React.useState;
const useEffect = React.useEffect;

const getArtworkData = () => run("nowplaying-cli get artworkData");

const AsyncImage = (props) => {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    setSrc(null);
    if (props.src === null) { return; }
    const image = new Image();
    const load = () => { setSrc(props.src); }
    image.onload = load;
    image.src = props.src;
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
          <div id='timestamp'>
            <span id='elapsed-time'>--:--</span>
            <span id='remaining-time'>--:--</span>
          </div>
          <div id='progress'><div></div></div>
          <div id='title-wrapper'><div id='title'>{props.title}</div></div>
          <div id='subtitle'>{props.artist} — {props.album}</div>
        </div>
      </div>
    </div>
  );
};
// <div id='controller'>
//   &#x25C2;&#x25C2;<span>&#x23f8;</span>&#x25B8;&#x25B8;
// </div>

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

  if (props.willUpdateArtwork) {
    getArtworkData().then(data => {
      console.debug('load');
      setThumbnail(`data:image/jpeg;base64,${data}`);
    });
  }


  const sleep = async (ms) => new Promise(res => setTimeout(res, ms));
  const minimize = () => { setMinimized(true); };
  const maximize = () => { setMinimized(false); };

  const largeWidget = <LargeWidget
    title={props.title} artist={props.artist} album={props.album}
    thumbnail={thumbnail} minimize={minimize}
    className={minimized ? 'hide' : ''}
  />

  const smallWidget = <SmallWidget
    thumbnail={thumbnail} maximize={maximize}
    className={minimized ? 'hide' : ''}
  />;
  return !minimized ? largeWidget : smallWidget;
};

export const className = style;
export const command = "nowplaying-cli get title artist album";
export const refreshFrequency = 1000;
export const render = ({title, artist, album, willUpdateArtwork}) => {
  if (title === 'null' && artist === 'null' && album === 'null') {
    return null;
  }
  return <
    Widget
    title={title} artist={artist} album={album}
    willUpdateArtwork={willUpdateArtwork}
  />;
}
export const initialState = {
  "title": "null",
  "artist": "null",
  "album": "null",
  "willUpdateArtwork": false
};
export const updateState = (event, state) => {
  const { output } = event;
  const info = output.split('\n');
  const title = info[0];
  const artist = info[1];
  const album = info[2];
  const willUpdateArtwork = (state.title !== title);
  return { title, artist, album, willUpdateArtwork };
}
