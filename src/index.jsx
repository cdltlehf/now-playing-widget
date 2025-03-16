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
      runHook();
      return `data:${mimeType};base64,${data}`;
    });

const runHook = () =>
  run('eval "${NOW_PLAYING_WIDGET_HOOK}"').catch((e) => {
    throw new Error(`Failed to run hook: ${e}`);
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

const InformationComponent = (
  { nowplaying_info, minimized, showController },
) => {
  const { title, artist, album, duration, elapsedTime, playbackRate } =
    nowplaying_info;
  const [isPlaying, setIsPlaying] = useState(playbackRate > 0.0);

  useEffect(() => {
    setIsPlaying(playbackRate > 0.0);
  }, [playbackRate]);

  if (minimized && !showController) return null;
  return (
    <div
      className={minimized
        ? "absolute w-full bottom-0 left-0 bg-black"
        : "flex-1"}
    >
      <div
        id="information"
        className={"no-wrap align-center px-8 " +
          (minimized ? "py-4" : "pt-12")}
      >
        <div className="text-sm flex justify-between opacity-60">
          <span>
            {elapsedTime ? secondsToStr(elapsedTime) : "--:--"}
          </span>
          <span>
            {elapsedTime ? `-${secondsToStr(duration - elapsedTime)}` : "--:--"}
          </span>
        </div>
        <div>
          <progress max={duration} value={elapsedTime}></progress>
        </div>
        {showController || minimized
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
    </div>
  );
};

const AlbumImageComponent = ({ src, onClick }) => {
  const imgDom = (
    <img
      alt="background"
      draggable="false"
      src={src}
      className="w-full block"
    />
  );

  return (
    <div
      className="box-border overflow-hidden aspect-square shadow radius-10 border place-content-center flex-none hover-filter-brightness-50 align-center"
      onClick={onClick}
    >
      {src != null ? imgDom : <Placeholder />}
    </div>
  );
};

const MainWidgetComponent = ({
  nowplaying_info,
  src,
  minimized,
  size,
  position,
  isMoved,
  isResized,
  onMouseDown,
  onClickAlbumImage: onClickAlbumImageCallback,
}) => {
  const [showController, setShowController] = useState(false);
  const thresholdWidth = 250;

  const classNames = [
    "box-border z-10 place-content-center pointer-events-auto flex-col",
  ];
  if (minimized) {
    classNames.push("bg-black radius-10 fixed shadow overflow-hidden");
  } else {
    classNames.push("w-60vh h-full flex");
  }

  const positionStyle = {
    "top": `${position.y}px`,
    "left": `${position.x}px`,
    "width": `${size.width}px`,
    "height": `${size.height}px`,
  };

  const onClickAlbumImage = () => {
    setShowController(false);
    onClickAlbumImageCallback();
  };

  const onMouseEnter = () => setShowController(true);
  const onMouseLeave = () => setShowController(false);
  return (
    <div
      id="main-widget"
      className={classNames.join(" ")}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      style={minimized ? positionStyle : null}
    >
      <div className="flex-1"></div>
      <AlbumImageComponent src={src} onClick={onClickAlbumImage} />
      <InformationComponent
        nowplaying_info={nowplaying_info}
        minimized={minimized}
        showController={!(size.width < thresholdWidth && minimized) &&
          !isMoved && !isResized && showController}
      />
    </div>
  );
};

const Widget = ({ nowplaying_info }) => {
  const { title } = nowplaying_info;
  const [src, setSrc] = useState(null);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [size, setSize] = useState({ width: 250, height: 250 });
  const minWidth = 100;
  const maxWidth = 500;

  const [initialSize, setInitialSize] = useState(size);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isResized, setIsResized] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
  const [willPreventMinimize, setWillPreventMinimize] = useState(false);

  useEffect(() => {
    fetchArtwork().then((src) => setSrc(src)).catch(() => setSrc(null));
  }, [title]);

  useEffect(() => {
    if (src == null) {
      fetchArtwork().then((src) => setSrc(src)).catch(() => setSrc(null));
    }
  }, [nowplaying_info]);

  const startMoving = (e) => {
    if (e.button !== 0) return;
    setWillPreventMinimize(false);
    setIsMouseDown(true);
    setMouseOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const startResizing = (e) => {
    setInitialSize(size);
    setMouseOffset({ x: e.clientX, y: e.clientY });
    setIsMouseDown(true);
    setIsResized(true);
  };

  let resizeButton;
  {
    const classNames = ["z-20 fixed pointer-events-auto"];
    if (!isResized) classNames.push("opacity-0 hover-opacity-80");
    resizeButton = (
      <div
        className={classNames.join(" ")}
        style={{
          "left": `${position.x + size.width - 25}px`,
          "top": `${position.y + size.height - 25}px`,
        }}
        onMouseDown={startResizing}
      >
        <svg width="30" height="30">
          <path
            d={[
              "M25,5",
              "L25,10",
              "A15,15,0,0,1,10,25",
              "L5,25",
            ].join(" ")}
            fill="none"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={[
              "M25,5",
              "L25,10",
              "A15,15,0,0,1,10,25",
              "L5,25",
            ].join(" ")}
            fill="none"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  const drag = (e) => {
    if (!isMouseDown) return;

    if (isResized) {
      const width = Math.min(
        Math.max(
          minWidth,
          e.clientX - mouseOffset.x + initialSize.width,
          e.clientY - mouseOffset.y + initialSize.height,
        ),
        maxWidth,
      );
      const height = width;
      setSize({ width: width, height: height });
    } else if (
      isMoved ||
      Math.abs(position.x - e.clientX + mouseOffset.x) > 5 ||
      Math.abs(position.y - e.clientY + mouseOffset.y) > 5
    ) {
      setWillPreventMinimize(true);
      setIsMoved(true);
      setPosition({
        x: e.clientX - mouseOffset.x,
        y: e.clientY - mouseOffset.y,
      });
    }
  };

  const backgoundDiv = (
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
  );

  const onClickAlbumImage = () => {
    if (willPreventMinimize) return;
    setMinimized(!minimized);
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
    setIsResized(false);
    setIsMoved(false);
  };

  const classNames = ["color-white w-screen h-screen"];
  if (!minimized) classNames.push("flex place-content-center");
  classNames.push(isMouseDown ? "pointer-events-auto" : "pointer-events-none");
  if (minimized && size.width <= minWidth) {
    if (isMoved || isResized) {
      classNames.push("opacity-30");
    } else {
      classNames.push("opacity-0 hover-opacity-30");
    }
  }

  return (
    <div
      id="wrapper"
      className={classNames.join(" ")}
      onMouseMove={drag}
      onMouseUp={onMouseUp}
      style={{ "fontSize": "1.2vh" }}
    >
      {minimized ? resizeButton : backgoundDiv}
      <MainWidgetComponent
        nowplaying_info={nowplaying_info}
        src={src}
        minimized={minimized}
        size={size}
        position={position}
        isMoved={isMoved}
        isResized={isResized}
        onMouseDown={minimized ? startMoving : null}
        onClickAlbumImage={onClickAlbumImage}
      />
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

export const updateState = ({ output }, previousState) => {
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
