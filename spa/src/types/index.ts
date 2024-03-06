import type { additionalThemeColours } from "tailwind.config";
import type { DaisyUiThemeColours } from "./theme-colours";
import type { DefaultTheme } from "tailwindcss/types/generated/default-theme";

export type NotificationType = "info" | "success" | "warning" | "error";
export type ControlVariant = "neutral" | "primary" | "secondary" | "accent" | NotificationType;
export type ControlSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ScreenSize = keyof DefaultTheme["screens"];
export type ThemeColours = keyof DaisyUiThemeColours | keyof typeof additionalThemeColours;
export type HorizontalAlign = "left" | "centre" | "right";
export type VerticalAlign = "top" | "centre" | "bottom";
export type JustifyContent = "start" | "end" | "centre" | "normal" | "stretch" | "space-between" | "space-around" | "space-evenly";
