import type { App } from "vue";

export default function(app: App) {
    // indicators
    app.component("BusySpinner", import("./indicators/BusySpinner.vue"));
    // button controls
    app.component("KeyboardButton", import("./button-controls/KeyboardButton.vue"));
    // data input controls
    app.component("InputLabelWrapper", import("./data-input-controls/InputLabelWrap.vue"));
    app.component("TextBox", import("./data-input-controls/TextBox.vue"));
    app.component("NumberBox", import("./data-input-controls/NumberBox.vue"));
    app.component("TextArea", import("./data-input-controls/TextArea.vue"));
    app.component("DropDownSelect", import("./data-input-controls/DropDownSelect.vue"));
    app.component("TabSelect", import("./data-input-controls/TabSelect.vue"));
    // application
    app.component("TheTopBar", import("./TheTopBar.vue"));
    app.component("TheFooter", import("./TheFooter.vue"));
    // layout
}
