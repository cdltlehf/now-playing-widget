target="$HOME/Library/Application Support/Übersicht/widgets/$(basename "$(pwd)")"
if [[ ! -e "$target" ]]; then
  ln -s "$(pwd)" "$target";
fi
