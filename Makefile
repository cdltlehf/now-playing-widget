TARGET_NAME := NowPlaying
WIDGET := $(TARGET_NAME).widget
TARGET := $(WIDGET).zip
WIDGETS_FOLDER := "${HOME}/Library/Application Support/Übersicht/widgets"

CLEAN_LIST := $(TARGET)

.PHONY: default
default: zip

$(TARGET): $(WIDGET)
	@rm -f $@
	@zip -r $@ $<

.PHONY: zip
zip: $(TARGET)

.PHONY: clean
clean:
	@rm $(CLEAN_LIST)

.PHONY: install
install: $(TARGET)
	@unzip -o $< -d $(WIDGETS_FOLDER)

.PHONY: vim
vim:
	@vim $$(git ls-files)
