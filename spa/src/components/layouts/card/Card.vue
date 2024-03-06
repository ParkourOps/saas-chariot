<script setup lang="ts">
import type { ScreenSize, ClassList } from '@/types';

defineProps<{
    compact?: boolean;
    
    image?: string;
    imageClass?: ClassList;
    imageAlt?: string;
    imagePosition?: "default" | "background" | "side";

    title?: string;
    titleClass?: string;

    shadow?: ScreenSize;
    glassEffect?: boolean;
}>();
</script>

<template>
    <div
        class="card"
        :class="[
            { glass: glassEffect },
            { compact: compact },
            { 'shadow-sm': shadow === 'sm' },
            { shadow: shadow === 'md' },
            { 'shadow-lg': shadow === 'lg' },
            { 'shadow-xl': shadow === 'xl' },
            { 'shadow-2xl': shadow === '2xl' },
            { 'card-side': imagePosition === 'side' },
            { 'image-full': imagePosition === 'background' },
        ]"
    >
        <figure v-if="image && imageAlt">
            <img :src="image" :alt="imageAlt" :class="imageClass" />
        </figure>
        <div class="card-body">
            <p class="card-title heading" v-if="title">{{ title }}</p>
            <div class="h-full">
                <slot />
            </div>
            <div class="card-actions gap-4" :class="[{ 'mt-4': $slots.actions }]">
                <slot name="actions" />
            </div>
        </div>
    </div>
</template>
