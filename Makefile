TARGET_NAME := NowPlaying
WIDGET := $(TARGET_NAME).widget
TARGET := $(WIDGET).zip
WIDGETS_FOLDER := "${HOME}/Library/Application Support/Übersicht/widgets"

CLEAN_LIST := $(TARGET)

.PHONY: default
default: zip

$(TARGET): $(wildcard $(WIDGET)/**/*)
	rm -f $@
	zip -r $@ $(WIDGET)

.PHONY: zip
zip: $(TARGET)

.PHONY: install
install: $(TARGET)
	unzip -o $< -d $(WIDGETS_FOLDER)

.PHONY: uninstall
uninstall:
	rm -rf $(WIDGETS_FOLDER)/$(WIDGET)

.PHONY: clean
clean:
	rm $(CLEAN_LIST)
