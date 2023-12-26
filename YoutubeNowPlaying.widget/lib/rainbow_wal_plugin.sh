! command -v rainbow_wal && exit 1;
rainbow_wal --filename "$1";
kill -SIGUSR1 "$(pgrep kitty)" > /dev/null 2>&1;
