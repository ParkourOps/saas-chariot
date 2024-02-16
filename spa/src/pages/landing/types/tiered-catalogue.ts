import type { Component } from "vue";

type Icon = Component;

export type Badge = "comingSoon" | "new";

export type Feature = {
    text: string;
    badge?: Badge;
};

export type CatalogueItem = {
    title: string;
    description: string;
    icon?: Icon;
    features?: Feature[];
    badge?: Badge;
};

export type Tier = {
    title: string;
    description: string;
    icon?: Icon;
    items: CatalogueItem[];
};

export type TieredCatalogue = Tier[];
