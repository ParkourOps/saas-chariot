// TODO: At some point, need to go in to DaisyUI and make it type friendly, to generate utility classes for additional colours.
export type DaisyUiThemeColours = {
    "primary": string,
    "primary-content"?: string,
    
    "secondary": string,
    "secondary-content"?: string,

    "accent": string,
    "accent-content"?: string,

    "neutral": string,
    "neutral-content"?: string,

    "base-100": string,
    "base-200"?: string,
    "base-300"?: string,
    "base-content"?: string,
    
    "info": string,
    "info-content"?: string,

    "success": string,
    "success-content"?: string,

    "warning": string,
    "warning-content"?: string,

    "error": string,
    "error-content"?: string,
}

export type AdditionalThemeColours = Record<string, string>

export type ThemeColours = DaisyUiThemeColours & AdditionalThemeColours;
