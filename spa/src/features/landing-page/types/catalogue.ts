import type { Component } from "vue";

type Icon = string;

type Badge = "coming-soon" | "new";

type Feature = {
    text: string;
    badge?: Badge;
};

type Action = {
    text: string,
    function: Function,
}

export type BaseCatalogueItem = {
    title: string;
    description: string;
    badge?: Badge;
    icon?: Icon;
};

export type CatalogueItem = BaseCatalogueItem & {
    features?: Feature[];
    action?: Action,
};

export type TieredCatalogueCategory = BaseCatalogueItem & {
    items: CatalogueItem[],
};

export type NestedCatalogueCategory = BaseCatalogueItem & {
    items: NestedCatalogueCategory[] | CatalogueItem[],
}

export type FlatCatalogue = CatalogueItem[];

export type TieredCatalogue = TieredCatalogueCategory[];

export type NestedCatalogue = NestedCatalogueCategory[];
