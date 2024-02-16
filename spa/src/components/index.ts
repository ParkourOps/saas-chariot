import type { App } from "vue";

// indicators
import BusySpinner from "./indicators/BusySpinner.vue";
// controls
import KeyboardButton from "./controls/KeyboardButton.vue";
import InputWrap from "./controls/InputWrap.vue";
import TextBox from "./controls/TextBox.vue";
import NumberBox from "./controls/NumberBox.vue";
import TextArea from "./controls/TextArea.vue";
import DropDownSelect from "./controls/DropDownSelect.vue";
import TabSelect from "./controls/TabSelect.vue";
// layouts
import AlertLayout from "./layouts/AlertLayout.vue";
// application elements
import TheTopBar from "./TheTopBar.vue";
import TheFooter from "./TheFooter.vue";
import CardLayout from "./layouts/CardLayout.vue";
import SlidingDrawerLayout from "./layouts/SlidingDrawerLayout.vue";
import MarkdownContent from "./layouts/MarkdownContent.vue";
import PagePaddedContent from "./layouts/PagePaddedContent.vue";
import PageHeader from "./layouts/PageHeader.vue";


export function registerComponents(app: App) {
    // indicators
    app
    .component("BusySpinner", BusySpinner)
    // controls
    .component("KeyboardButton", KeyboardButton)
    .component("InputWrap", InputWrap)
    .component("TextBox", TextBox)
    .component("NumberBox", NumberBox)
    .component("TextArea", TextArea)
    .component("DropDownSelect", DropDownSelect)
    .component("TabSelect", TabSelect)
    // layout
    .component("AlertLayout", AlertLayout)
    .component("CardLayout", CardLayout)
    .component("SlidingDrawerLayout", SlidingDrawerLayout)
    .component("MarkdownContent", MarkdownContent)
    .component("PagePaddedContent", PagePaddedContent)
    .component("PageHeader", PageHeader)
    // application
    .component("TheTopBar", TheTopBar)
    .component("TheFooter", TheFooter)
}

declare module 'vue' {
    interface GlobalComponents {
        // indicators
        BusySpinner: typeof BusySpinner,
        // controls
        KeyboardButton: typeof KeyboardButton,
        InputWrap: typeof InputWrap,
        TextBox: typeof TextBox,
        NumberBox: typeof NumberBox,
        TextArea: typeof TextArea,
        DropDownSelect: typeof DropDownSelect,
        TabSelect: typeof TabSelect,
        // layout
        AlertLayout: typeof AlertLayout,
        CardLayout: typeof CardLayout,
        SlidingDrawerLayout: typeof SlidingDrawerLayout,
        MarkdownContent: typeof MarkdownContent,
        PagePaddedContent: typeof PagePaddedContent,
        PageHeader: typeof PageHeader,
        // application
        TheTopBar: typeof TheTopBar,
        TheFooter: typeof TheFooter,
        // 
    }
}
