WIDGET := NowPlaying.widget
TARGET := $(WIDGET).zip
WIDGETS_DIR := "${HOME}/Library/Application Support/Übersicht/widgets"

CLEAN_LIST := $(TARGET) $(WIDGET)

.PHONY: default
default: zip

$(TARGET): $(shell find $(WIDGET) -type f)
	rm -f $@
	zip -r $@ $^

.PHONY: zip
zip: $(TARGET)

$(WIDGETS_DIR)/$(WIDGET): $(TARGET)
	unzip -o $< -d $(WIDGETS_DIR)

.PHONY: install
install: $(WIDGETS_DIR)/$(WIDGET)

.PHONY: uninstall
uninstall:
	rm -rf $(WIDGETS_DIR)/$(WIDGET)

.PHONY: clean
clean:
	rm $(CLEAN_LIST)
