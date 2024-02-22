import type { AdditionalThemeColours, DaisyUiThemeColours } from "@/types/theme-colours";
import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import {oklch} from "culori";

export const themeColours = {
    "primary": "#153243",
    "primary-content": "#ECE6DF", // optional

    "secondary": "#2D6286",
    "secondary-content": "#ECE6DF", // optional

    "accent": "#F26419",
    "accent-content": "#F5F8FF", // optional

    "neutral": "#ECE6DF",
    "neutral-content": "#2D6286", // optional

    "base-100": "#F5F8FF",
    // "base-200": "#F5F8FF",
    // "base-300": "#F5F8FF",
    "base-content": "#153243", // optional

    "info": "#91FAFF",
    "info-content": "#2D6286", // optional

    "success": "#C3F48A",
    "success-content": "#43572C", // optional

    "warning": "#FFBF80",
    "warning-content": "#573D23", // optional

    "error": "#FF7A66",
    "error-content": "#612921", // optional
} satisfies DaisyUiThemeColours;

export const additionalThemeColours = {
    "tertiary": "#BEE0F4",
    "tertiary-content": "#153243",
} satisfies AdditionalThemeColours;

function hexToOklch(hexString: string) {
    const oklchObj = oklch(hexString);
    if (!oklchObj) {
        throw Error(`Invalid hexadecimal colour: ${hexString}`);
    }
    const {l,c,h} = oklchObj;
    const map = (n?: number) => n ? (+n).toFixed(6) : 0;
    const oklchString = `${map(l)} ${map(c)} ${map(h)}`
    // console.debug(hexString, oklchString);
    return oklchString;
}

const tailwindThemeColoursExtension = () => {
    const object = {};
    for (const key in additionalThemeColours) {
        Object.defineProperty(object, key, {
            value: `oklch(var(--${key}) / <alpha-value>)`,
            enumerable: true,
            writable: false,
        });
    }
    return object as typeof additionalThemeColours;
};

const daisyUiThemeColoursExtension = () => {
    const object = {};
    for (const key in additionalThemeColours) {
        Object.defineProperty(object, `--${key}`, {
            value: hexToOklch(additionalThemeColours[key as keyof typeof additionalThemeColours]),
            enumerable: true,
            writable: true,
        });
    }
    return object as typeof additionalThemeColours;
};

const tailwindSafelistPattern = () => {
    const colours = {...themeColours, ...additionalThemeColours};
    const keys = Object.keys(colours);
    const regExp = RegExp(`(text|bg|border(-.)?)-(${keys.join("|")})`);
    return regExp;
}

export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
    /*
      Font Families:

        Define font families; the first font of each family is the primary font,
        the rest will be used in the case of redundancy:

        - https://tailwindcss.com/docs/font-family#customizing-the-default-font
    */
        fontFamily: {
            sans: [
                // "Sometype Mono",
                ...defaultTheme.fontFamily.sans,
            ],
            serif: [
                "Shippori Mincho",
                ...defaultTheme.fontFamily.serif,
            ],
            mono: [
                "Sometype Mono",
                ...defaultTheme.fontFamily.mono,
            ],
        },
        /*
            Additional Colours:

            Additional colours used in the theme defined above, which are not part of the
            default Daisy UI schema of colour variables, need to be explicitly exported:

            - https://daisyui.com/blog/how-to-add-new-colors-to-daisyui/
        */        
        extend: {
            colors: tailwindThemeColoursExtension(),
        }
    },
    plugins: [
    // https://daisyui.com/
        require("daisyui"),
        // https://tailwindcss.com/docs/typography-plugin/
        require("@tailwindcss/typography"),
    ],
    daisyui: {
    /*
      Theme Configuration:

        Configure theme colours.
        Currently only one theme is defined – which is the default.

        - https://daisyui.com/docs/themes/
        - https://daisyui.com/docs/colors/
    */
        themes: [
            {
                /*
            Brand Colours:
            - https://coolors.co/153243-2d6286-f26419-f5f8ff-ece6df-bee0f4

            Generic Colours (info, success, warning, error):
            - https://coolors.co/91faff-c3f48a-ffbf80-ff7a66
        */
                mytheme: {
                    ...themeColours,
                    ...daisyUiThemeColoursExtension(),
        /*
            Theme Variables:

            Configure additional theme variables, for style.

            - https://daisyui.com/docs/utilities/
        */
                    "--rounded-box": "1rem",          // border radius rounded-box utility class, used in card and other large boxes
                    "--rounded-btn": "0.5rem",        // border radius rounded-btn utility class, used in buttons and similar element
                    "--rounded-badge": "1.9rem",      // border radius rounded-badge utility class, used in badges and similar
                    "--animation-btn": "0.25s",       // duration of animation when you click on button
                    "--animation-input": "0.2s",      // duration of animation for inputs like checkbox, toggle, radio, etc
                    "--btn-focus-scale": "0.95",      // scale transform of button when you focus on it
                    "--border-btn": "1px",            // border width of buttons
                    "--tab-border": "1px",            // border width of tabs
                    "--tab-radius": "0.5rem",         // border radius of tabs
                },
            },
        ],
    },
    safelist: [
        {
            pattern: tailwindSafelistPattern()
        }
    ]
} satisfies Config;
