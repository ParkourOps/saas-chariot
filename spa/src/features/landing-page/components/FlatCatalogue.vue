<script setup lang="ts">
import CatalogueItemCard from "./CatalogueItemCard.vue";
import type { FlatCatalogue } from "../types/catalogue";
import {useReactiveUserInterface} from "@/plugins/reactive-user-interface";
import { computed } from "vue";

const props = defineProps<{
    catalogue: FlatCatalogue,
}>();

const reactiveUserInterface = useReactiveUserInterface();

const gridColumnsClass = computed(()=>{
    const nItems = props.catalogue.length;
    if (nItems === 1) {
        return "grid-cols-1";
    }
    let maxNumColumnsClass = "grid-cols-1";
    let maxNumColumns = 1;
    if (reactiveUserInterface.activeBreakpoint.value === "md" || reactiveUserInterface.activeBreakpoint.value === "lg") {
        maxNumColumnsClass = "grid-cols-2";
        maxNumColumns = 2;
    } else if (reactiveUserInterface.activeBreakpoint.value === "xl" || reactiveUserInterface.activeBreakpoint.value === "2xl") {
        maxNumColumnsClass = "grid-cols-3";
        maxNumColumns = 3;
    }
    const itemsDivisibleBy3 = nItems % 3 === 0;
    const itemsDivisibleBy2 = nItems % 2 === 0;
    if (itemsDivisibleBy3 && maxNumColumns === 3) {
        return `grid-cols-3`;
    } else if (itemsDivisibleBy2 && maxNumColumns >= 2) {
        return `grid-cols-2`;
    } else {
        return maxNumColumnsClass;
    }
});
</script>

<template>
    <p class="text-primary">
        {{ gridColumnsClass }}
    </p>
    <div class="grid gap-12 px-2 justify-items-center" :class="[gridColumnsClass]">
        <CatalogueItemCard v-for="(item, idx) in catalogue" :key="`item-#${idx}`" :item="item" />
    </div>
</template>
