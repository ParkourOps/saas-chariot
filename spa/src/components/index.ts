import type { App } from "vue";

// indicators:
import BusySpinner from "./indicators/BusySpinner.vue";
import StaticAlert from "./indicators/StaticAlert.vue";
import DynamicAlert from "./indicators/DynamicAlert.vue";

// controls:
// buttons
import Button from "./controls/buttons/Button.vue";
import KeyboardButton from "./controls/buttons/KeyboardButton.vue";
// inputs
import InputWrap from "./controls/InputWrap.vue";
import InputTextBox from "./controls/inputs/InputTextBox.vue";
import InputNumberBox from "./controls/inputs/InputNumberBox.vue";
import InputTextArea from "./controls/inputs/InputTextArea.vue";
import InputDropDownSelect from "./controls/inputs/InputDropDownSelect.vue";
import InputTabSelect from "./controls/inputs/InputTabSelect.vue";

// layouts:
import CenteredColumn from "./layouts/CenteredColumn.vue";
// page
import PageHeader from "./layouts/page/PageHeader.vue";
import PageDivider from "./layouts/page/PageDivider.vue";
import PagePaddedWrapper from "./layouts/page/PagePaddedWrapper.vue";
import PageEndSpacer from "./layouts/page/PageEndSpacer.vue";
import PageSlideInPanel from "./layouts/page/PageSlideInPanel.vue";
// card
import Card from "./layouts/card/Card.vue";

// singular application elements:
import TheTopBar from "./TheTopBar.vue";
import TheFooter from "./TheFooter.vue";

// content
import Markdown from "./Markdown.vue";
import SvgIcon from "./SvgIcon.vue";

export function registerComponents(app: App) {
    app
        // indicators:
        .component("BusySpinner", BusySpinner)
        .component("StaticAlert", StaticAlert)
        .component("DynamicAlert", DynamicAlert)
        // controls:
        // buttons
        .component("Button", Button)
        .component("KeyboardButton", KeyboardButton)
        // inputs
        .component("InputWrap", InputWrap)
        .component("InputTextBox", InputTextBox)
        .component("InputNumberBox", InputNumberBox)
        .component("InputTextArea", InputTextArea)
        .component("InputDropDownSelect", InputDropDownSelect)
        .component("InputTabSelect", InputTabSelect)
        // layouts:
        .component("CenteredColumn", CenteredColumn)
        // page
        .component("PageHeader", PageHeader)
        .component("PageDivider", PageDivider)
        .component("PagePaddedWrapper", PagePaddedWrapper)
        .component("PageEndSpacer", PageEndSpacer)
        .component("PageSlideInPanel", PageSlideInPanel)
        // card
        .component("Card", Card)
        // singular application elements:
        .component("TheTopBar", TheTopBar)
        .component("TheFooter", TheFooter)
        // content:
        .component("Markdown", Markdown)
        .component("SvgIcon", SvgIcon)
}

declare module "vue" {
    interface GlobalComponents {
        // indicators:
        BusySpinner: typeof BusySpinner;
        StaticAlert: typeof StaticAlert;
        DynamicAlert: typeof DynamicAlert;
        // controls:
        // buttons
        Button: typeof Button;
        KeyboardButton: typeof KeyboardButton;
        // inputs
        InputWrap: typeof InputWrap;
        InputTextBox: typeof InputTextBox;
        InputNumberBox: typeof InputNumberBox;
        InputTextArea: typeof InputTextArea;
        InputDropDownSelect: typeof InputDropDownSelect;
        InputTabSelect: typeof InputTabSelect;
        // layouts:
        CenteredColumn: typeof CenteredColumn;
        // page
        PageHeader: typeof PageHeader;
        PageDivider: typeof PageDivider;
        PagePaddedWrapper: typeof PagePaddedWrapper;
        PageEndSpacer: typeof PageEndSpacer;
        PageSlideInPanel: typeof PageSlideInPanel;
        // card
        Card: typeof Card;
        // singular application elements:
        TheTopBar: typeof TheTopBar;
        TheFooter: typeof TheFooter;
        // content:
        Markdown: typeof Markdown;
        SvgIcon: typeof SvgIcon;
    }
}
