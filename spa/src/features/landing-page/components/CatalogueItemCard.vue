<script setup lang="ts">
import { type CatalogueItem } from "../types/catalogue";

defineProps<{
    item: CatalogueItem;
}>();
</script>

<template>
    <div class="card card-compact min-h-[15rem] w-full max-w-[24rem] overflow-hidden border bg-neutral shadow-md sm:max-w-96">

        <div class="smallcaps bg-accent fill-primary py-5 px-4 font-serif font-extrabold text-primary">
            <div class="mx-auto flex h-[3rem] w-fit items-center text-center text-xl">
                <component v-if="item.icon" :is="item.icon" class="mr-3 w-auto" />
                <p>{{ item.title }}</p>
            </div>
        </div>

        <div class="card-body text-secondary">

            <div class="flex h-full items-center justify-center mb-4">
                <p class="text-center text-sm md:text-base/tight text-secondary">
                    {{ item.description }}
                </p>
            </div>

            <ul v-if="item.features && item.features.length > 0" class="grid grid-cols-2 gap-4 text-center text-xs font-semibold">
                <li
                    v-for="(feature, idx) in item.features"
                    :key="`feature-#${idx}`"
                    class="border-t border-secondary/20 pt-[0.34rem]"
                    :class="[{'col-span-2': (idx === item.features.length - 1) && ((idx + 1) % 2 !== 0)}]"
                >
                    {{ feature.text }}
                    <div class="m-0.5">
                        <span v-if="feature.badge === 'coming-soon'" class="badge badge-secondary text-xs opacity-80">Coming Soon!</span>
                        <span v-if="feature.badge === 'new'" class="badge badge-secondary text-xs opacity-80">New!</span>
                    </div>
                </li>
            </ul>

        </div>
    </div>
</template>
