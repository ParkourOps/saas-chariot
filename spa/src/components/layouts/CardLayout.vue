<script setup lang="ts">
defineProps<{
    shadow?: "sm" | "md" | "lg" | "xl" | "2xl";
    glass?: "boolean";
    bodyClass?: string | string[];
    imageClass?: string | string[];
    image?: string;
    imageAlt?: string;
    imageTransform?: "to-background" | "to-side";
    compact?: boolean;
    title?: string;
}>();
</script>

<template>
    <div
        class="card"
        :class="[
            { glass: glass },
            { compact: compact },
            { 'shadow-sm': shadow === 'sm' },
            { shadow: shadow === 'md' },
            { 'shadow-lg': shadow === 'lg' },
            { 'shadow-xl': shadow === 'xl' },
            { 'shadow-2xl': shadow === '2xl' },
            { 'card-side': imageTransform === 'to-side' },
            { 'image-full': imageTransform === 'to-background' },
        ]"
    >
        <figure v-if="image && imageAlt">
            <img :src="image" :alt="imageAlt" :class="imageClass" />
        </figure>
        <div class="card-body" :class="bodyClass">
            <h2 class="card-title" v-if="title">{{ title }}</h2>
            <div class="h-full">
                <slot />
            </div>
            <div class="card-actions gap-4" :class="[{ 'mt-4': $slots.actions }]">
                <slot name="actions" />
            </div>
        </div>
    </div>
</template>
