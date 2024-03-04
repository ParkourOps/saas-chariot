<script setup lang="ts">
import {type HorizontalAlign} from "@/types";

defineProps<{
    width?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    label: string;
    labelClass?: string | string[];
    iconLeftClass?: string | string[];
    iconRightClass?: string | string[];
    horizontalAlign?: HorizontalAlign;
}>();
</script>

<template>
    <div class="mx-auto w-full" :class="[{ 'max-w-sm': width === 'sm' }, { 'max-w-md': width === 'md' }, { 'max-w-lg': width === 'lg' }, { 'max-w-xl': width === 'xl' }, { 'max-w-2xl': width === '2xl' }]">
        <p class="mx-2 mb-1.5 flex flex-row items-center text-sm" :class="[labelClass, { 'justify-start': horizontalAlign === 'left' }, { 'justify-center': horizontalAlign === 'centre' }, { 'justify-end': horizontalAlign === 'right' }]">
            <i v-if="iconLeftClass" :class="iconLeftClass" class="mr-2" />
            {{ label }}
            <i v-if="iconRightClass" :class="iconRightClass" class="ml-2" />
        </p>
        <slot></slot>
    </div>
</template>
