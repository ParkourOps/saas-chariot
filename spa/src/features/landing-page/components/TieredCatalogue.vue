<script setup lang="ts">
import uniqueId from "shared/libraries/unique-id";
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
        <input type="radio" v-model="selectedIndex" :value="tierIdx" v-if="!expanded"/>
        <div
            :name="`tier-${tierIdx}`"
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
            <p class="heading text-center mx-auto text-xl font-semibold text-base-100">
                {{ tier.title }}
            </p>
        </div>

        <div class="p-0" :class="{
            'collapse-content': !expanded,
            'pb-10': expanded,
        }">
            <p class="mx-auto mt-10 mb-12 px-4 text-center text-base sm:text-lg text-primary max-w-lg font-semibold leading-snug">
                {{ tier.description }}
            </p>
            <FlatCatalogue :catalogue="tier.items" />
            <div class="text-primary pt-20" v-if="$slots['tier-footer']">
                
                <slot name="tier-footer" />
            </div>
        </div>
    </div>
</template>
