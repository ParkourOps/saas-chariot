import type { additionalThemeColours } from "tailwind.config";
import type { DaisyUiThemeColours } from "./theme-colours";

export type NotificationType = "info" | "success" | "warning" | "error";
export type ControlVariants = "neutral" | "primary" | "secondary" | "accent" | NotificationType;
export type ThemeColours = DaisyUiThemeColours | keyof typeof additionalThemeColours;
export type HorizontalAlign = "left" | "centre" | "right";
export type VerticalAlign = "top" | "centre" | "bottom";
