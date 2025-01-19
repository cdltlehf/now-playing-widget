import { React, run } from "uebersicht";
import { style } from "./lib/style.js";

const useState = React.useState;
const useEffect = React.useEffect;
const useRef = React.useRef;

const fetchArtwork = () =>
  run("nowplaying-cli get artworkMIMEType artworkData")
    .then((output) => {
      const [mimeType, data] = output.split("\n");
      if (mimeType === "null" || data === "null") {
        throw new Error("Artwork not available");
      }
      return `data:${mimeType};base64,${data}`;
    });
const togglePlayPause = () => run("nowplaying-cli togglePlayPause");
const nextTrack = () => run("nowplaying-cli next");
const previousTrack = () => run("nowplaying-cli previous");

const secondsToStr = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds - minutes * 60);

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = remainingSeconds.toString().padStart(2, "0");

  if (hours > 0) return `${hoursStr}:${minutesStr}:${secondsStr}`;
  else return `${minutesStr}:${secondsStr}`;
};

const Placeholder = () => {
  const placeholderRef = useRef(null);
  const [fontSize, setFontSize] = useState(0);
  useEffect(() => {
    const placeholder = placeholderRef.current;
    if (placeholder) {
      const resizeObserver = new ResizeObserver(() => {
        const { width, height } = placeholder.getBoundingClientRect();
        const size = Math.min(width, height);
        setFontSize(size);
      });
      resizeObserver.observe(placeholder);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div
      ref={placeholderRef}
      className="w-full h-full align-center place-content-center color-grey"
      style={{
        "verticalAlign": "middle",
        "lineHeight": "1",
        "background": "#404040",
        "fontSize": `${fontSize}px`,
      }}
    >
      &#x23f5;
    </div>
  );
};

const Widget = ({ nowplaying_info }) => {
  const { title, artist, album, duration, elapsedTime, playbackRate } =
    nowplaying_info;
  const [src, setSrc] = useState(null);
  const [showControl, setShowControl] = useState(false);
  const [isPlaying, setIsPlaying] = useState(playbackRate > 0.0);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [size, setSize] = useState({ width: 250, height: 250 });

  const [moving, setMoving] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [moved, setMoved] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchArtwork().then((src) => setSrc(src)).catch(() => setSrc(null));
  }, [title]);

  useEffect(() => {
    if (src == null) {
      fetchArtwork().then((src) => setSrc(src)).catch(() => setSrc(null));
    }
  }, [nowplaying_info]);

  useEffect(() => {
    setIsPlaying(playbackRate > 0.0);
  }, [playbackRate]);

  const startMoving = (e) => {
    setMoving(true);
    setMouseOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const startResizing = () => {
    setResizing(true);
  };

  const minWidth = 100;
  const maxWidth = 500;
  const thresholdWidth = 250;

  const drag = (e) => {
    if (!moving) return;
    if (resizing) {
      const width = Math.min(
        Math.max(
          minWidth,
          e.clientX - position.x,
          e.clientY - position.y,
        ),
        maxWidth,
      );
      const height = width;
      setSize({ width: width, height: height });
      return;
    }
    if (
      moved ||
      Math.abs(position.x - e.clientX + mouseOffset.x) > 5 ||
      Math.abs(position.y - e.clientY + mouseOffset.y) > 5
    ) {
      setMoved(true);
      setPosition({
        x: e.clientX - mouseOffset.x,
        y: e.clientY - mouseOffset.y,
      });
    }
  };

  const stopDragging = () => {
    setMoving(false);
    setResizing(false);
  };

  return (
    <div
      id="wrapper"
      className={"color-white w-screen h-screen" + " " + (
        minimized ? "" : "flex place-content-center"
      ) + " " + (moving ? "pointer-events-auto" : "pointer-events-none")}
      onMouseMove={drag}
      onMouseUp={stopDragging}
    >
      {minimized ? null : (
        <div>
          {src != null
            ? (
              <img
                alt="background"
                draggable="false"
                src={src}
                className="h-full w-full filter brightness-pulse blur-100 saturate-450 absolute top-0 left-0 opacity-80"
              />
            )
            : null}
          <div className="backdrop-blur-100 h-full w-full absolute top-0 left-0">
          </div>
        </div>
      )}
      <div
        id="widget"
        className={"box-border z-10 place-content-center pointer-events-auto flex-col " +
          (minimized
            ? "bg-black radius-10 fixed overflow-hidden shadow "
            : "w-60vh h-full flex ") +
          (minimized && size.width == minWidth
            ? "opacity-0 hover-opacity-30"
            : "")}
        onMouseMove={() =>
          size.width >= thresholdWidth ? setShowControl(true) : null}
        onMouseEnter={() =>
          size.width >= thresholdWidth ? setShowControl(true) : null}
        onMouseLeave={() => setShowControl(false)}
        onMouseDown={minimized ? startMoving : null}
        style={minimized
          ? {
            "top": `${position.y}px`,
            "left": `${position.x}px`,
            "width": `${size.width}px`,
            "height": `${size.height}px`,
          }
          : null}
      >
        <div className="flex-1"></div>
        {!minimized ? null : (
          <div
            className="w-20px h-20px z-20 right-0 bottom-0 absolute cursor-resize"
            onMouseDown={startResizing}
          >
          </div>
        )}
        <div
          className="overflow-hidden aspect-square shadow radius-10 border place-content-center flex-none hover-filter-brightness-50"
          onClick={(_) => {
            if (!minimized) {
              setMinimized(true);
            } else if (!moved) {
              setMinimized(false);
            }
            setShowControl(false);
            setMoved(false);
          }}
        >
          {src != null
            ? (
              <img
                alt="background"
                draggable="false"
                src={src}
                className="w-full"
              />
            )
            : <Placeholder />}
        </div>
        <div
          className={minimized
            ? "absolute w-full bottom-0 left-0 bg-black"
            : "flex-1"}
        >
          {minimized && !showControl ? null : (
            <div
              id="control"
              className={"no-wrap align-center px-8 " +
                (minimized ? "py-4" : "pt-12")}
            >
              <div className="text-sm flex justify-between opacity-60">
                <span>
                  {elapsedTime ? secondsToStr(elapsedTime) : "--:--"}
                </span>
                <span>
                  {elapsedTime
                    ? `-${secondsToStr(duration - elapsedTime)}`
                    : "--:--"}
                </span>
              </div>
              <div>
                <progress max={duration} value={elapsedTime}></progress>
              </div>
              {showControl || minimized
                ? (
                  <div className="text-4xl font-mono opacity-60">
                    <span
                      className="w-2 px-1 hover-bg-white-20 radius-5"
                      onClick={previousTrack}
                    >
                      &#x23ee;
                    </span>
                    <span
                      className="w-2 px-1 hover-bg-white-20 radius-5"
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                        togglePlayPause();
                      }}
                    >
                      {isPlaying ? <>&#x23f8;</> : <>&#x23f5;</>}
                    </span>
                    <span
                      className="w-2 px-1 hover-bg-white-20 radius-5"
                      onClick={nextTrack}
                    >
                      &#x23ed;
                    </span>
                  </div>
                )
                : (
                  <div>
                    <div className="text-ellipsis text-1-5em font-bold w-full opacity-95 leading-none overflow-hidden">
                      {title}
                    </div>
                    <div className="py-1 text-ellipsis text-1-5em w-full opacity-60 leading-none overflow-hidden">
                      {artist}
                      {album ? `—${album}` : ""}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const className = style;
export const command =
  "nowplaying-cli get title artist album duration elapsedTime playbackRate";
export const refreshFrequency = 1000;
export const render = (nowplaying_info) => {
  if (nowplaying_info == null) return null;

  return <Widget nowplaying_info={nowplaying_info} />;
};

export const initialState = null;

export const updateState = ({ output }) => {
  if (output == null) return null;

  let [title, artist, album, duration, elapsedTime, playbackRate] = output
    .split("\n");
  title = title === "null" ? null : title;
  artist = artist === "null" ? null : artist;
  album = album === "null" ? null : album;
  duration = duration === "null" ? null : parseFloat(duration);
  elapsedTime = elapsedTime === "null" ? null : parseFloat(elapsedTime);
  playbackRate = playbackRate === "null" ? null : parseFloat(playbackRate);

  if (title == null && artist == null && album == null) return null;

  const nowplaying_info = {
    title,
    artist,
    album,
    duration,
    elapsedTime,
    playbackRate,
  };
  return nowplaying_info;
};
