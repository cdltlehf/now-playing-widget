// @ts-ignore Ignore import
import { React, run } from "uebersicht";
import { style } from "./lib/style.js";

const useState = React.useState;
const useEffect = React.useEffect;

const fetchArtwork = () =>
  run("nowplaying-cli get artworkMIMEType artworkData")
    .then((output) => {
      const [mimeType, data] = output.split("\n");
      if (mimeType === "null" || data === "null") {
        throw new Error("Artwork not available");
      }
      return `data:${mimeType};base64,${data}`;
    });

const secondsToStr = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds - minutes * 60);

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = remainingSeconds.toString().padStart(2, "0");

  if (hours > 0) {
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  } else {
    return `${minutesStr}:${secondsStr}`;
  }
};

const LargeWidget = ({ nowplaying_info }) => {
  if (nowplaying_info.title == null) return;

  const { title, artist, album, duration, elapsedTime } = nowplaying_info;
  const [src, setSrc] = useState(null);

  useEffect(() => {
    fetchArtwork().then((src) => setSrc(src)).catch(() => setSrc(null));
  }, [title]);

  useEffect(() => {
    if (src == null) {
      fetchArtwork().then((src) => setSrc(src)).catch(() => setSrc(null));
    }
  }, [nowplaying_info]);

  return (
    <div id="wrapper">
      {src != null
        ? <img alt="background" draggable="false" src={src} />
        : null}
      <div className="dim"></div>
      <div id="container">
        <div id="thumbnail">
          {src != null
            ? <img alt="background" draggable="false" src={src} />
            : null}
        </div>
        <div id="subcontainer">
          <div id="timestamp">
            <span id="elapsed-time">
              {elapsedTime == null ? "--:--" : secondsToStr(elapsedTime)}
            </span>
            <span id="remaining-time">
              {elapsedTime == null
                ? "--:--"
                : "-" + secondsToStr(duration - elapsedTime)}
            </span>
          </div>
          <progress max={duration} value={elapsedTime}><div></div></progress>
          <div id="title">{title}</div>
          <div id="subtitle">{artist} — {album}</div>
        </div>
      </div>
    </div>
  );
};

// <div id='controller'>
//   &#x25C2;&#x25C2;<span>&#x23f8;</span>&#x25B8;&#x25B8;
// </div>

// const SmallWidget = (props) => {
//   return <div id='small-widget-wrapper' onClick={props.maximize}>
//     <div id='small-widget'>
//       <AsyncImage alt='small-widget' draggable='false' src={props.thumbnail}/>
//       <div className='dim'></div>
//       <AsyncImage
//         id='small-thumbnail-img' alt='small thumbnail' draggable='false'
//         src={props.thumbnail}
//       />
//     </div>
//   </div>
// };

const Widget = ({ nowplaying_info }) => {
  return <LargeWidget nowplaying_info={nowplaying_info} />;
};

export const className = style;
export const command =
  "nowplaying-cli get title artist album duration elapsedTime";
export const refreshFrequency = 1000;
export const render = (nowplaying_info) => {
  const { title, artist, album } = nowplaying_info;
  if (title === null && artist === null && album === null) {
    return null;
  }
  return <Widget nowplaying_info={nowplaying_info} />;
};

export const initialState = {
  "title": null,
  "artist": null,
  "album": null,
  "duration": null,
  "elapsedTime": null,
};

export const updateState = ({ output }) => {
  let [title, artist, album, duration, elapsedTime] = output.split("\n");
  // FIXME: title can be 'null'...
  title = title === "null" ? null : title;
  artist = artist === "null" ? null : artist;
  album = album === "null" ? null : album;
  duration = duration === "null" ? null : duration;
  elapsedTime = elapsedTime === "null" ? null : elapsedTime;
  if (title === null && artist === null && album === null) {
    return null;
  }
  return { title, artist, album, duration, elapsedTime };
};
