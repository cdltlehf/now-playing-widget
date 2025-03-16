# NowPlaying for [Übersicht](http://tracesof.net/uebersicht/)

![NowPlaying](./screenshot.png)

An Apple Music style now playing widget.

[GitHub](https://github.com/cdltlehf/youtube-now-playing-widget)

## Dependencies

- [nowplaying-cli](https://github.com/kirtan-shah/nowplaying-cli)

## Installation

```bash
make install
```

## Hooks

To use hooks, set the `NOW_PLAYING_WIDGET_HOOK` environment variable. These
hooks will be invoked after loading the artwork.

```bash
NOW_PLAYING_WIDGET_HOOK='nowplaying-cli get artworkData \
  | base64 -d \
  | colorgen --stdin \
  | flavours apply --stdin \
'
```

For the above example, refer to the following repositories:
- [colorgen](https://github.com/cdltlehf/colorgen)
- [flavours](https://github.com/Misterio77/flavours)
