<script setup lang="ts">
import uniqueId from "@/_shared_/libraries/unique-id";
import { ref } from "vue";
import type { TieredCatalogue } from "../types/catalogue";
import FlatCatalogue from "./FlatCatalogue.vue";

defineProps<{
    catalogue: TieredCatalogue,
    expanded?: boolean
}>();

const catalogueId = uniqueId.create();
const selectedIndex = ref(0);
</script>

<template>
    <div v-for="(tier, tierIdx) in catalogue" :key="`${catalogueId}:tier-${tierIdx}`" class="mt-4 px-2 text-neutral first:mt-0 sm:px-10"
        :class="[
            {
                'collapse collapse-arrow': !expanded,
            }
        ]"
    >
        <input type="radio" v-model="selectedIndex" :value="tierIdx" v-if="!expanded" />
        <div
            class="collapse-title flex rounded-btn bg-primary shadow-xl"
            :class="[
                { 'opacity-80': expanded || selectedIndex !== tierIdx },
                {
                    'mb-8': expanded && selectedIndex !== tierIdx && catalogue.length - 1 === tierIdx,
                },
                {
                    'pe-0': expanded,
                }
            ]"
        >
            <h1 class="mx-auto font-serif text-lg font-semibold text-base-100 sm:text-xl">
                {{ tier.title }}
            </h1>
        </div>

        <div class="p-0" :class="{
            'collapse-content': !expanded,
            'pb-10': expanded,
        }">
            <p class="mx-auto mb-8 mt-6 max-w-prose px-4 text-center text-sm leading-tight tracking-tight text-primary sm:text-base">
                {{ tier.description }}
            </p>
            <FlatCatalogue :catalogue="tier.items" />
        </div>
    </div>
</template>
