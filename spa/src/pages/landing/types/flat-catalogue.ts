import type { Component } from "vue";

type Icon = Component;

export type CatalogueItem = {
    title: string;
    description: string;
    icon: Icon;
    action?: {
        name: string;
        function: Function;
    };
};

export type FlatCatalogue = CatalogueItem[];
