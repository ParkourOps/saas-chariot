<script setup lang="ts">
import uniqueId from "@/_shared_/libraries/unique-id";
import { ref } from "vue";
import TieredCatalogueItem from "./TieredCatalogueItem.vue";
import type { TieredCatalogue } from "../types/tiered-catalogue";

defineProps<{
    catalogue: TieredCatalogue;
}>();

const catalogueId = uniqueId.create();
const selectedIndex = ref(0);
</script>

<template>
    <div v-for="(tier, tierIdx) in catalogue" :key="`${catalogueId}:tier-${tierIdx}`" class="collapse collapse-arrow mt-4 px-2 text-neutral first:mt-0 sm:px-10">
        <input type="radio" v-model="selectedIndex" :value="tierIdx" />
        <div
            class="collapse-title flex rounded-box bg-primary shadow-xl"
            :class="[
                { 'opacity-80': selectedIndex !== tierIdx },
                {
                    'mb-8': selectedIndex !== tierIdx && catalogue.length - 1 === tierIdx,
                },
            ]"
        >
            <h1 class="mx-auto font-serif text-lg font-semibold text-base-100 sm:text-xl">
                {{ tier.title }}
            </h1>
        </div>

        <div class="collapse-content p-0">
            <p class="mx-auto mb-8 mt-6 max-w-prose px-4 text-center text-sm leading-tight tracking-tight text-primary sm:text-base">
                {{ tier.description }}
            </p>
            <div class="flex flex-row flex-wrap justify-evenly gap-8">
                <TieredCatalogueItem v-for="(item, itemIdx) in tier.items" :key="`${catalogueId}:tier#${tierIdx};item#${itemIdx}`" :item="item" />
            </div>
        </div>
    </div>
</template>
